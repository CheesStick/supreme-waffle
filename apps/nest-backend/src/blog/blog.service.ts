import { Injectable } from '@nestjs/common';
import { Blog } from '@prisma/client';
import { Blog as BlogProvider } from './blog';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class BlogService {

  constructor ( private blog: BlogProvider ) {}

  private userID = (token) => (
    jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
      if (err) throw new Error('invalid token');
      return decoded.id;
    })
  )

  async getBlogs(category, limit) {
    try {
      return await this.blog.findAllBlogs(category, limit);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  async createBlog(body, token) {
    try {
      const blog: Blog = await this.blog.createBlog(body, this.userID(token));
      return blog.id;
    } catch (err) {
      console.error('error', err.message);
      throw new Error(err.message);
    }
  }

}