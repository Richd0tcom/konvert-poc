import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'country_fees' })
export class Fee {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', })
    countryCode: string; // ISO 3166-1 alpha-3 country code

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

}