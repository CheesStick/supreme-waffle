import { Module } from '@nestjs/common';
import { BlogModule } from '../blog/blog.module';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [BlogModule, UserModule, AuthModule]
})
export class CoreModule {}
