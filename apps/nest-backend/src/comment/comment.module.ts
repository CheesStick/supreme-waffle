import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { Comment } from './comment';

@Module({
  controllers: [CommentController],
  providers: [CommentService, Comment],
})
export class CommentModule {}
