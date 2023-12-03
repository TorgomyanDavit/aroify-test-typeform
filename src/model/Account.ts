import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Bank } from './Bank';
import { Currency } from './Currency';

@Entity({ name: 'accounts' })
export class Account {
  @PrimaryGeneratedColumn()
    account_id!: number;

  @Column()
    bank_id!: number;

  @Column()
    currency_id!: number;

  @Column({ type: 'varchar', length: 20, nullable: false, name: 'accountNumber' })
    accountNumber!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'accountName' })
    accountName!: string;
}