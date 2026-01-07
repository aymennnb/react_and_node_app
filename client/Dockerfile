FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

RUN addgroup -g 1001 -S webuser && adduser -S webuser -u 1001

RUN chown -R webuser:webuser /app && \
    chmod 755 /app

COPY --chown=webuser:webuser . .

USER webuser

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]