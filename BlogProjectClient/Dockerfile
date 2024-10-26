FROM node:alpine AS build

WORKDIR /blog

COPY package*.json ./

RUN npm i && npm ci

COPY . .
ARG GOOGLE_ID
ENV GOOGLE_CLIENT_ID=${GOOGLE_ID}
RUN npm run build

FROM nginx:alpine AS runner

COPY --from=build /blog/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /blog/build .

CMD ["nginx", "-g", "daemon off;"]