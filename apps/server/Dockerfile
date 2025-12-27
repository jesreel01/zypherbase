FROM node:22-alpine

WORKDIR /app

RUN corepack enable

COPY pnpm-workspace.yaml package.json ./

COPY packages ./packages

COPY apps/server ./apps/server

RUN pnpm install

RUN cd packages/shared && pnpm run build

WORKDIR /app/apps/server

EXPOSE 3000

CMD sh -c "cd /app/packages/shared && pnpm run dev & cd /app/apps/server && pnpm run dev"
