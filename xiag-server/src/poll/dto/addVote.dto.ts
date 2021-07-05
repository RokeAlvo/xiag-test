import { AddVoteDto as IAddVoteDto } from '../../../../common/poll';
import { IsNotEmpty } from 'class-validator';

export class AddVoteDto implements IAddVoteDto {
  @IsNotEmpty()
  answerId: string;

  @IsNotEmpty()
  userName: string;
}
