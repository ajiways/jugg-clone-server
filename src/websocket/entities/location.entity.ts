import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Resource } from './resource.entity';

@Entity('locations')
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  masteryReq: number;

  @OneToMany(() => Resource, (resource) => resource.location, {
    onDelete: 'CASCADE',
  })
  resources: Resource[];

  @Column()
  previewSrc: string;
}
