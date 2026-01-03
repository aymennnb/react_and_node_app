FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

RUN addgroup -g 1001 -S appuser && adduser -S appuser -u 1001

COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 5000

CMD ["node", "server.js"]