package main

import (
	"log"
	"net"
	"math/rand"
	"time"
	"fmt"

	"google.golang.org/grpc"
	pb "dtu.com/grpc/golang/special_course/protos"
)

type server struct {
	pb.UnimplementedGreeterServer
}

func (s *server) Query(in *pb.Request, stream pb.Greeter_QueryServer) error {
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
	pb.RegisterGreeterServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}