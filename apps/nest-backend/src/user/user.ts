import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class User {

  private prisma = new PrismaClient();

  createUser(data) {
    return this.prisma.user.create({ data });
  }

  async findUserByID(id) {
    return this.prisma.user.findUnique({
      where: { id: await id }
    })
  }

  findUserByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email }
    })
  }

  async updateUser(data, userID) {
    return this.prisma.user.update({
      where: { id: await userID },
      data: data
    })
  }

}
