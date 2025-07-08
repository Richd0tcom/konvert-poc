import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { QuoteModule } from './quote/quote.module';
import { DatabaseModule } from '@common/db/db.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
    isGlobal: true,
  }), AuthModule, AdminModule, QuoteModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
