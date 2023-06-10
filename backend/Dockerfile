FROM node:18

WORKDIR /usr/app

COPY ./package*.json /usr/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3008

CMD [ "npm", "run", "start:dev" ]