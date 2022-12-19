# Simple GRPC project

POC of GRPC for educational purposes.

## Parts
- Server - implemented in golang.
- GRPC version of client - implemented in Python.
- Grpc-web version of client - implemented in TypeScript as a SPA (Single Page Application).
- Envoy - configuration of reverse proxy for grpc-web.

## Run localy
Use Dockerfiles to figure out how to install and run the actual parts localy.

Scripts, which build and run containers are in each folder.
The root folder also contains `docker-compose` file.
Run it with `docker compose up` command after you build the images.

The python client requires following environmental variables.
You can create a `.env` file in the root folder of project with following variables.
```
GRPC_AUTH0_ISSUER_URL=my_issuer.eu.auth0.com
GRPC_AUTH0_CLIENT_ID=my_personal_id
GRPC_AUTH0_CLIENT_SECRET=do_you_really_think_i_would_leave_the_secret_here
GRPC_AUTH0_AUDIENCE=http://localhost:50051
```