import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { GetQuoteInput } from './dto/input.dto';
import { ConfigService } from '@nestjs/config';
import { CG_PRICE_ENDPOINT, CG_SUPPORTED_CURRENCIES_ENDPOINT } from '@common/constants';
import { CGQuote } from '@common/types';
import { Repository } from 'typeorm';
import { Quote } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuoteService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(Quote) private readonly quoteRepo: Repository<Quote>
    ){}


    private async doRequest<T>(url: string): Promise<T> {
        try {
            const response = await this.httpService.axiosRef.get<T>(url);
            return response.data;
        } catch (error) {
            throw new Error(`Failed to do request: ${error.message}`);
        }
    }

    async geCGQuote(input: GetQuoteInput) {
        const baseurl = this.configService.get<string>('COIN_GECKO_API_URL');
        const url = `${baseurl}/${CG_PRICE_ENDPOINT}?ids=${input.input_currency}&vs_currencies=${input.output_currency}`;

        const response = await this.doRequest<CGQuote>(url);

        return response;
    }    

    async getSupportedCurrencies() {
        const baseurl = this.configService.get<string>('COIN_GECKO_API_URL');
        const url = `${baseurl}/${CG_SUPPORTED_CURRENCIES_ENDPOINT}`;

        const response = await this.doRequest<string[]>(url);

        return response;
    }

    async getQuote(input: GetQuoteInput, userId: string) {
        const response = await this.geCGQuote(input);

        const feePercentage = this.configService.getOrThrow<number>('CONVERSION_FEE_PERCENTAGE');

        const exchangeRate = response[input.input_currency][input.output_currency];

        const resulting_fiat = input.input_amount * exchangeRate;
        const fee = resulting_fiat * feePercentage;

        const quote = this.quoteRepo.create({
            input_amount: input.input_amount,
            input_currency: input.input_currency,
            output_currency: input.output_currency,
            exchange_rate: exchangeRate,
            fee,
            resulting_fiat_amount: resulting_fiat,
            timestamp: new Date(),
            user: { id: userId }   
        });

        await this.quoteRepo.save(quote);

        return {
            exchange_rate: exchangeRate,
            fee,
            resulting_fiat_amount: resulting_fiat
        };
    }
}
