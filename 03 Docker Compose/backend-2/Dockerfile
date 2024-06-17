FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ENV baseURL="http://api1:8080"

ENV PORT=8088
EXPOSE 8088

CMD ["npm", "start"]
