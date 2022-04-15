import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  login: string;

  @Column()
  password: string;

  @Column({ default: 0 })
  mastery: number;

  @Column({ default: 60 })
  masteryCap: number;

  @Column({ default: 0 })
  fatigue: number;
}
