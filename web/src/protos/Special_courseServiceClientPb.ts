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

  methodDescriptorUnaryQuery = new grpcWeb.MethodDescriptor(
    '/special_course.Server/UnaryQuery',
    grpcWeb.MethodType.UNARY,
    special_course_pb.Request,
    special_course_pb.Reply,
    (request: special_course_pb.Request) => {
      return request.serializeBinary();
    },
    special_course_pb.Reply.deserializeBinary
  );

  unaryQuery(
    request: special_course_pb.Request,
    metadata: grpcWeb.Metadata | null): Promise<special_course_pb.Reply>;

  unaryQuery(
    request: special_course_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: special_course_pb.Reply) => void): grpcWeb.ClientReadableStream<special_course_pb.Reply>;

  unaryQuery(
    request: special_course_pb.Request,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: special_course_pb.Reply) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/special_course.Server/UnaryQuery',
        request,
        metadata || {},
        this.methodDescriptorUnaryQuery,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/special_course.Server/UnaryQuery',
    request,
    metadata || {},
    this.methodDescriptorUnaryQuery);
  }

  methodDescriptorServerStreaming = new grpcWeb.MethodDescriptor(
    '/special_course.Server/ServerStreaming',
    grpcWeb.MethodType.SERVER_STREAMING,
    special_course_pb.Request,
    special_course_pb.Reply,
    (request: special_course_pb.Request) => {
      return request.serializeBinary();
    },
    special_course_pb.Reply.deserializeBinary
  );

  serverStreaming(
    request: special_course_pb.Request,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<special_course_pb.Reply> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/special_course.Server/ServerStreaming',
      request,
      metadata || {},
      this.methodDescriptorServerStreaming);
  }

}

