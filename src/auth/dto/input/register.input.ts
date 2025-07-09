import { ApiProperty } from "@nestjs/swagger";
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";


@JoiSchemaOptions({
  allowUnknown: false,
})
export class RegisterInput {

  @ApiProperty({
    example: 'rehmat.sayani@gmail.com',
    required: true
  })
  @JoiSchema(Joi.string().email().required())
  email: string;


  @ApiProperty({
    example: 'ghvjhgt76',
    required: true
  })   
  @JoiSchema(Joi.string().required())
  password: string;
}