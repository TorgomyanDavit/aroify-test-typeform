import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from './Account';

@Entity({name:`banks`})
export class Bank {
    @PrimaryGeneratedColumn()
    bank_id!: number;
  
    @Column({ type: 'varchar', length: 255, nullable: false })
    bankName!: string;
}
