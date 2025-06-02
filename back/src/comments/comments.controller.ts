import {
  Controller,
  Post,
  Body,
  Get,
  Put,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { RoleGuard } from '../common/role.guard';
import { Roles } from '../common/roles.decorator';
import { UserRole } from '../common/role.enum';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  // @UseGuards(JwtAuthGuard, RoleGuard)
  // @Roles(UserRole.USER)
  create(@Body() dto: CreateCommentDto) {
    return this.commentsService.create(dto);
  }

  @Get()
  findAll() {
    return this.commentsService.findAll();
  }

  @Put(':id/sentiment')
  updateSentiment(
    @Param('id', ParseUUIDPipe) id: string,
    @Body('sentiment') sentiment: string,
  ) {
    return this.commentsService.updateSentiment(id, sentiment);
  }
}
