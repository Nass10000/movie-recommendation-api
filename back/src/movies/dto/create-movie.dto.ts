import { IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({ example: 'Matrix' })
  @IsString()
  title!: string;

  @ApiProperty({ example: 'Película de ciencia ficción.' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 'Sci-Fi' })
  @IsString()
  genre!: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.jpg' })
  @IsOptional()
  @IsString()
  imageUrl?: string;
}
