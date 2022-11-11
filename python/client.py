import logging

import grpc

import sys

sys.path.append("./protos")
import special_course_pb2  # noqa: E402
import special_course_pb2_grpc  # noqa: E402


def unary_query() -> None:
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = special_course_pb2_grpc.ServerStub(channel)
        response = stub.UnaryQuery(special_course_pb2.Request(message="Sam"))
        print(f"Val: {response.message}")


def server_streaming() -> None:
    with grpc.insecure_channel("localhost:50051") as channel:
        stub = special_course_pb2_grpc.ServerStub(channel)
        for feature in stub.ServerStreaming(special_course_pb2.Request(message="")):
            print(f"Val: {feature.message}")


if __name__ == "__main__":
    logging.basicConfig()
    unary_query()
    server_streaming()
