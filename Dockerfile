FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build
EXPOSE 4001
ENV MONGO_URL=mongodb://mongo:27017

CMD ["node", "dist/index.js"]

