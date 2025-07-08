import { Quote } from "@common/entities";
import { PickType } from "@nestjs/mapped-types";

export class GetQuoteInput extends PickType(Quote, ['input_amount', 'input_currency', 'output_currency']) {

}