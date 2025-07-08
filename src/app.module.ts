import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { QuoteModule } from './quote/quote.module';

@Module({
  imports: [AuthModule, AdminModule, QuoteModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
