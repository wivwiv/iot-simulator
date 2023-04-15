FROM node:14-alpine

WORKDIR /app

COPY index.js package.json yarn.lock ./

RUN yarn install && yarn link

RUN apk add --no-cache bash

CMD /bin/bash
