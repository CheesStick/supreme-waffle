import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { readFileSync } from 'fs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {

  constructor (private readonly prisma: PrismaService) {}

  private path = '/home/mohamed/Documents/projects/webdev/blog/apps/nest-backend/src/assets/img/bgs';

  async getBlogs(category, take = 10) {
    try {

      let blogs: Blog[];

      if ( category ) {
        blogs = await this.prisma.blog.findMany({ 
          where: { 
            category: {
              equals: category
            } 
          }
        });

      } else blogs = await this.prisma.blog.findMany({ take });

      if ( blogs ) {
        return { success: true, blogs }
      } throw new HttpException("blogs wasn't found", HttpStatus.NOT_FOUND);

    } catch (err) {
      return err;
    }
  }

  async getBlog(id) {
    try {
      const blog: Blog = await this.prisma.blog.findUnique({
        where: { id }
      });

      if ( blog ) {
        return { success: true, blog };
      } throw new HttpException("blog wasn't found", HttpStatus.NOT_FOUND);
    } catch (err) {
      return err;
    }
  }

  async createBlog(data, id) {
    try {
      const blog: Blog = await this.prisma.blog.create({ 
        data: {
          ...data,
          user: { connect: { id } }
        } 
      });
      
      if (blog) {
        return { success: true, blogID: blog.id };
      } throw new HttpException('no blog data was provided', HttpStatus.NO_CONTENT);
    } catch (err) {
      return err;
    }
  }

  async updateBlogInfo(data, id) {
    try {

      if ( data ) {
        await this.prisma.blog.update({
          where: { id },
          data
        });

        return { success: true };
      } throw new HttpException('no blog data was provided', HttpStatus.NO_CONTENT);

    } catch (err) {
      return err;
    }
  }

  async updateBlogBG(image, id) {
    try {

      if ( image ) {
         const blog: Blog = await this.prisma.blog.update({
           where: { id },
           data: { bg: image }
         });

         const bg = readFileSync(`${ this.path }/${ blog.bg }`);

         return { success: true, bg };

      } throw new HttpException('no blog data was provided', HttpStatus.NO_CONTENT);

    } catch (err) {
      return err;
    }
  }

}