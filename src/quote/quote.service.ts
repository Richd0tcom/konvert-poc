import { HttpService } from '@nestjs/axios';
import { ForbiddenException, HttpCode, HttpStatus, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { GetQuoteInput } from './dto/input.dto';
import { ConfigService } from '@nestjs/config';
import { CG_PRICE_ENDPOINT, CG_SUPPORTED_CURRENCIES_ENDPOINT } from '@common/constants';
import { CGQuote } from '@common/types';
import { Repository } from 'typeorm';
import { Quote } from '@common/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Fee } from '@common/entities/fee.entity';

@Injectable()
export class QuoteService {
    constructor(
        private readonly httpService: HttpService,
        private readonly configService: ConfigService,
        @InjectRepository(Quote) private readonly quoteRepo: Repository<Quote>,
        @InjectRepository(Fee) private readonly feesRepo: Repository<Fee>
    ) { }


    private async doRequest<T>(url: string): Promise<T> {

        try {
            const apiKey = this.configService.get<string>('COINGECKO_API_KEY');
            const response = await this.httpService.axiosRef.get<T>(url, {
                headers: {
                    CG_API_KEY_HEADER: apiKey
                }
            });
            return response.data;
        } catch (error) {
            if (error.code == HttpStatus.TOO_MANY_REQUESTS) {
                throw new NotAcceptableException("Too many requests")
            }
            throw new InternalServerErrorException(`Failed to do request: ${error.message}`);
        }
    }

    async geCGQuote(input: GetQuoteInput) {
        const baseurl = this.configService.get<string>('COINGECKO_BASE_URL');
        const url = `${baseurl}/${CG_PRICE_ENDPOINT}?symbols=${input.input_currency}&vs_currencies=${input.output_currency}`;

        return await this.doRequest<CGQuote>(url);
    }

    async getSupportedCurrencies() {
        const baseurl = this.configService.get<string>('COINGECKO_BASE_URL');
        const url = `${baseurl}/${CG_SUPPORTED_CURRENCIES_ENDPOINT}`;

        const response = await this.doRequest<string[]>(url);

        return response;
    }

    async getQuote(input: GetQuoteInput, userId: string) {
        const response = await this.geCGQuote(input);

        if (!response?.[input.input_currency]?.[input.output_currency]) {
            throw new NotFoundException(`Exchange rate not found for ${input.input_currency} → ${input.output_currency}`);
        }

        
        const defaultFee = this.configService.getOrThrow<number>('CONVERSION_FEE_PERCENTAGE');

        const feePercentage = await this.feesRepo.findOne({
            where: { countryCode: input.output_currency }
        }).then(fee => fee?.amount ?? defaultFee);

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
