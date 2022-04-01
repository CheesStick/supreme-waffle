import { Controller, UseGuards, Get, Query } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from './blog.service';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {

  constructor (private blogService: BlogService) {}

  @Get('blogs')
  get_blogs(@Query() query) {
    return this.blogService.getBlogs(query.category, query.limit)
      .then( (data) => ( { success: true, data } ))
      .catch( (err) => ( { success: false, msg: err.message } ) );
  }

}
