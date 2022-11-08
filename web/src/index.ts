import * as grpcWeb from 'grpc-web';
import { GreeterClient } from './protos/HelloworldServiceClientPb';
import { HelloRequest, HelloReply } from './protos/helloworld_pb';


const grpcTrigger = document.getElementById("grpcTrigger");
let grpcResponse = document.getElementById("grpcResponse");


let firstName = document.getElementById("firstName") as HTMLInputElement;
let lastName = document.getElementById("lastName") as HTMLInputElement;


const echoService = new GreeterClient('http://localhost:8080', null, null);


function printSomeShit() {
    const request = new HelloRequest();
    request.setName(firstName.value);
    request.setSurname(lastName.value);

    echoService.sayHello(request, { 'custom-header-1': 'value1' },
        (err: grpcWeb.RpcError, response: HelloReply) => {
            if (err) {
                console.log(`Exception\nCode: ${err.code}\nMessage: ${err.metadata}`)
            }

            grpcResponse.innerText = response.getMessage();
        }
    );
}

grpcTrigger.addEventListener("click", printSomeShit);