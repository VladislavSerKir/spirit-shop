import { AppConfiguration } from 'src/common/types/system.types';

export default (): AppConfiguration => ({
  server: {
    port: Number(process.env.PORT) || 3001,
    cors_origins: process.env.CORS_ORIGINS,
    http_address: process.env.HTTP_ADDRESS,
  },
  database: {
    type: 'postgres',
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB || 'shop_db',
    synchronize: process.env.TYPEORM_SYNC === '1',
  },
  jwt: {
    access: process.env.JWT_ACCESS_SECRET || 'access-secret',
    refresh: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    key: process.env.JWT_KEY || 'my-secret',
    ttl: process.env.JWT_TTL || 60,
  },
  yandex: {
    client_id: process.env.YANDEX_CLIENT_ID,
    client_secret: process.env.YANDEX_CLIENT_SECRET,
    redirect_uri: process.env.YANDEX_REDIRECT_URI,
  },
  google: {
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_SECRET,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
  },
  password: {
    saltRounds: Number(process.env.SALT) || 10,
  },
});
