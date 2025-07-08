import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';


config();

const configService = new ConfigService();

export default new DataSource({
  type: 'mysql',
  url: configService.getOrThrow('MYSQL_URI'),
  migrations: ['migrations/**'],
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
});