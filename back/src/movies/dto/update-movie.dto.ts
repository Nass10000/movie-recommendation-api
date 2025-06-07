import { PartialType } from '@nestjs/mapped-types';
import { CreateMovieDto } from './create-movie.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreateMovieDto)
export class UpdateMovieDto extends PartialType(CreateMovieDto) {}
