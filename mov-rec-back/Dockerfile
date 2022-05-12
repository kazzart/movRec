FROM python:3.7-slim

RUN apt-get update && apt-get -y install gcc mono-mcs && rm -rf /var/lib/apt/lists/*

RUN pip install --upgrade pip

WORKDIR /src

COPY ./requirements.txt ./

RUN pip install -r requirements.txt && pip install scikit-surprise

COPY . .

CMD ["python", "./app/__main__.py"]
