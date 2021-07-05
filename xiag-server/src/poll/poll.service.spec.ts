import { Test, TestingModule } from '@nestjs/testing';
import { PollService } from './poll.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Answer } from './entities/answer.entity';

describe('PollService', () => {
  let service: PollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollService,
        {
          provide: getRepositoryToken(Poll),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Answer),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<PollService>(PollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
