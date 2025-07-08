import { UserRole } from '@common/enums';
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Quote {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column('decimal', { precision: 18, scale: 8 })
    exchange_rate: number;

    @Column('decimal', { precision: 18, scale: 8 })
    calculated_fee: number;

    @Column('decimal', { precision: 18, scale: 8 })
    resulting_fiat_amount: number;

    @Column('timestamp')
    timestamp: Date;

    @Column('decimal', { precision: 18, scale: 8 })
    input_amount: number;

    @Column('decimal', { precision: 18, scale: 8 })
    fee: number;

    @Column()
    input_currency: string;

    @Column()
    output_currency: string;

    @Column()
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}