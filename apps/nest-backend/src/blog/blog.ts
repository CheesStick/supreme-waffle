import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class Blog {

  private prisma = new PrismaClient();

  async findAllBlogs(category, take = 10) {
    if ( category ) {
      return await this.prisma.blog.findMany({ 
        where: { category }
      })
    } return await this.prisma.blog.findMany({ take })
  }

}
