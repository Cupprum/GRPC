import { login, logout, auth0Init } from './auth'
import { getDetailsOfDevices, triggerServerStreaming, finishServerStreaming } from './grpc'


const loginButton = document.getElementById("btn-login") as HTMLButtonElement;
const logoutButton = document.getElementById("btn-logout") as HTMLButtonElement;

window.onload = async () => auth0Init()

loginButton.addEventListener("click", login);
logoutButton.addEventListener("click", logout);

const grpcGetDetailsOfDevices = document.getElementById("btn-get-details");
const grpcTriggerServerStreaming = document.getElementById("btn-stream-start");
const grpcFinishServerStreaming = document.getElementById("btn-stream-end");

grpcGetDetailsOfDevices.addEventListener("click", getDetailsOfDevices);
grpcTriggerServerStreaming.addEventListener("click", triggerServerStreaming);
grpcFinishServerStreaming.addEventListener("click", finishServerStreaming);