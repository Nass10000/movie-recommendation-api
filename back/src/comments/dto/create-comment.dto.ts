// create-comment.dto.ts
import { IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content!: string;

  @IsUUID()
  movieId!: string;

  @IsUUID()
  userId!: string;
}
