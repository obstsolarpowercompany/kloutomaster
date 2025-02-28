FROM node:16.17.1-alpine AS builder
WORKDIR /usr/src/build
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:16.17.1-alpine AS runner-production
ARG PORT=3000
ARG NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production --ignore-scripts && npm cache clean --force
RUN npm run migration:run
COPY --from=builder /usr/src/build/dist ./dist
RUN chown -R node:node /usr/src/app
USER node
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]

FROM node:16.17.1-alpine AS runner-development
ARG PORT=3000
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --ignore-scripts && npm cache clean --force
RUN npm run migration:run
EXPOSE ${PORT}
CMD ["npm", "run", "start:dev"]
