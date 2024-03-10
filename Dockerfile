FROM node:18-alpine

ARG MAX_OLD_SPACE_SIZE=4096
ENV NODE_OPTIONS=--max-old-space-size=${MAX_OLD_SPACE_SIZE}

WORKDIR /usr/src/app
COPY .npmrc .npmrc
COPY package.json ./
RUN npm install
COPY . .
RUN npm install -g @nestjs/cli
RUN npm run build
RUN rm -f .npmrc

EXPOSE 8080
CMD ["node", "dist/main"]