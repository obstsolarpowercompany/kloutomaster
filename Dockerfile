FROM node:16.17.1-alpine AS builder
WORKDIR /usr/src/build
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci
COPY . ./
RUN npm run build

FROM node:16.17.1-alpine AS runner
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --production --ignore-scripts && npm cache clean --force
COPY --from=builder /usr/src/build/dist ./dist
RUN chown -R node:node /usr/src/app
USER node
EXPOSE ${PORT}
CMD ["npm", "run", "start:prod"]