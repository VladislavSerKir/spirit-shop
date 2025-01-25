export type ServerConfiguration = {
    port: number;
    cors_origins?: string;
    http_address?: string;
};
export type DatabaseConfiguration = {
    type: string;
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    synchronize: boolean;
};
export type JWTConfiguration = {
    access: string;
    refresh: string;
    key: string;
    ttl: string | number;
};
export type JwtPayload = {
    sub: string;
    username: string;
};
export type CryptoConfiguration = {
    saltRounds: number;
};
export type YandexConfiguration = {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
};
export type GoogleConfiguration = {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
};
export type AppConfiguration = {
    server: ServerConfiguration;
    database: DatabaseConfiguration;
    jwt: JWTConfiguration;
    password: CryptoConfiguration;
    yandex: YandexConfiguration;
    google: GoogleConfiguration;
};
