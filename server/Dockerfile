FROM node:alpine

COPY package.json package.json
RUN npm install 

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]