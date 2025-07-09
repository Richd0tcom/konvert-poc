import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quote } from '@common/entities';
import { HttpModule } from '@nestjs/axios';
import { Fee } from '@common/entities/fee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quote, Fee]), HttpModule],
  controllers: [QuoteController],
  providers: [QuoteService],
})
export class QuoteModule {}
