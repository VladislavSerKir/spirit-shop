<div align="center">
<h1>Онлайн магазин Spirit shop</h1>
  </div>

  ![image](https://github.com/user-attachments/assets/539c8899-3c2a-44f0-946c-61db6e2f50b7)
  
## 🛠 Используемые технологии

Front-end: `React`, `Typescript`, `Redux toolkit`, `SASS`, `i18n`, `oauth2`, `google-oauth2`, `google-sheets`, `xlsx`, `recharts`, `toastify`

Back-end: `PostgresSQL`, `NestJS`

Документация: `Swagger`, `Storybook`

Около 90% содержимого контанта адаптивно под разные разрешения (PC, планшеты, мобильные телефоны).

## :wrench: Запуск проекта локально

Скопировать проект
```bash
  git clone https://github.com/VladislavSerKir/spirit-shop
```
Перейти в директорию серверной кодовой базы
```bash
  cd spirit-shop/server
```
Установить зависимости серверной части
```bash
  npm install
```
Запустить серверную часть
```bash
  npm run start
```
Перейти в директорию клиентской кодовой базы
```bash
  cd spirit-shop/client
```
Установить зависимости клиентской части
```bash
  npm install
```
Запустить клиентскую часть
```bash
  npm start start
```
Для просмотра фронтенд документации Storybook (запуск по умолчанию на 3002 порту)
```bash
  npm start storybook
```
Серверная документация Swagger доступна по URL `http://localhost:3001/api#/`

## :earth_asia: Переменные окружения

Для того чтобы запустить проект, создайте базу данных PostgresSQL локально и скопируйте значения полей. Создайте в директории серверной кодовой базы файл **.env** и проставьте значения полей переменных, указанных ниже. Так же, вы можете воспользоваться значеними из **.env.template**:

`DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_USERNAME`, `DATABASE_PASSWORD`, `DATABASE_NAME`

Для работы аутентификации через сторонние сервисы (Google, Yandex), создайте в Google console новый проект и скопируйте значения в поля:

`GOOGLE_CLIENT_ID`, `GOOGLE_SECRET`, `GOOGLE_REDIRECT_URI`

Аналогично, для работы аутентификации Yandex, создайте новый проект в Yandex oauth API и заполните поля:

`YANDEX_CLIENT_ID`, `YANDEX_CLIENT_SECRET`, `YANDEX_REDIRECT_URI`  

## :factory: Диаграмма сущностей Plant UML

<img src="server/scheme.png"></img>

