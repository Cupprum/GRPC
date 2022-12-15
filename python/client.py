import http.client
import json
import logging
import os
import sys

import grpc

sys.path.append("./protos")
import special_course_pb2 as proto  # noqa: E402
import special_course_pb2_grpc as proto_grpc  # noqa: E402


def get_token() -> str:
    """Get freshly minted token from auth0."""
    logging.info("get new token")
    conn = http.client.HTTPSConnection(os.environ["GRPC_AUTH0_ISSUER_URL"])

    payload = {
        "client_id": os.environ["GRPC_AUTH0_CLIENT_ID"],
        "client_secret": os.environ["GRPC_AUTH0_CLIENT_SECRET"],
        "audience": os.environ["GRPC_AUTH0_AUDIENCE"],
        "grant_type": "client_credentials",
    }
    headers = {"content-type": "application/json"}

    conn.request("POST", "/oauth/token", json.dumps(payload), headers)
    res = conn.getresponse()
    logging.info("token request was successfully executed")

    access_token = json.load(res)["access_token"]
    logging.info("token was successfully acquired")

    return access_token


def get_metadata() -> ():
    """
    Metadata must be in tuple format.

    In python it has to end with one comma.
    """
    return (("authorization", f"bearer: {get_token()}"),)


def get_details_of_device(device_name: str) -> None:
    logging.info("execute unary query: get details of device %s", device_name)

    with grpc.insecure_channel("localhost:50051") as channel:
        stub = proto_grpc.ServerStub(channel)

        response = stub.GetDetailsOfDevice(
            request=proto.Interface(name=device_name),
            metadata=get_metadata(),
        )

        print(f"\nIP: {response.ip}")
        print(f"Broadcast: {response.broadcast}")
        print(f"Mask: {response.mask}")
        print(f"Flags: {response.flags}\n")


def get_devices() -> None:
    logging.info("execute unary query: get devices")

    with grpc.insecure_channel("localhost:50051") as channel:
        stub = proto_grpc.ServerStub(channel)

        response = stub.GetDevices(
            request=proto.Empty(),
            metadata=get_metadata(),
        )

        print("\nDevices:")
        [print(f"\t{k}: {v}") for k, v in response.devices.items()]
        print()


def server_streaming(device_name: str) -> None:
    logging.info("execute streaming query: server streaming")

    with grpc.insecure_channel("localhost:50051") as channel:
        stub = proto_grpc.ServerStub(channel)

        for feature in stub.ServerStreaming(
            request=proto.Interface(name=device_name), metadata=get_metadata()
        ):
            for val in feature.packet:
                print(f"\x1b[48;5;{val}m  \x1b[0m", end=" ")
            print()
            print()


if __name__ == "__main__":
    device = "eth0"

    logging.getLogger().setLevel(logging.INFO)
    get_devices()
    get_details_of_device(device)
    server_streaming(device)
