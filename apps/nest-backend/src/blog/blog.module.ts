import { Module } from '@nestjs/common';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Blog } from './blog';

@Module({
  controllers: [BlogController],
  providers: [BlogService, Blog],
})
export class BlogModule {}
