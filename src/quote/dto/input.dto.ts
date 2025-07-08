import { Quote } from "@common/entities";
import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";

export class GetQuoteInput extends PickType(Quote, ['input_amount', 'input_currency', 'output_currency']) {

    @ApiProperty({
        example: 5000,
        required: true
    })
    input_amount: number;

    @ApiProperty({
        example: 'usdt',
        required: true
    })
    input_currency: string;

    @ApiProperty({
        example: 'ngn',
        required: true
    })
    output_currency: string;
}