import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICreatePrRequest, IGetAllQuery, IProductItemResponse, IUpdatePrRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { ProductService } from '../product/product.service';
import { UploadService } from '../upload';
import { ColorService } from '../color';

@Injectable()
export class ProductItemService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(UploadService) private readonly uploadService: UploadService,
    @Inject(ColorService) private readonly colorService: ColorService
  ) { }

  async create(payload: ICreatePrRequest): Promise<IProductItemResponse> {

    let varationOptionIds: number[] = payload.varations

    delete payload.varations;

    await this.productService.findOne(payload.productId);
    await this.colorService.findOne(payload.colorId)

    const image = await this.uploadService.uploadFile({
      file: payload.image,
      destination: 'product-item'
    })

    const productItem = await this.prismaService.productItem.create({
      data: {
        productId: payload.productId,
        quantity: payload.quantity,
        price: payload.price,
        name: payload.name,
        image: image.imageUrl,
        colorId: payload.colorId
      }
    });

    varationOptionIds.map(async (id) => {
      await this.prismaService.productOptions.create({
        data: {
          productItemId: productItem.id,
          variantOptionId: id
        }
      });
    })

    return {
      message: 'ProductItem created',
      productItem
    };
  }

  async findAll(query: IGetAllQuery): Promise<IProductItemResponse> {

    const productItems = await this.prismaService.productItem.findMany({
      skip: (query.page - 1) * 10,
      take: query.limit
    });

    return {
      message: 'All Product Items',
      total: await this.prismaService.productItem.count(),
      productItems,
    };
  }

  async findOne(id: number): Promise<IProductItemResponse> {

    const productItem = await this.prismaService.productItem.findFirst({ where: { id } });

    if (!productItem)
      throw new NotFoundException('ProductItem not found');

    const options = await this.prismaService.productOptions.findMany({
      where: { productItemId: productItem.id },
      select: {
        variantOption: {
          select: {
            value: true,
            varation: {
              select: {
                name: true
              }
            }
          }
        }
      }
    })

    return {
      message: 'ProductItem found',
      productItem,
      varations: this.#transformToSimple(options)
    };
  }

  async update(payload: IUpdatePrRequest): Promise<IProductItemResponse> {

    await this.findOne(payload.id);

    const productItem = await this.prismaService.productItem.update({
      where: { id: payload.id },
      data: payload
    });

    return {
      message: 'Product Item updated',
      productItem
    };
  }

  async remove(id: number): Promise<IProductItemResponse> {

    await this.findOne(id);

    const productItem = await this.prismaService.productItem.delete({ where: { id } });

    return {
      message: 'ProductItem deleted',
      productItem
    };
  }

  #transformToSimple = (data: any[]) => {
    const name = data[0]?.variantOption?.varation?.name || '';
    const values = data
      .map(item => item.variantOption.value)
      .sort((a, b) => Number(a) - Number(b));

    return {
      [name]: values
    };
  };
}
