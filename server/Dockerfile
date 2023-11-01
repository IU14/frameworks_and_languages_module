FROM node:alpine

WORKDIR /app/


COPY package.json ./
RUN npm install
RUN npm install cors
RUN npm install body-parser
# sudo apt install nodejs # 



COPY . .

ENTRYPOINT ["node", "server.js"]