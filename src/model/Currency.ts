import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Account } from './Account';

@Entity({ name: 'currencies' })
export class Currency {
  @PrimaryGeneratedColumn()
    currency_id!: number;
  @Column({ type: 'varchar', length: 3, nullable: false, name: 'isoCode' })
    isoCode!: string;

  @Column({ type: 'varchar', length: 255, nullable: false, name: 'countryOrigin' })
    countryOrigin!: string;

  @Column({ type: 'varchar', length: 10, nullable: false, name: 'signCharacter' })
    signCharacter!: string;
}