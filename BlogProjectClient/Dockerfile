FROM node:alpine AS build

WORKDIR /blog

COPY package*.json ./

RUN npm i && npm ci

COPY . .
ARG GOOGLE_ID
ARG API_ENDPOINT
ENV REACT_APP_GOOGLE_CLIENT_ID=${GOOGLE_ID}
ENV REACT_APP_API_URL=${API_ENDPOINT}

RUN npm run build

FROM nginx:alpine AS runner

COPY --from=build /blog/nginx.conf /etc/nginx/conf.d/default.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /blog/build .

CMD ["nginx", "-g", "daemon off;"]