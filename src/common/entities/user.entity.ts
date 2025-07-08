import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../enums';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;


  @Column()
  email: string;


  @Column()
  password: string;


  @Column()
  role: UserRole;
}