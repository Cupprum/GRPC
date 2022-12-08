import { getDevices } from './grpc'
import { Auth0Client, createAuth0Client } from '@auth0/auth0-spa-js';


let auth0Client: Auth0Client = null;
const auth0Config = {
    domain: "x42-personal.eu.auth0.com",
    clientId: "VgJZrcRqgDN9CK5hNNM5BWmB6af9BVZv",
    authorizationParams: {
        audience: "http://localhost:50051"
    }
}

export async function login() {
    try {
        console.log("Logging in");
        await auth0Client.loginWithRedirect({
            authorizationParams: {
                redirect_uri: window.location.origin
            }
        });
    } catch (err) {
        console.log("Log in failed:", err);
    }
};

export async function logout() {
    try {
        console.log("Logging out");
        await auth0Client.logout({
            logoutParams: {
                returnTo: window.location.origin
            }
        });
        sessionStorage.clear();
    } catch (err) {
        console.log("Log out failed:", err);
    }
};

async function setDisabledFlag() {
    const isAuthenticated = await auth0Client.isAuthenticated();

    document.querySelectorAll(`[id^="btn"]`).forEach((element: HTMLButtonElement) => {
        element.disabled = !isAuthenticated;
    });

    (document.getElementById("btn-login") as HTMLButtonElement).disabled = isAuthenticated;
}

export async function auth0Init() {
    auth0Client = await createAuth0Client(auth0Config);

    const query = window.location.search;
    if (query.includes("code=") && query.includes("state=")) {
        console.log("Parsing redirect login");
        try {
            await auth0Client.handleRedirectCallback();

            const token = await auth0Client.getTokenSilently();
            sessionStorage.setItem("auth0token", token);

            getDevices();
            console.log("Logged in");
        } catch (err) {
            console.log("Error parsing redirect:", err);
        }

        window.history.replaceState({}, document.title, "/");
    }

    setDisabledFlag();
};