import * as dotenv from 'dotenv';
import os from 'os';

dotenv.config();

const isWindows = process.platform === 'win32';


export const appConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  host: process.env.HOST || (isWindows ? 'localhost' : '0.0.0.0'),
};

export const databaseConfig = {
  databaseUrl: process.env.DATABASE_URL || '',
}
