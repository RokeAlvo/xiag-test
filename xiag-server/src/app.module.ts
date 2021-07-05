import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PollModule } from './poll/poll.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Poll } from './poll/entities/poll.entity';
import { Answer } from './poll/entities/answer.entity';
import { Vote } from './poll/entities/vote.entity';

@Module({
  imports: [
    PollModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './test.db',
      entities: [Poll, Answer, Vote],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
