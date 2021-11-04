FROM node:lts-alpine3.14 as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
RUN npm install

COPY . /app/
RUN npm run build --prod

FROM nginx:stable
COPY --from=build /app/dist/loyer-front /usr/share/nginx/html