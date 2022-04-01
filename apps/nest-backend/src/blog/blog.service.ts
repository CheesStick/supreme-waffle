import { Injectable } from '@nestjs/common';
import { Blog as BlogProvider } from './blog';

@Injectable()
export class BlogService {

  constructor ( private blog: BlogProvider ) {}

  async getBlogs(category, limit) {
    try {
      return await this.blog.findAllBlogs(category, limit);
    } catch (err) {
      throw new Error(err.message);
    }
  }

}
