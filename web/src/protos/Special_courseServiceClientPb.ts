/**
 * @fileoverview gRPC-Web generated client stub for special_course
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as special_course_pb from './special_course_pb';


export class ServerClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorGetDevices = new grpcWeb.MethodDescriptor(
    '/special_course.Server/GetDevices',
    grpcWeb.MethodType.UNARY,
    special_course_pb.Empty,
    special_course_pb.Devices,
    (request: special_course_pb.Empty) => {
      return request.serializeBinary();
    },
    special_course_pb.Devices.deserializeBinary
  );

  getDevices(
    request: special_course_pb.Empty,
    metadata: grpcWeb.Metadata | null): Promise<special_course_pb.Devices>;

  getDevices(
    request: special_course_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: special_course_pb.Devices) => void): grpcWeb.ClientReadableStream<special_course_pb.Devices>;

  getDevices(
    request: special_course_pb.Empty,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: special_course_pb.Devices) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/special_course.Server/GetDevices',
        request,
        metadata || {},
        this.methodDescriptorGetDevices,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/special_course.Server/GetDevices',
    request,
    metadata || {},
    this.methodDescriptorGetDevices);
  }

  methodDescriptorGetDetailsOfDevice = new grpcWeb.MethodDescriptor(
    '/special_course.Server/GetDetailsOfDevice',
    grpcWeb.MethodType.UNARY,
    special_course_pb.Interface,
    special_course_pb.InterfaceDetails,
    (request: special_course_pb.Interface) => {
      return request.serializeBinary();
    },
    special_course_pb.InterfaceDetails.deserializeBinary
  );

  getDetailsOfDevice(
    request: special_course_pb.Interface,
    metadata: grpcWeb.Metadata | null): Promise<special_course_pb.InterfaceDetails>;

  getDetailsOfDevice(
    request: special_course_pb.Interface,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: special_course_pb.InterfaceDetails) => void): grpcWeb.ClientReadableStream<special_course_pb.InterfaceDetails>;

  getDetailsOfDevice(
    request: special_course_pb.Interface,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: special_course_pb.InterfaceDetails) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/special_course.Server/GetDetailsOfDevice',
        request,
        metadata || {},
        this.methodDescriptorGetDetailsOfDevice,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/special_course.Server/GetDetailsOfDevice',
    request,
    metadata || {},
    this.methodDescriptorGetDetailsOfDevice);
  }

  methodDescriptorServerStreaming = new grpcWeb.MethodDescriptor(
    '/special_course.Server/ServerStreaming',
    grpcWeb.MethodType.SERVER_STREAMING,
    special_course_pb.Interface,
    special_course_pb.StreamReply,
    (request: special_course_pb.Interface) => {
      return request.serializeBinary();
    },
    special_course_pb.StreamReply.deserializeBinary
  );

  serverStreaming(
    request: special_course_pb.Interface,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<special_course_pb.StreamReply> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/special_course.Server/ServerStreaming',
      request,
      metadata || {},
      this.methodDescriptorServerStreaming);
  }

}

