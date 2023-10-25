FROM node:alpine

WORKDIR /app/


COPY package.json ./
RUN npm install
RUN npm install cors
# sudo apt install nodejs # 



COPY . .

ENTRYPOINT ["node", "server.js"]