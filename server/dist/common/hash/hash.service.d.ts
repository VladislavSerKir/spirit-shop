import { ConfigService } from '@nestjs/config';
export declare class HashService {
    private readonly configService;
    private static _saltRounds;
    constructor(configService: ConfigService);
    static generateHash(password: string): Promise<string>;
    static generateCodeHash(code: number): Promise<number>;
    static compareHash(password: string, hash: string): Promise<boolean>;
}
