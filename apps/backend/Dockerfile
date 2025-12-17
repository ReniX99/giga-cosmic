FROM node:22.20-alpine3.21 as build-stage

WORKDIR /app

RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN pnpx prisma generate

RUN pnpm run build

EXPOSE 3000

CMD ["sh", "-c", "pnpx prisma migrate deploy && pnpm run start:prod"]
