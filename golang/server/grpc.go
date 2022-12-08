package main

import (
	"context"
	"fmt"
	"log"
	"strings"

	pb "dtu.com/grpc/golang/special_course/protos"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/metadata"
)

type server struct {
	pb.UnimplementedServerServer
}

func (s *server) GetDevices(ctx context.Context, in *pb.Empty) (*pb.Devices, error) {
	log.Println("received unary query: GetDevices")

	devices, err := packetGetDevices()
	if err != nil {
		errMsg := fmt.Sprint("failed to retrieve list of devices: ", err)
		log.Println(errMsg)
		err := grpc.Errorf(codes.Internal, errMsg)

		return nil, err
	}

	return &pb.Devices{Devices: devices}, nil
}

func (s *server) GetDetailsOfDevice(ctx context.Context, in *pb.Interface) (*pb.InterfaceDetails, error) {
	log.Println("received unary query: GetDetailsOfDevice")

	i, b, m, f, err := packetGetDetailsOfDevice(in.GetName())
	if err != nil {
		errMsg := fmt.Sprint("failed to retrieve details of device: ", err)
		log.Println(errMsg)
		err := grpc.Errorf(codes.InvalidArgument, errMsg)

		return nil, err
	}

	return &pb.InterfaceDetails{Ip: i, Broadcast: b, Mask: m, Flags: f}, nil
}

func (s *server) ServerStreaming(in *pb.Interface, stream pb.Server_ServerStreamingServer) error {
	log.Println("received streaming query: ServerStreaming")

	f := "tcp and (dst port 80 or dst port 443)"
	i, err := tapIntoInterface(in.GetName(), f)
	if err != nil {
		errMsg := fmt.Sprintf("failed to open interface '%s': %s", in.GetName(), err)
		log.Println(errMsg)
		err := grpc.Errorf(codes.InvalidArgument, errMsg)

		return err
	}

	for packet := range i {
		// Skip over packets which do not contain Application Layer
		if packet.ApplicationLayer() == nil {
			continue
		}

		data := packet.ApplicationLayer().Payload()

		if err := stream.Send(&pb.StreamReply{Packet: data}); err != nil {
			errMsg := fmt.Sprintf("failed to send stream data, '%s': %s", data, err)
			log.Println(errMsg)
			err := grpc.Errorf(codes.Internal, errMsg)

			return err
		}
	}
	log.Println("stream finished")

	return nil
}

func authInterceptor(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo, handler grpc.UnaryHandler) (interface{}, error) {
	meta, ok := metadata.FromIncomingContext(ctx)
	if !ok {
		return nil, grpc.Errorf(codes.Unauthenticated, "missing context metadata")
	}

	// Take care: grpc internally reduce key values of headers to lowercase
	if len(meta["authorization"]) != 1 {
		return nil, grpc.Errorf(codes.Unauthenticated, "invalid token")
	}

	if token := strings.Split(meta["authorization"][0], " ")[1]; !verify(token) {
		return nil, grpc.Errorf(codes.Unauthenticated, "invalid token")
	}

	return handler(ctx, req)
}

func createServer() *grpc.Server {
	s := grpc.NewServer(grpc.UnaryInterceptor(authInterceptor))
	pb.RegisterServerServer(s, &server{})

	return s
}
