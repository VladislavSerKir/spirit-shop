export type ServerConfiguration = {
  port: number;
  cors_origins?: string;
  http_address?: string;
};

export type DatabaseConfiguration = {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
};
export type JWTConfiguration = {
  access: string;
  refresh: string;
  key: string;
  ttl: string;
};

export type JwtPayload = {
  sub: string;
  username: string;
};

export type CryptoConfiguration = {
  saltRounds: number;
};

export type AppConfiguration = {
  server: ServerConfiguration;
  database: DatabaseConfiguration;
  jwt: JWTConfiguration;
  password: CryptoConfiguration;
};
