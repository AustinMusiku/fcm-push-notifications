FROM node:alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN yarn install

COPY . .

RUN yarn run build


FROM node:alpine AS server

WORKDIR /app

COPY package* ./

RUN yarn install --production

COPY --from=builder ./app/dist ./dist

EXPOSE 8080

CMD ["yarn", "start"]
