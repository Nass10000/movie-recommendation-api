import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  create(@Body() dto: CreateCommentDto) {
    console.log('POST /comments', dto); // 👈 log para debug
    return this.commentsService.create(dto);
  }

  @Get()
  findAll() {
    console.log('GET /comments'); // 👈 log para debug
    return this.commentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`GET /comments/${id}`); // 👈 log para debug
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return comment;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    console.log(`PUT /comments/${id}`, dto); // 👈 log para debug
    return this.commentsService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(`DELETE /comments/${id}`); // 👈 log para debug
    return this.commentsService.remove(id);
  }

  @Put(':id/sentiment')
  async updateSentiment(
    @Param('id') id: string,
    @Body('sentiment') sentiment: string,
  ) {
    console.log(`PUT /comments/${id}/sentiment`, sentiment); // 👈 log para debug
    return this.commentsService.updateSentiment(id, sentiment);
  }
}
