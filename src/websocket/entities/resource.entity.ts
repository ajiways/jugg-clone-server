import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Location } from './location.entity';

@Entity('resources')
export class Resource extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  masteryMin: number;

  @Column()
  masteryMax: number;

  @Column()
  fatigueReq: number;

  @Column()
  previewSrc: string;

  @ManyToOne(() => Location, (location) => location.resources, {
    cascade: true,
    eager: true,
  })
  @JoinColumn({ name: 'location_id', referencedColumnName: 'id' })
  location: Location;

  @Column({ default: 0 })
  timeToGather: number;

  @Column({ default: 0, type: 'float' })
  chanceToGather: number;
}
