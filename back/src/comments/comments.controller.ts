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
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RoleGuard } from '../common/role.guard';
import { Roles } from '../common/roles.decorator';
import { UserRole } from '../common/role.enum';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { Request } from 'express';

@ApiTags('comments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: 'Crear un nuevo comentario (solo USER)' })
  @ApiResponse({ status: 201, description: 'Comentario creado correctamente.' })
  @ApiBody({ type: CreateCommentDto })
  @Post()
  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  create(@Body() dto: CreateCommentDto, @Req() req: Request) {
    // Usa el usuario autenticado, no el que venga en el body
    const userId = (req.user as any).sub; // <--- CAMBIA 'id' por 'sub'
    return this.commentsService.create(dto, userId);
  }

  @ApiOperation({ summary: 'Obtener todos los comentarios (ADMIN o USER)' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios.' })
  @Get()
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  findAll() {
    console.log('GET /comments'); // 👈 log para debug
    return this.commentsService.findAll();
  }

  @ApiOperation({ summary: 'Obtener un comentario por ID (ADMIN o USER)' })
  @ApiResponse({ status: 200, description: 'Comentario encontrado.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @Get(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async findOne(@Param('id') id: string) {
    console.log(`GET /comments/${id}`); // 👈 log para debug
    const comment = await this.commentsService.findOne(id);
    if (!comment) {
      throw new NotFoundException('Comentario no encontrado');
    }
    return comment;
  }

  @ApiOperation({ summary: 'Actualizar un comentario (solo USER)' })
  @ApiResponse({ status: 200, description: 'Comentario actualizado correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @ApiBody({ type: UpdateCommentDto })
  @Put(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.USER)
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @Req() req: Request
  ) {
    console.log(`PUT /comments/${id}`, dto);
    if (!req.user) {
      throw new NotFoundException('Usuario no autenticado');
    }
    return this.commentsService.update(id, dto, (req.user as any).sub); // <-- CAMBIA 'id' por 'sub'
  }

  @ApiOperation({ summary: 'Eliminar un comentario (solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Comentario eliminado correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @Delete(':id')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async remove(@Param('id') id: string, @Req() req: Request) {
    const userId = (req.user as any).sub;
    await this.commentsService.remove(id, userId);
    return { success: true };
  }

  @ApiOperation({ summary: 'Actualizar el sentimiento de un comentario (solo ADMIN)' })
  @ApiResponse({ status: 200, description: 'Sentimiento actualizado correctamente.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID del comentario' })
  @ApiBody({ schema: { type: 'object', properties: { sentiment: { type: 'string' } } } })
  @Put(':id/sentiment')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN)
  async updateSentiment(
    @Param('id') id: string,
    @Body('sentiment') sentiment: string,
  ) {
    console.log(`PUT /comments/${id}/sentiment`, sentiment); // 👈 log para debug
    return this.commentsService.updateSentiment(id, sentiment);
  }

  @ApiOperation({ summary: 'Obtener comentarios por ID de película (ADMIN o USER)' })
  @ApiResponse({ status: 200, description: 'Lista de comentarios para la película.' })
  @ApiParam({ name: 'id', type: 'string', description: 'ID de la película' })
  @Get(':id/comments')
  @UseGuards(RoleGuard)
  @Roles(UserRole.ADMIN, UserRole.USER)
  async getCommentsForMovie(@Param('id') id: string) {
    const comments = await this.commentsService.findByMovieId(id);
    console.log('Comentarios devueltos por el backend:', comments); // <-- AQUÍ
    return comments;
  }
}
