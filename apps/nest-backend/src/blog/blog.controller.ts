import { Controller, UseGuards, Get, Query, Post, Body, Headers, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {

  constructor (private blogService: BlogService) {}

  @Get('blogs')
  get_blogs(@Query() query) {
    return this.blogService.getBlogs(query.category, parseInt(query.limit))
      .then( (data) => ( { success: true, data } ))
      .catch( (err) => ( { success: false, msg: err.message } ) );
  }

  @Post('create')
  create_blogs(@Body() body: CreateBlogDto, @Headers() { token }) {
    return this.blogService.createBlog(body, token)
      .then( (data) => ( { success: true, data } ) )
      .catch( (err) => ( { success: false, msg: err.message } ) );
  }

}