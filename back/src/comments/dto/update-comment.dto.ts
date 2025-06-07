import { PartialType } from '@nestjs/mapped-types';
import { CreateCommentDto } from './create-comment.dto';
import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels(CreateCommentDto)
export class UpdateCommentDto extends PartialType(CreateCommentDto) {}
