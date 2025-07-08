import { Body, Controller, Get, Post, UseFilters, UseGuards } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { GetQuoteInput } from './dto/input.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { UserWithAuth } from 'src/auth/dto/responses/auth.response';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { HttpExceptionFilter } from '@common/filters/exception.filter';
import { Throttle, seconds } from '@nestjs/throttler';

@ApiBearerAuth()
@UseFilters(HttpExceptionFilter)
@UseGuards(JwtAuthGuard)
@Throttle({ default: { limit: 10, ttl: seconds(30) } })
@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {
  }

  @Post('')
  getQuote(@Body() input: GetQuoteInput, @CurrentUser() user: UserWithAuth){
    return this.quoteService.getQuote(input, user.id);
  }

  @Get('supported-currencies')
  getSupportedCurrencies(){
    return this.quoteService.getSupportedCurrencies();
  }
}
