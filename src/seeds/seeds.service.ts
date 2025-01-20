import { HASH_SALT } from '@config';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { Category, Roles } from '@prisma/client';
import { hash } from 'bcrypt';

@Injectable()
export class SeedsService implements OnModuleInit {
  constructor(@Inject(PrismaService) private prismaService: PrismaService) {}

  async onModuleInit() {
    await this.seedUsers();
    await this.seedCategories();
    await this.seedCity();
    await this.seedAddres();
    await this.seedBrend();
    this.seedProduct();
  }

  async seedUsers(): Promise<void> {
    const usersCount = await this.prismaService.user.count();

    if (usersCount == 0) {
      await this.prismaService.user.create({
        data: {
          fullName: "I'm admin!",
          email: 'admin@gmail.com',
          password: await hash('admin123', HASH_SALT),
          role: Roles.Admin,
        },
      });
    }
  }

  async seedCategories(): Promise<void> {
    const categoryCount = await this.prismaService.category.count();

    if (categoryCount == 0) {
      await this.prismaService.category.create({
        data: {
          image: 'image not set',
          name: 'Default category',
          parentId: null,
          icon: 'icon not det',
        },
      });
    }
  }

  async seedCity(): Promise<void> {
    const cityCount = await this.prismaService.region.count();

    if (cityCount == 0) {
      await this.prismaService.region.create({
        data: {
          name: 'Toshkent',
          parentId: null,
        },
      });

      await this.prismaService.region.create({
        data: {
          name: 'Chilonzor',
          parentId: 1,
        },
      });
    }
  }

  async seedAddres(): Promise<void> {
    const addresCount = await this.prismaService.address.count();

    if (addresCount == 0) {
      await this.prismaService.address.create({
        data: {
          cityId: 1,
          villageId: 1,
          userId: 1,
        },
      });
    }
  }

  async seedBrend(): Promise<void> {
    const brendCount = await this.prismaService.brend.count();

    if (brendCount == 0) {
      await this.prismaService.brend.create({
        data: {
            name: "Asus",
            image: "image not set",
        },
      });
    }
  }






  async seedProduct(): Promise<void> {
    const productCount = await this.prismaService.product.count();

    if (productCount == 0) {
      await this.prismaService.product.create({
        data: {
            name: "Asus Rog Phone 6",
            description: "Good phone",
            categoryId: 1,
            image: "image not set",
            brendId: 1,
        },
      });
    }
  }



  





}
