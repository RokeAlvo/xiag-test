import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './answer.entity';
import { Vote } from './vote.entity';

@Entity()
export class Poll {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  question: string;

  @OneToMany(() => Answer, (a) => a.poll)
  answers: Answer[];

  @OneToMany(() => Vote, (v) => v.poll)
  result: Vote[];
}
