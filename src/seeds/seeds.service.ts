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
    await this.seedProduct();
  }

  async seedUsers(): Promise<void> {
    const usersCount = await this.prismaService.user.count();

    if (usersCount == 0) {
      await this.prismaService.user.createMany({
        data: [
          {
            fullName: "I'm admin!",
            email: 'admin@gmail.com',
            password: await hash('admin123', HASH_SALT),
            role: Roles.Admin,
          },
          {
            fullName: "John Doe",
            email: 'john.doe@gmail.com',
            password: await hash('password123', HASH_SALT),
            role: Roles.User,
          },
        ],
      });
    }
  }

  async seedCategories(): Promise<void> {
    const categoryCount = await this.prismaService.category.count();

    if (categoryCount == 0) {
      await this.prismaService.category.createMany({
        data: [
          {
            image: 'image not set',
            name: 'Default category',
            parentId: null,
            icon: 'icon not set',
          },
          {
            image: 'image not set',
            name: 'Electronics',
            parentId: null,
            icon: 'icon not set',
          },
        ],
      });
    }
  }

  async seedCity(): Promise<void> {
    const cityCount = await this.prismaService.region.count();

    if (cityCount == 0) {
      await this.prismaService.region.createMany({
        data: [
          {
            name: 'Toshkent',
            parentId: null,
          },
          {
            name: 'Samarqand',
            parentId: null,
          },
        ],
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
      await this.prismaService.address.createMany({
        data: [
          {
            cityId: 1,
            villageId: 1,
            userId: 1,
          },
          {
            cityId: 2,
            villageId: 2,
            userId: 2,
          },
        ],
      });
    }
  }

  async seedBrend(): Promise<void> {
    const brendCount = await this.prismaService.brend.count();

    if (brendCount == 0) {
      await this.prismaService.brend.createMany({
        data: [
          {
            name: 'Asus',
            image: 'image not set',
          },
          {
            name: 'Apple',
            image: 'image not set',
          },
        ],
      });
    }
  }

  async seedProduct(): Promise<void> {
    const productCount = await this.prismaService.product.count();

    if (productCount == 0) {
      await this.prismaService.product.createMany({
        data: [
          {
            name: 'Asus Rog Phone 6',
            description: 'Good phone',
            categoryId: 1,
            image: 'image not set',
            brendId: 1,
          },
          {
            name: 'iPhone 14 Pro Max',
            description: 'Premium phone',
            categoryId: 2,
            image: 'image not set',
            brendId: 2,
          },
        ],
      });
    }
  }
}
