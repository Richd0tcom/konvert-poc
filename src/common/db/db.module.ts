import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        url: configService.get('MYSQL_URL'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        migrations: [__dirname+ 'migrations/**/*{.ts,.js}'],
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        migrationsTableName: 'migrations',
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}