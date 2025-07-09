import { PickType } from "@nestjs/mapped-types";
import { RegisterInput } from "./register.input";
import { ApiProperty } from "@nestjs/swagger";
import * as Joi from 'joi';
import { JoiSchema, JoiSchemaOptions } from "nestjs-joi";


@JoiSchemaOptions({
  allowUnknown: false,
})
export class LoginInput extends PickType(RegisterInput,
  ['email', 'password'] as const
) {
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