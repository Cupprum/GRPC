package main

import (
	"context"
	"fmt"
	"log"
	"math/rand"
	"net"
	"time"

	pb "dtu.com/grpc/golang/special_course/protos"
	"google.golang.org/grpc"
)

type server struct {
	pb.UnimplementedServerServer
}

func (s *server) UnaryQuery(ctx context.Context, in *pb.Request) (*pb.Reply, error) {
	m := fmt.Sprintf("Hello: %v", in.GetMessage())
	return &pb.Reply{Message: m}, nil
}

func (s *server) ServerStreaming(in *pb.Request, stream pb.Server_ServerStreamingServer) error {
	rs := time.Now().UnixNano()
	r := rand.New(rand.NewSource(rs))

	for i := 0; i < 10; i++ {
		v := r.Int63()
		log.Printf("Val: %v", v)
		if err := stream.Send(&pb.Reply{Message: fmt.Sprintf("%v", v)}); err != nil {
			return err
		}
		time.Sleep(time.Second)
	}

	return nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterServerServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
