import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { Answer } from './entities/answer.entity';
import { Poll } from './entities/poll.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Poll, Answer, Vote])],
  controllers: [PollController],
  providers: [PollService],
})

export class PollModule {}
