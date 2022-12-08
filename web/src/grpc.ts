import * as grpcWeb from 'grpc-web';
import { ServerClient } from './protos/Special_courseServiceClientPb';
import { Empty, Devices, StreamReply, Interface, InterfaceDetails } from './protos/special_course_pb';


let server = new ServerClient('http://localhost:8080', null, null);
let stream: grpcWeb.ClientReadableStream<StreamReply> = null;

function getToken(): string {
    return sessionStorage.getItem("auth0token");
}

function getMetadata(): grpcWeb.Metadata {
    return { "authorization": `bearer: ${getToken()}` };
}

export function getDevices() {
    server.getDevices(new Empty(), getMetadata(),
        (err: grpcWeb.RpcError, response: Devices) => {
            if (err) {
                console.log(`Exception during get devices\nCode: ${err.code}\nMessage: ${err.message}`);
            }

            const ulDevices = document.getElementById("ul-devices");
            const selectDevice = document.getElementById("select-device");

            response.getDevicesMap().forEach((value: string, key: string) => {
                const row = document.createElement("li");
                row.innerText = `${key} - ${value}`;
                ulDevices.appendChild(row);

                const option = document.createElement("option");
                option.value = key;
                option.innerText = key;
                selectDevice.appendChild(option);
            });
        }
    );
}

export function getDetailsOfDevices() {
    const value = (document.getElementById("select-device") as HTMLSelectElement).selectedOptions.item(0).value;

    let request = new Interface();
    request.setName(value);

    server.getDetailsOfDevice(request, getMetadata(),
        (err: grpcWeb.RpcError, response: InterfaceDetails) => {
            if (err) {
                console.log(`Exception during get details of device\nCode: ${err.code}\nMessage: ${err.message}`);
            }

            const ip = document.getElementById("details-ip");
            const mask = document.getElementById("details-mask");
            const broadcast = document.getElementById("details-broadcast");
            const flags = document.getElementById("details-flags");

            ip.innerText = `IP: ${response.getIp()}`;
            mask.innerText = `Mask: ${response.getMask()}`;
            broadcast.innerText = `Broadcast: ${response.getBroadcast()}`;
            flags.innerText = `Flags: ${response.getFlags()}`;
        }
    );
}

function getRGBfromXterm(val: number): number[] {
    const r = (255 / 15) * (val & 15);
    const g = ((255 / 15) * ((val & (15 << 2)) >> 2));
    const b = ((255 / 15) * ((val & (15 << 4)) >> 4));

    return [r, g, b];
}

function generateSquare(color: number): HTMLDivElement {
    const colors = getRGBfromXterm(color);
    const div = document.createElement("div");
    div.style.cssText = `color:rgb(${colors});display:inline-block;font-size:xx-large;`;
    div.innerHTML = '&#9632;';

    return div;
}

function representPacket(packet: number[]) {
    const rows = document.createElement("div");
    const space = document.createElement("div");
    space.style.cssText = "padding-top:2em;";

    let row = document.createElement("div");
    rows.appendChild(row);

    let counter = 0;
    for (let octet of packet) {
        if (counter == 60) {
            row = document.createElement("div");
            rows.appendChild(row);
            counter = 0;
        }
        row.appendChild(generateSquare(octet));
        counter++;
    }

    document.getElementById("ul-stream-response").appendChild(rows);
    document.getElementById("ul-stream-response").appendChild(space);

    setTimeout(() => {
        rows.remove();
        space.remove();
    }, 3000);
}

export function triggerServerStreaming() {
    const value = (document.getElementById("select-device") as HTMLSelectElement).selectedOptions.item(0).value;

    let request = new Interface();
    request.setName(value);

    stream = server.serverStreaming(request, getMetadata());
    stream.on('data', function (reply: StreamReply) {
        representPacket(Array.from(reply.getPacket() as Uint8Array));
    });
    stream.on("error", function (err) {
        console.log(`Exception during server stream\nCode: ${err.code}\nMessage: ${err.message}`);
    });

    console.log("Started streaming");
}

export function finishServerStreaming() {
    stream.cancel();
    console.log("Cancaled streaming");
}