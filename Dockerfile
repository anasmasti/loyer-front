FROM node:lts-alpine3.14 as build
RUN mkdir -p /app

WORKDIR /app

COPY package.json /app/
RUN npm install --legacy-peer-deps

COPY . /app/
RUN npm run build --prod

FROM nginx:stable
COPY --from=build /app/dist/loyer-front /usr/share/nginx/html

# docker build --tag loyer .
# docker image ls
# docker run -d -p 192.168.11.102:80:80 loyer