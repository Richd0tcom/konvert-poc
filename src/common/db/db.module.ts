import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('MYSQL_URI'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname+ 'migrations/**/*{.ts,.js}'],
        autoLoadEntities: true,
        migrationsTableName: 'migrations',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}