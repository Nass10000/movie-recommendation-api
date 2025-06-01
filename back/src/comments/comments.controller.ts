import { Controller, Post, Body, Get, Put, Param, ParseUUIDPipe } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Put(':id/sentiment')
updateSentiment(@Param('id', ParseUUIDPipe) id: string, @Body('sentiment') sentiment: string) {
  return this.commentsService.updateSentiment(id, sentiment);
}

}
