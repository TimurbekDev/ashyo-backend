import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CategoryService } from '../category';
import { ICreateProductRequest, IProductResponse, IUpdateProductRequest } from './interfaces';
import { IProductFilter } from './interfaces/product-filter.interface';
import { LIMIT, PAGE } from '@constants';
import { CreateProductDto } from './dto';
import { UploadService } from '../upload';



@Injectable()
export class ProductService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(CategoryService) private readonly categoryService: CategoryService,
    @Inject(UploadService) private readonly uploadService: UploadService,
  ) { }

  async create(payload: CreateProductDto): Promise<IProductResponse> {

    await this.categoryService.findOne(payload.categoryId)

    const productImageOptions = await this.uploadService.uploadFile({
      file: payload.image,
      destination: "product",
    })

    const product = await this.prismaService.product.create({
      data: {
        ...payload,
        image: productImageOptions.imageUrl
      }
    });

    return {
      message: 'Product created',
      product: product
    };
  }

  async findAll(query: IProductFilter): Promise<IProductResponse> {
    console.log(query)
    const products = await this.prismaService.product.findMany({
      where: {
        name: query.search ? {contains: query.search, mode: "insensitive"} : undefined,
        categoryId: query.categoryId ? query.categoryId : undefined,
        ProductItem : {
          some : {
            price : {
              gte: query.minPrice || undefined,
              lte: query.maxPrice || undefined,
            }
          }
        }
      },
      skip: ((query.page || PAGE) - 1) * (query.limit || PAGE),
      take: query.limit || LIMIT
    });

    const totalCount = await this.prismaService.product.count({
      where: {
        name: query.search ? {contains: query.search, mode: "insensitive"} : undefined,
        categoryId: query.categoryId ? query.categoryId : undefined,
        ProductItem : {
          some : {
            price : {
              gte: query.minPrice || undefined,
              lte: query.maxPrice || undefined,
            }
          }
        }
      }
    })
    return {
      message: 'All Productss retrieved',
      totalCount,
      products: products,
    };
  }

  async findOne(id: number): Promise<IProductResponse> {

    const products = await this.prismaService.product.findFirst({ where: { id } });

    if (!products)
      throw new NotFoundException('Product not found');

    return {
      message: 'Product found',
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
