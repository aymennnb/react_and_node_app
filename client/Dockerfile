FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

RUN addgroup -g 1001 -S appuser && adduser -S appuser -u 1001

RUN chown -R appuser:appuser /app && \
    chmod 755 /app

COPY --chown=appuser:appuser . .

USER appuser

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]