import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

dotenv.config();

let dataSourceOptions: any = {
  type: 'postgres',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/*{.ts,.js}'],
};

const isProduction = process.env.NODE_ENV === 'production';
// Solo true si la variable existe y no está vacía ni es 'undefined'
const hasDatabaseUrl =
  !!process.env.DATABASE_URL &&
  process.env.DATABASE_URL !== 'undefined' &&
  process.env.DATABASE_URL.trim() !== '';

if (hasDatabaseUrl && isProduction) {
  // Render/producción: usa DATABASE_URL y ssl
  console.log('🟢 Conectando a base de datos REMOTA (Render/producción)');
  dataSourceOptions = {
    ...dataSourceOptions,
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  };
} else {
  // Local: usa los valores individuales, sin ssl
  console.log('🟢 Conectando a base de datos LOCAL');
  dataSourceOptions = {
    ...dataSourceOptions,
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'tu_password_local',
    database: process.env.DB_NAME || 'movie_recommender',
    ssl: false,
  };
}

export const AppDataSource = new DataSource(dataSourceOptions);
