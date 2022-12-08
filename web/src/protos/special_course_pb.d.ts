import * as jspb from 'google-protobuf'



export class Empty extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Empty.AsObject;
  static toObject(includeInstance: boolean, msg: Empty): Empty.AsObject;
  static serializeBinaryToWriter(message: Empty, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Empty;
  static deserializeBinaryFromReader(message: Empty, reader: jspb.BinaryReader): Empty;
}

export namespace Empty {
  export type AsObject = {
  }
}

export class Devices extends jspb.Message {
  getDevicesMap(): jspb.Map<string, string>;
  clearDevicesMap(): Devices;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Devices.AsObject;
  static toObject(includeInstance: boolean, msg: Devices): Devices.AsObject;
  static serializeBinaryToWriter(message: Devices, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Devices;
  static deserializeBinaryFromReader(message: Devices, reader: jspb.BinaryReader): Devices;
}

export namespace Devices {
  export type AsObject = {
    devicesMap: Array<[string, string]>,
  }
}

export class Interface extends jspb.Message {
  getName(): string;
  setName(value: string): Interface;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Interface.AsObject;
  static toObject(includeInstance: boolean, msg: Interface): Interface.AsObject;
  static serializeBinaryToWriter(message: Interface, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Interface;
  static deserializeBinaryFromReader(message: Interface, reader: jspb.BinaryReader): Interface;
}

export namespace Interface {
  export type AsObject = {
    name: string,
  }
}

export class InterfaceDetails extends jspb.Message {
  getIp(): string;
  setIp(value: string): InterfaceDetails;

  getBroadcast(): string;
  setBroadcast(value: string): InterfaceDetails;

  getMask(): string;
  setMask(value: string): InterfaceDetails;

  getFlags(): number;
  setFlags(value: number): InterfaceDetails;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InterfaceDetails.AsObject;
  static toObject(includeInstance: boolean, msg: InterfaceDetails): InterfaceDetails.AsObject;
  static serializeBinaryToWriter(message: InterfaceDetails, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InterfaceDetails;
  static deserializeBinaryFromReader(message: InterfaceDetails, reader: jspb.BinaryReader): InterfaceDetails;
}

export namespace InterfaceDetails {
  export type AsObject = {
    ip: string,
    broadcast: string,
    mask: string,
    flags: number,
  }
}

export class StreamReply extends jspb.Message {
  getPacket(): Uint8Array | string;
  getPacket_asU8(): Uint8Array;
  getPacket_asB64(): string;
  setPacket(value: Uint8Array | string): StreamReply;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StreamReply.AsObject;
  static toObject(includeInstance: boolean, msg: StreamReply): StreamReply.AsObject;
  static serializeBinaryToWriter(message: StreamReply, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StreamReply;
  static deserializeBinaryFromReader(message: StreamReply, reader: jspb.BinaryReader): StreamReply;
}

export namespace StreamReply {
  export type AsObject = {
    packet: Uint8Array | string,
  }
}

