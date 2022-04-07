import { 
  Controller, UseGuards, 
  Get, Patch, Post,
  Query, Body, Param,
  UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from '../auth/auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/blog.dto';
import { UserID } from '../user/user.decorator';

@Controller('blog')
@UseGuards(AuthGuard)
export class BlogController {

  constructor (private blogService: BlogService) {}

  @Get('blogs')
  async get_blogs(@Query() { category, limit }) {
    return await this.blogService.getBlogs(category, parseInt(limit));
  }

  @Get(':id/details')
  async get_blog_details(@Param() id ) {
    return await this.blogService.getBlog(parseInt(id))
  }

  @Post('create')
  async create_blogs(@Body() body: CreateBlogDto, @UserID() userID) {
    return await this.blogService.createBlog(body, userID);
  }

  @Patch(':id/edit')
  async update_blog_info(@Body() body, @Param() id) {
    return await this.blogService.updateBlogInfo(body, id);
  }

  @Patch(':id/edit-bg')
  @UseInterceptors(FileInterceptor('file'))
  async edit_blog_bg(@UploadedFile() image, @Param() id) {
    return await this.blogService.updateBlogBG(image, id);
  }

}