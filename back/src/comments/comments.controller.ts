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
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Crear un nuevo comentario' })
  @ApiResponse({ status: 201, description: 'Comentario creado correctamente.' })
  @ApiBody({ type: CreateCommentDto })
  @Post()
  create(@Body() dto: CreateCommentDto) {
    console.log('POST /comments', dto); // 👈 log para debug
    return this.commentsService.create(dto);
  }

  @ApiOperation({ summary: 'Obtener todos los comentarios' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios.' })
  @Get()
  findAll() {
    console.log('GET /comments'); // 👈 log para debug
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un comentario por ID' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`GET /comments/${id}`); // 👈 log para debug
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return comment;
  }

  @ApiOperation({ summary: 'Actualizar un comentario' })
  @ApiResponse({ status: 200, description: 'Comentario actualizado correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @ApiBody({ type: UpdateCommentDto })
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateCommentDto) {
    console.log(`PUT /comments/${id}`, dto); // 👈 log para debug
    return this.commentsService.update(id, dto);
  }

  @ApiOperation({ summary: 'Eliminar un comentario' })
  @ApiResponse({ status: 200, description: 'Comentario eliminado correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log(`DELETE /comments/${id}`); // 👈 log para debug
    return this.commentsService.remove(id);
  }

  @ApiOperation({ summary: 'Actualizar el sentimiento de un comentario' })
  @ApiResponse({ status: 200, description: 'Sentimiento actualizado correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @ApiBody({ schema: { type: 'object', properties: { sentiment: { type: 'string' } } } })
  @Put(':id/sentiment')
  async updateSentiment(
    @Param('id') id: string,
    @Body('sentiment') sentiment: string,
  ) {
    console.log(`PUT /comments/${id}/sentiment`, sentiment); // 👈 log para debug
    return this.commentsService.updateSentiment(id, sentiment);
  }
}
