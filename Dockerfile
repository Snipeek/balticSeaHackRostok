#FROM node:latest as builder
#WORKDIR /usr/app
#COPY package*.json ./
#COPY . .
#RUN ["npm", "install"]
#RUN ["npm", "run", "build"]
#
#FROM node:alpine as serve
#WORKDIR /usr/app
#COPY --from=builder /usr/app/dist ./
#COPY --from=builder /usr/app/node_modules ./
#COPY --from=builder /usr/app/package* ./
#RUN ["npm", "run",  "production"]
FROM node:alpine

ENV TITLE=

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . /app
RUN npm run build

RUN npm run build

CMD ["npm", "run", "production"]
