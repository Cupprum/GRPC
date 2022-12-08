from google.protobuf.internal import containers as _containers
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from typing import ClassVar as _ClassVar, Mapping as _Mapping, Optional as _Optional

DESCRIPTOR: _descriptor.FileDescriptor

class Devices(_message.Message):
    __slots__ = ["devices"]
    class DevicesEntry(_message.Message):
        __slots__ = ["key", "value"]
        KEY_FIELD_NUMBER: _ClassVar[int]
        VALUE_FIELD_NUMBER: _ClassVar[int]
        key: str
        value: str
        def __init__(self, key: _Optional[str] = ..., value: _Optional[str] = ...) -> None: ...
    DEVICES_FIELD_NUMBER: _ClassVar[int]
    devices: _containers.ScalarMap[str, str]
    def __init__(self, devices: _Optional[_Mapping[str, str]] = ...) -> None: ...

class Empty(_message.Message):
    __slots__ = []
    def __init__(self) -> None: ...

class Interface(_message.Message):
    __slots__ = ["name"]
    NAME_FIELD_NUMBER: _ClassVar[int]
    name: str
    def __init__(self, name: _Optional[str] = ...) -> None: ...

class InterfaceDetails(_message.Message):
    __slots__ = ["broadcast", "flags", "ip", "mask"]
    BROADCAST_FIELD_NUMBER: _ClassVar[int]
    FLAGS_FIELD_NUMBER: _ClassVar[int]
    IP_FIELD_NUMBER: _ClassVar[int]
    MASK_FIELD_NUMBER: _ClassVar[int]
    broadcast: str
    flags: int
    ip: str
    mask: str
    def __init__(self, ip: _Optional[str] = ..., broadcast: _Optional[str] = ..., mask: _Optional[str] = ..., flags: _Optional[int] = ...) -> None: ...

class StreamReply(_message.Message):
    __slots__ = ["packet"]
    PACKET_FIELD_NUMBER: _ClassVar[int]
    packet: bytes
    def __init__(self, packet: _Optional[bytes] = ...) -> None: ...
