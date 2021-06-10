FROM node:latest

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


ENV PORT=5000
ENV HOST=coffee-shop-db
ENV USER=root
ENV PASSWORD=password
ENV DB_PORT=3306
ENV DB_NAME=coffee_shop_db
ENV JWT_SECRET=thisissupposedtobeascret
ENV JWT_EXPIRES_IN=90d
ENV JWT_COOKIE_EXPIRES=90

EXPOSE 5000

CMD ["npm", "start"]

# CMD /wait && npm start
