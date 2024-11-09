import { AppConfiguration } from 'src/common/types/system.types';

export default (): AppConfiguration => ({
  server: {
    port: Number(process.env.SERVER_PORT) || 3001,
    cors_origins: process.env.CORS_ORIGINS,
    http_address: process.env.HTTP_ADDRESS,
  },
  database: {
    host: process.env.DATABASE_HOST || '127.0.0.1',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME || 'shop_db',
  },
  jwt: {
    access: process.env.JWT_ACCESS_SECRET || 'access-secret',
    refresh: process.env.JWT_REFRESH_SECRET || 'refresh-secret',
    key: process.env.JWT_KEY || 'my-secret',
    ttl: process.env.JWT_TTL || 60,
  },
  password: {
    saltRounds: Number(process.env.SALT) || 10,
  },
});
