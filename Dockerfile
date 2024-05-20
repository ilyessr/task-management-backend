FROM mongo:latest

RUN apt-get update && \
    apt-get install -y mongodb-clients && \
    rm -rf /var/lib/apt/lists/*
