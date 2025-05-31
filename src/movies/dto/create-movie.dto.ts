import { IsString, IsOptional } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title!: string;

  @IsString()
  description!: string;

  @IsString()
  genre!: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
