FROM python:3.10.9-buster

COPY ./dist app
WORKDIR app

EXPOSE 3000
CMD ["python", "-m", "http.server", "3000"]
