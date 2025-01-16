import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CategoryService } from '../category';
import { ICreateProductRequest, IProductResponse, IUpdateProductRequest } from './interfaces';

@Injectable()
export class ProductService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(CategoryService) private readonly categoryService: CategoryService
  ) { }

  async create(payload: ICreateProductRequest): Promise<IProductResponse> {

    await this.categoryService.findOne(payload.categoryId)

    const product = await this.prismaService.product.create({
      data: payload
    });

    return {
      message: 'Varation Option created',
      product: product
    };
  }

  async findAll(): Promise<IProductResponse> {

    const products = await this.prismaService.product.findMany();
    return {
      message: 'All varation options retrieved',
      products: products
    };
  }

  async findOne(id: number): Promise<IProductResponse> {

    const products = await this.prismaService.product.findFirst({ where: { id } });

    if (!products)
      throw new NotFoundException('Varation Options not found');

    return {
      message: 'Varation Option found',
      product: products
    };;
  }

  async update(payload: IUpdateProductRequest): Promise<IProductResponse> {

    await this.findOne(payload.id);

    if (payload.categoryId)
      await this.categoryService.findOne(payload.categoryId);

    const product = await this.prismaService.product.update({
      where: { id: payload.id },
      data: payload
    })

    return {
      message: 'Product Updated',
      product: product
    };
  }

  async remove(id: number) {

    await this.findOne(id);

    const product = await this.prismaService.product.delete({ where: { id } });

    return {
      message: 'Product deleted',
      product: product
    };;
  }
}
