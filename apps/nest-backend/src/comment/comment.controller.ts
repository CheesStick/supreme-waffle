import { Body, Controller, Get, Post, Delete, Patch } from '@nestjs/common';
import { UserID } from '../user/user.decorator';
import { CommentService } from './comment.service';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('comments')
  get_comments(@Body() blogID) {
    return this.commentService.findComments(blogID);
  }

  @Post('create')
  post_comment(@Body() body, @UserID() userID) {
    return this.commentService.createComment(body, userID);
  }

  @Patch('edit')
  patch_comment(@Body() body) {
    return this.commentService.updateComment(body);
  }

  @Delete('remove')
  delete_comment(@Body() body, @UserID() userID) {
    return this.commentService.deleteComment(body, userID);
  }

}
