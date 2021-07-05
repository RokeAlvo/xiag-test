import { Test, TestingModule } from '@nestjs/testing';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';
import { PollDto } from '../../../common/poll';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Poll } from './entities/poll.entity';
import { Answer } from './entities/answer.entity';

describe('PollController', () => {
  let controller: PollController;
  let service: PollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollController],
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

    controller = await module.resolve(PollController);
    service = await module.resolve(PollService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('loadPoll', async () => {
    const result: PollDto = {
      id: '1',
      question: 'question',
      answers: [
        {
          id: '1',
          title: 'title1',
        },
        {
          id: '2',
          title: 'title2',
        },
      ],
    };

    jest
      .spyOn(service, 'findOne')
      .mockImplementation(() => Promise.resolve(result));

    expect(await controller.findOne('1')).toBe(result);
  });
});
