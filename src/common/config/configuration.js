import * as dotenv from 'dotenv';

dotenv.config();

export const appConfig = {
    port: parseInt(process.env.PORT || '3000', 10),
    host: process.env.HOST || '0.0.0.0',
};

export const databaseConfig = {
    databaseUrl: process.env.DATABASE_URL || '',
}
