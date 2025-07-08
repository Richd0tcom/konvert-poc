import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quote } from '@common/entities';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Quote) private readonly quoteRepo: Repository<Quote>
  ){}

  async findAll() {
    const quotes = await this.quoteRepo.createQueryBuilder()
    .orderBy('timestamp', 'DESC')
    .limit(50)
    .getMany()

    return quotes
  }

  async exportToCSV(){
    const quotes = await this.quoteRepo.createQueryBuilder()
    .orderBy('timestamp', 'DESC')
    .limit(50)
    .getMany()

    const csv = quotes.map((quote) => {
      return {
        id: quote.id,
        input_amount: quote.input_amount,
        input_currency: quote.input_currency,
        output_currency: quote.output_currency,
        exchange_rate: quote.exchange_rate,
        fee: quote.fee,
        resulting_fiat_amount: quote.resulting_fiat_amount,
        timestamp: quote.timestamp,
        user: quote.user
      }
    })

    const csvString = csv.join('\n')
    return csvString
  }
}
