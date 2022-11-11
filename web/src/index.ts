import * as grpcWeb from 'grpc-web';
import { ServerClient } from './protos/Special_courseServiceClientPb';
import { Request, Reply } from './protos/special_course_pb';


const grpcTriggerUnaryQuery = document.getElementById("grpcTriggerUnaryQuery");
let grpcResponseUnaryQuery = document.getElementById("grpcResponseUnaryQuery");

const grpcTriggerServerStreaming = document.getElementById("grpcTriggerStreaming");
let grpcResponseServerStreaming = document.getElementById("grpcResponseStreaming");

const server = new ServerClient('http://localhost:8080', null, null);

function triggerUnaryQuery() {
    let firstName = document.getElementById("firstName") as HTMLInputElement;
    let lastName = document.getElementById("lastName") as HTMLInputElement;
    firstName.value

    const request = new Request();
    request.setMessage(firstName.value);

    server.unaryQuery(request, {},
        (err: grpcWeb.RpcError, response: Reply) => {
            if (err) {
                console.log(`Exception\nCode: ${err.code}\nMessage: ${err.metadata}`);
            }

            grpcResponseUnaryQuery.innerText = response.getMessage();
        }
    );
}

function triggerServerStreaming() {
    const request = new Request();
    request.setMessage("");

    let stream = server.serverStreaming(request, {});
    stream.on('data', function (reply: Reply) {
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(reply.getMessage()));
        grpcResponseServerStreaming.appendChild(li);
    });
}

grpcTriggerUnaryQuery.addEventListener("click", triggerUnaryQuery);
grpcTriggerServerStreaming.addEventListener("click", triggerServerStreaming);