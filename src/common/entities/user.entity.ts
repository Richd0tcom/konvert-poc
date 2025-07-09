import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';


@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column()
  email: string;



  @Column()
  @Exclude({ toPlainOnly: true }) 
  password: string;


  @Column()
  role: UserRole;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}