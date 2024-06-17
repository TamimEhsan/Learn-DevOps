FROM node:13-alpine

# set default dir so that next commands executes in /home/app dir
WORKDIR /app

# copy package.json and package-lock.json and npm install before copying the rest of the files
# to take advantage of docker caching
COPY package*.json ./
RUN npm install

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

COPY . .

EXPOSE 3000
# no need for /home/app/server.js because of WORKDIR
CMD ["node", "server.js"]

