# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: special_course.proto
"""Generated protocol buffer code."""
from google.protobuf.internal import builder as _builder
from google.protobuf import descriptor as _descriptor
from google.protobuf import descriptor_pool as _descriptor_pool
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()




DESCRIPTOR = _descriptor_pool.Default().AddSerializedFile(b'\n\x14special_course.proto\x12\x0especial_course\"\x07\n\x05\x45mpty\"p\n\x07\x44\x65vices\x12\x35\n\x07\x64\x65vices\x18\x01 \x03(\x0b\x32$.special_course.Devices.DevicesEntry\x1a.\n\x0c\x44\x65vicesEntry\x12\x0b\n\x03key\x18\x01 \x01(\t\x12\r\n\x05value\x18\x02 \x01(\t:\x02\x38\x01\"\x19\n\tInterface\x12\x0c\n\x04name\x18\x01 \x01(\t\"N\n\x10InterfaceDetails\x12\n\n\x02ip\x18\x01 \x01(\t\x12\x11\n\tbroadcast\x18\x02 \x01(\t\x12\x0c\n\x04mask\x18\x03 \x01(\t\x12\r\n\x05\x66lags\x18\x04 \x01(\r\"\x1d\n\x0bStreamReply\x12\x0e\n\x06packet\x18\x01 \x01(\x0c\x32\xec\x01\n\x06Server\x12>\n\nGetDevices\x12\x15.special_course.Empty\x1a\x17.special_course.Devices\"\x00\x12S\n\x12GetDetailsOfDevice\x12\x19.special_course.Interface\x1a .special_course.InterfaceDetails\"\x00\x12M\n\x0fServerStreaming\x12\x19.special_course.Interface\x1a\x1b.special_course.StreamReply\"\x00\x30\x01\x42+Z)dtu.com/grpc/golang/special_course/protosb\x06proto3')

_builder.BuildMessageAndEnumDescriptors(DESCRIPTOR, globals())
_builder.BuildTopDescriptorsAndMessages(DESCRIPTOR, 'special_course_pb2', globals())
if _descriptor._USE_C_DESCRIPTORS == False:

  DESCRIPTOR._options = None
  DESCRIPTOR._serialized_options = b'Z)dtu.com/grpc/golang/special_course/protos'
  _DEVICES_DEVICESENTRY._options = None
  _DEVICES_DEVICESENTRY._serialized_options = b'8\001'
  _EMPTY._serialized_start=40
  _EMPTY._serialized_end=47
  _DEVICES._serialized_start=49
  _DEVICES._serialized_end=161
  _DEVICES_DEVICESENTRY._serialized_start=115
  _DEVICES_DEVICESENTRY._serialized_end=161
  _INTERFACE._serialized_start=163
  _INTERFACE._serialized_end=188
  _INTERFACEDETAILS._serialized_start=190
  _INTERFACEDETAILS._serialized_end=268
  _STREAMREPLY._serialized_start=270
  _STREAMREPLY._serialized_end=299
  _SERVER._serialized_start=302
  _SERVER._serialized_end=538
# @@protoc_insertion_point(module_scope)
