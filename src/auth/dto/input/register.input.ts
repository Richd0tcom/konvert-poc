import { ApiProperty } from "@nestjs/swagger";

export class RegisterInput {

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