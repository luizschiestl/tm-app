FROM node:18

WORKDIR /usr/app

COPY ./package*.json /usr/app

RUN npm install

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "dev" ]