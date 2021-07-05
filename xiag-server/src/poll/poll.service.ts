import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PollDto } from '../../../common/poll';
import { Poll } from './entities/poll.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from './entities/answer.entity';
import { CreatePollDto } from './dto/poll';
import { Vote } from './entities/vote.entity';
import { AddVoteDto } from './dto/addVote.dto';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private pollRepo: Repository<Poll>,
    @InjectRepository(Answer)
    private answerRepo: Repository<Answer>,
    @InjectRepository(Vote)
    private voteRepo: Repository<Vote>,
  ) {}

  async create(createPollDto: CreatePollDto): Promise<PollDto> {
    const poll = new Poll();
    poll.question = createPollDto.question;
    await this.pollRepo.save(poll);
    await this.addAnswers(createPollDto.answersList, poll);
    return poll;
  }

  async addAnswers(list: string[], poll: Poll) {
    for (const s of list) {
      const answer = new Answer();
      answer.title = s;
      answer.poll = poll;
      await this.answerRepo.save(answer);
    }
  }

  async findOne(id: string): Promise<PollDto> {
    return this.pollRepo.findOne(id, {
      relations: ['answers', 'result', 'result.answer'],
    });
  }

  async addVote(pollId: string, addVoteDto: AddVoteDto): Promise<PollDto> {
    const poll = await this.pollRepo.findOne(pollId);
    const answer = await this.answerRepo.findOne(addVoteDto.answerId, {
      where: { poll },
    });
    if (!answer)
      throw new HttpException(
        'answerId not in Poll.answers',
        HttpStatus.BAD_REQUEST,
      );
    const vote = new Vote();
    vote.poll = poll;
    vote.answer = answer;
    vote.userName = addVoteDto.userName;
    await this.voteRepo.save(vote);
    return await this.pollRepo.findOne(pollId, {
      relations: ['answers', 'result', 'result.answer'],
    });
  }
}
