import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import {
  ICategoryResponse,
  ICreateCategoryRequest,
  IUpdateCategoryRequest,
} from './interface';
import { UploadService } from '../upload';
import { CreateCategoryDto } from './dto';

@Injectable()
export class CategoryService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(UploadService) private readonly uploadService: UploadService,
  ) {}

  async create(payload: CreateCategoryDto): Promise<ICategoryResponse> {
    const imageOtions = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'categories',
    });
    const iconOptions = await this.uploadService.uploadFile({
      file: payload.icon,
      destination: 'categories',
    });

    console.log(payload);

    const newCategory = await this.prismaService.category.create({
      data: {
        ...payload,
        parentId: Number.isNaN(+payload.parentId) ? null : +payload.parentId,
        image: imageOtions.imageUrl,
        icon: iconOptions.imageUrl,
      },
    });
    console.log(newCategory);
    return {
      message: 'Category created',
      category: newCategory,
    };
  }

  async findAll(): Promise<ICategoryResponse> {
    const categories = await this.prismaService.category.findMany();
    return {
      message: 'All categories retrieved',
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

  async update(id: number, payload: CreateCategoryDto): Promise<ICategoryResponse> {
    const currentCategory = await this.prismaService.category.findFirst({
      where: { id },
    });
    if (!currentCategory) throw new NotFoundException('Category not found');
  
    let categoryimage = currentCategory.image;
    let categoryicon = currentCategory.icon;
  
    if (payload.image) {
      await this.uploadService.deleteFile({
        fileName: currentCategory.image,
      });
      const imageOptions = await this.uploadService.uploadFile({
        file: payload.image,
        destination: 'categories',
      });
      categoryimage = imageOptions.imageUrl;
    }
  
    if (payload.icon) {
      await this.uploadService.deleteFile({
        fileName: currentCategory.icon,
      });
      const iconOptions = await this.uploadService.uploadFile({
        file: payload.icon,
        destination: 'categories',
      });
      categoryicon = iconOptions.imageUrl;
    }
  
    const updatedCategory = await this.prismaService.category.update({
      where: { id },
      data: {
        ...payload,
        parentId: Number.isNaN(+payload.parentId) ? null : +payload.parentId,
        image: categoryimage,
        icon: categoryicon,
      },
    });
  
    return {
      message: 'Category updated',
      category: updatedCategory,
    };
  }
  

  async remove(id: number): Promise<ICategoryResponse> {
    try {
      const currentCategory = await this.prismaService.category.findFirst({
        where: { id },
      });
      
      await this.uploadService.deleteFile({
        fileName: currentCategory.image
      })
  
      await this.prismaService.category.delete({
        where: { id },
      })
  
      return {
        message: 'Category deleted',
        category: currentCategory
      };
    } catch (error) {
      if(error.response.message=="File Not Fount"){
        await this.prismaService.category.delete({
          where: { id },
        })
      }
    }
  }
}
