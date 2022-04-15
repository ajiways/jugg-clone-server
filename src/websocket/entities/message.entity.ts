import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('messages')
export class MessageEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  //Слишком лень делать здесь нормальные отношения, поэтому просто column
  @Column()
  author: string;

  @Column()
  content: string;

  @Column()
  date: string;

  @CreateDateColumn()
  createdAt: number;
}
