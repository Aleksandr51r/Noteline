FROM node:alpine

WORKDIR /app

EXPOSE 3000

COPY package*.json ./

RUN  npm install

COPY . . /app/

CMD [ "npm", "start" ]
