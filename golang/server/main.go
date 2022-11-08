package main

import (
	"context"
	"log"
	"net"

	"google.golang.org/grpc"
	pb "dtu.com/grpc/golang/special_course/protos"
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedGreeterServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) SayHello(ctx context.Context, in *pb.HelloRequest) (*pb.HelloReply, error) {
	n := in.GetName()
	sn := in.GetSurname()
	log.Printf("Received: %v, %v", n, sn)
	return &pb.HelloReply{Message: "Hello " + n + " | " + sn}, nil
}

func main() {
	lis, err := net.Listen("tcp", ":50051")
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}