import asyncio
import logging

import grpc

import sys

sys.path.append("./protos")
import helloworld_pb2
import helloworld_pb2_grpc


async def run() -> None:
    async with grpc.aio.insecure_channel("localhost:50051") as channel:
        stub = helloworld_pb2_grpc.GreeterStub(channel)
        response = await stub.SayHello(
            helloworld_pb2.HelloRequest(name="Sam", surname="Branisa")
        )
    print("Greeter client received: " + response.message)


if __name__ == "__main__":
    logging.basicConfig()
    asyncio.run(run())
