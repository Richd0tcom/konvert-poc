import { PickType } from "@nestjs/mapped-types";
import { RegisterInput } from "./register.input";
import { ApiProperty } from "@nestjs/swagger";

export class LoginInput extends PickType(RegisterInput,
  ['email', 'password'] as const
) {
    @ApiProperty({
      example: 'rehmat.sayani@gmail.com',
      required: true
   })
  email: string;


    @ApiProperty({
      example: 'ghvjhgt76',
      required: true
   })
  password: string;
}