import { Vote as IVote } from '../../../../common/poll';
import { Answer } from './answer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Poll } from './poll.entity';

@Entity()
export class Vote implements IVote {
  @ManyToOne(() => Answer)
  answer: Answer;

  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userName: string;

  @ManyToOne(() => Poll, (p) => p.result)
  poll: Poll;
}
