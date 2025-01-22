import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CategoryService } from '../category';
import { IProductResponse, IUpdateProductRequest } from './interfaces';
import { IProductFilter } from './interfaces/product-filter.interface';
import { CreateProductDto } from './dto';
import { UploadService } from '../upload';
import { LIMIT, PAGE } from '@constants';



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


    const {
      search,
      categoryId,
      minPrice,
      maxPrice,
      varationOptionIds,
      page = PAGE,
      limit = LIMIT
    } = query;

    const whereCondition: any = {};

    if (search) {
      whereCondition.name = { contains: search, mode: "insensitive" };
    }

    if (categoryId) {
      whereCondition.categoryId = categoryId;
    }

    if (minPrice || maxPrice || varationOptionIds) {
      whereCondition.ProductItem = {
        some: {
          price: {
            ...(minPrice ? { gte: minPrice } : {}),
            ...(maxPrice ? { lte: maxPrice } : {}),
          },
          ProductOptions: {
            every: {
              variantOptionId: {
                in: varationOptionIds || undefined
              }

            }
          }
        },
      };
    }

    const productsPromise = this.prismaService.product.findMany({
      where: whereCondition,
      skip: (page - 1) * limit,
      take: limit,
      include:{
        ProductItem : true
      }
    });

    const totalCountPromise = this.prismaService.product.count({
      where: whereCondition,
    });

    const [products, totalCount] = await Promise.all([productsPromise, totalCountPromise]);

    return {
      message: 'All Products retrieved',
      totalCount,
      products,
    };
  }

  async findPopulatProducts(): Promise<IProductResponse> {

    const popularProducts = await this.prismaService.like.groupBy({
      by: ['productId'],
      _count: {
        productId: true,
      },
      orderBy: {
        _count: {
          productId: 'desc',
        },
      },
    });

    const productsWithDetails = await Promise.all(
      popularProducts.map(async (entry) => {
        const product = await this.prismaService.product.findUnique({
          where: { id: entry.productId },
        });
        return {
          ...product,
          likeCount: entry._count.productId,
        };
      })
    );

    return {
      message : 'Popular products',
      products : productsWithDetails
    }
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
