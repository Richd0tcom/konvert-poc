import { Body, Controller, Post } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { GetQuoteInput } from './dto/input.dto';
import { CurrentUser } from '@common/decorators/current-user.decorator';
import { UserWithAuth } from 'src/auth/dto/responses/auth.response';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {
  }

  @Post('')
  getQuote(@Body() input: GetQuoteInput, @CurrentUser() user: UserWithAuth){
    return this.quoteService.getQuote(input, user.id);
  }
}
