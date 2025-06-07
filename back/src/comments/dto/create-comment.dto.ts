// create-comment.dto.ts
import { IsString, IsUUID, MinLength, IsOptional, IsInt, Min, Max } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: '¡Excelente película!' })
  @IsString()
  @MinLength(1)
  content!: string;

  @ApiProperty({ example: 'uuid-de-la-pelicula' })
  @IsUUID()
  movieId!: string;

  @ApiProperty({ example: 'uuid-del-usuario' })
  @IsUUID()
  userId!: string;

  @ApiPropertyOptional({ minimum: 1, maximum: 5, example: 5 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;
}
