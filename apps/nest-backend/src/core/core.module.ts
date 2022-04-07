import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { CommentModule } from '../comment/comment.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [BlogModule, UserModule, AuthModule, CommentModule, PrismaModule]
})
export class CoreModule {}
