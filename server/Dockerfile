# Используйте базовый образ Node.js
FROM node:20-alpine

# Установите bash
RUN apk add --no-cache bash

# Установите рабочую директорию
WORKDIR /app

# Скопируйте package.json и package-lock.json
COPY package*.json ./

# Установите зависимости
RUN npm ci

# Скопируйте остальные файлы проекта
COPY . ./

# Скопируйте wait-for-it.sh и сделайте его исполняемым
COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh

# Укажите команду для запуска приложения
CMD ["npm", "run", "start:dev"]