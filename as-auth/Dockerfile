FROM node:22-alpine3.20

WORKDIR /usr/src/app

ARG MYSQL_DATABASE
ARG MYSQL_USER
ARG MYSQL_PASSWORD
ARG MYSQL_HOSTNAME

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000
CMD [ "npm", "run", "start" ]