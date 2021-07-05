import { IsNotEmpty, ArrayUnique, ArrayMinSize } from 'class-validator';
import { CreatePollDto as CreateDto } from '../../../../common/poll';

export class CreatePollDto implements CreateDto {
  @IsNotEmpty()
  question: string;

  @ArrayMinSize(2)
  @ArrayUnique()
  answersList: string[];
}
