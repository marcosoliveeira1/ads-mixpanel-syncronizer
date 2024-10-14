# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /app

# install dependencies into temp directory
# this will cache them and speed up future builds
FROM base AS install
COPY package.json bun.lockb tsconfig.json ./
RUN bun install --frozen-lockfile
COPY . /app

# run the app
# USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "start" ]