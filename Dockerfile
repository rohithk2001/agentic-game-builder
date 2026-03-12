FROM node:20

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

RUN mkdir -p output

CMD ["node", "index.js"]