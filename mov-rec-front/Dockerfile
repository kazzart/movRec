FROM node:16 AS build

WORKDIR /src

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build-prod

FROM nginx:latest

RUN mkdir /app

COPY --from=build /src/dist/mov-rec-front /app

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
