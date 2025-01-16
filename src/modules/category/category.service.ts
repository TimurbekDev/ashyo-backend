import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ICategoryResponse, ICreateCategoryRequest, IUpdateCategoryRequest } from './interface';

@Injectable()
export class CategoryService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) { }

  async create(payload: ICreateCategoryRequest): Promise<ICategoryResponse> {

    if (payload.parentId)
      await this.findOne(payload.parentId);

    const category = await this.prismaService.category.create({
      data: payload
    })

    return {
      message: 'Category created',
      category
    };
  }

  async findAll(): Promise<ICategoryResponse> {

    const categories = await this.prismaService.category.findMany();
    return {
      message: 'All categories retrieved',
      categories
    };
  }

  async findOne(id: number): Promise<ICategoryResponse> {

    const category = await this.prismaService.category.findFirst({ where: { id } });

    if (!category)
      throw new NotFoundException('Category not found');

    return {
      message: 'Category found',
      category
    };
  }

  async update(payload: IUpdateCategoryRequest): Promise<ICategoryResponse> {

    console.log(payload);

    await this.findOne(payload.id);
    if (payload.parentId)
      await this.findOne(payload.parentId)

    const updatedCategory = await this.prismaService.category.update({
      where: { id: payload.id },
      data: payload
    });

    return {
      message: 'Category updated',
      category: updatedCategory
    };
  }

  async remove(id: number): Promise<ICategoryResponse> {

    await this.findOne(id);

    const category = await this.prismaService.category.delete({ where: { id } });
    await this.prismaService.category.deleteMany({ where: { parentId: category.id } });

    return {
      message: 'Category deleted',
      category
    };
  }
}