// create-comment.dto.ts
import { IsString, IsUUID, MinLength, IsOptional, IsInt, Min, Max } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content!: string;

  @IsUUID()
  movieId!: string;

  @IsUUID()
  userId!: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
