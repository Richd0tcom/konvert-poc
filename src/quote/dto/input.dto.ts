import { Quote } from "@common/entities";
import { PickType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import Joi from "joi";
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";


@JoiSchemaOptions({
  allowUnknown: false,
})
export class GetQuoteInput extends PickType(Quote, ['input_amount', 'input_currency', 'output_currency']) {

    @ApiProperty({
        example: 5000,
        required: true
    })
    @JoiSchema(Joi.number().required().min(1))
    input_amount: number;

    @ApiProperty({
        example: 'usdt',
        required: true
    })
    @JoiSchema(Joi.string().required())
    input_currency: string;

    @ApiProperty({
        example: 'ngn',
        required: true
    })
    @JoiSchema(Joi.string().required())
    output_currency: string;
}