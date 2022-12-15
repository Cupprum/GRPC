FROM python:3.10.9-buster

COPY . app
WORKDIR app

RUN pip install .

CMD ["python3", "client.py"]
