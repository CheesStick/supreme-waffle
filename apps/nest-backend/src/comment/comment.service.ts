import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaClient, Comment } from '@prisma/client';

@Injectable()
export class CommentService {

  private prisma = new PrismaClient();

  async findComments(id) {
    try {
      const comments: Comment[] = await this.prisma.comment.findMany({
        where: {
          Blog: { id }
        }
      });

      if (comments) {
        return { success: true, comments }
      } throw new HttpException('Could not find comments', HttpStatus.NOT_FOUND);
    } catch (err) {
      return err;
    }
  }

  async createComment(body, userID) {
    try {

      const { blogID, ...data } = body;

      if (data) {
        await this.prisma.comment.create({
          data: {
            ...data,
            blog: { connect: { id: blogID } },
            user: { connect: { id: userID } }
          }
        });

        return { success: true };
      } throw new HttpException('no comment data was provided', HttpStatus.NO_CONTENT);
    } catch (err) {
      return err;
    }
  }

  async updateComment(body) {
    try {
      
      const { id, ...data } = body;

      if ( !data ) throw new HttpException('no comment data was provided', HttpStatus.NO_CONTENT);
      
      await this.prisma.comment.update({
        where: { id },
        data
      })

      return { success: true };
    } catch (err) {
      return err;
    }
  }

  async deleteComment(body, userID) {
    try {
      
      const { commentID } = body;

      const comment: Comment = await this.prisma.comment.findUnique({
        where: { id: commentID }
      });

      if ( comment.authorID !== userID ) throw new HttpException('unauthorized', HttpStatus.FORBIDDEN);

      await this.prisma.comment.delete({
        where: { id: commentID }
      });

      return { success: true };

    } catch (err) {
      return err;
    }
  }

}
