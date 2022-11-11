import logging

import grpc

import sys

sys.path.append("./protos")
import special_course_pb2
import special_course_pb2_grpc


def run() -> None:
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = special_course_pb2_grpc.GreeterStub(channel)
        for feature in stub.query(special_course_pb2.Request(name="Sam")):
            print(f"Val: {feature.message}")


if __name__ == "__main__":
    logging.basicConfig()
    run()
