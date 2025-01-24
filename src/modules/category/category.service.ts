import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import {
  ICategoryResponse,
  IFilter,
  IUpdateCategoryRequest,
} from './interface';
import { UploadService } from '../upload';
import { CreateCategoryDto } from './dto';
import { Category } from '@prisma/client';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(UploadService) private readonly uploadService: UploadService,
  ) { }

  async create(payload: CreateCategoryDto): Promise<ICategoryResponse> {

    const imageOtions = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'categories',
    });
    const iconOptions = await this.uploadService.uploadFile({
      file: payload.icon,
      destination: 'categories',
    });

    const newCategory = await this.prismaService.category.create({
      data: {
        ...payload,
        image: imageOtions.imageUrl,
        icon: iconOptions.imageUrl,
      },
    });

    return {
      message: 'Category created',
      category: newCategory,
    };
  }

  async findAll(filter: IFilter): Promise<ICategoryResponse> {


    const categories = await this.prismaService.category.findMany({
      where: {
        name: filter.name ? { contains: filter.name, mode: 'insensitive' } : undefined,
      },
      take: filter.limit || 10,
      skip: ((filter.page || 1) - 1) * (filter.limit || 10),
      include: {
        children: {
          include:{
            children: true
          }
        }
      },
    });

    const totalCount = await this.prismaService.category.count({
      where: { name: filter.name ? { contains: filter.name, mode: 'insensitive' } : undefined }
    });

    return {
      message: 'All categories retrieved',
      totalCount: totalCount || categories.length,
      categories,
    };
  }

  async findOne(id: number): Promise<ICategoryResponse> {
    const category = await this.prismaService.category.findFirst({
      where: { id },
    });

    if (!category) throw new NotFoundException('Category not found');

    return {
      message: 'Category found',
      category,
    };
  }

  async update(payload: IUpdateCategoryRequest): Promise<ICategoryResponse> {

    const existcategory = await this.findOne(payload.id);

    if (payload.image) {
      payload.image = (await this.uploadService.uploadFile({
        file: payload.image as Express.Multer.File,
        destination: 'categories'
      })).imageUrl;

      await this.uploadService.deleteFile({
        fileName: existcategory.category.image
      });
    }

    if (payload.icon) {
      payload.icon = (await this.uploadService.uploadFile({
        file: payload.icon as Express.Multer.File,
        destination: 'categories'
      })).imageUrl;

      await this.uploadService.deleteFile({
        fileName: existcategory.category.icon
      });
    }


    const category = await this.prismaService.category.update({ where: { id: payload.id }, data: payload as Category });


    return {
      message: 'Category updated',
      category
    }
  }


  async remove(id: number): Promise<ICategoryResponse> {
    await this.findOne(id);

    const category = await this.prismaService.category.delete({ where: { id } });

    return {
      message: 'Category deleted',
      category
    }
  }
}
