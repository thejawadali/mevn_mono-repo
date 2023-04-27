# node image from docker hub
FROM node 

WORKDIR /app

COPY package.json .

RUN npm install

#    source dest
COPY . .

ENV PORT 8080

EXPOSE $PORT

# only run in container
CMD [ "yarn", "serve" ]