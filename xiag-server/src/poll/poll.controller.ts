import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollDto } from '../../../common/poll';
import { CreatePollDto } from './dto/poll';
import { AddVoteDto } from './dto/addVote.dto';

@Controller('api/v1/poll')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto): Promise<PollDto> {
    return this.pollService.create(createPollDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PollDto> {
    return this.pollService.findOne(id);
  }

  @Patch(':id')
  addVote(@Param('id') id: string, @Body() addVoteDto: AddVoteDto) {
    return this.pollService.addVote(id, addVoteDto);
  }
}
