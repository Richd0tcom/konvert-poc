import { PickType } from "@nestjs/mapped-types";
import { Quote } from "@common/entities";

export class QuoteResponse extends PickType(Quote, ['exchange_rate', 'fee', 'resulting_fiat_amount']) { }
