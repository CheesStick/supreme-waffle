import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class User {

  private prisma = new PrismaClient();

  findUserByID(userID) {
    return this.prisma.user.findUnique({
      where: { id: userID }
    })
  }

  async updateUser(data, userID) {
    return this.prisma.user.update({
      where: { id: userID },
      data: data
    })
  }

}
