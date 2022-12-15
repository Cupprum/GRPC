FROM golang:1.19.4-buster

RUN apt-get update
RUN apt-get install -y libpcap-dev

COPY . app
WORKDIR app
RUN go get ./server
RUN go build -o grpc-server ./server/*.go

EXPOSE 50051
CMD ["/go/app/scripts/start.sh"]
