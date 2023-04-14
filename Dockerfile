FROM node:14-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY . .

STOPSIGNAL SIGINT
