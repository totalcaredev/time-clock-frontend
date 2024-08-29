FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
COPY ./package-lock.json .

RUN npm ci

COPY . .

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app /app

RUN npm run build

RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
