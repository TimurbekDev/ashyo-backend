import { Inject, Injectable } from '@nestjs/common';
import { ICreatePrRequest, IProductItemResponse, IUpdatePrRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { ProductService } from '../product/product.service';
import { UploadService } from '../upload';

@Injectable()
export class ProductItemService {

  constructor(
    @Inject(PrismaService) private readonly prismaService : PrismaService,
    @Inject(ProductService) private readonly productService : ProductService,
    @Inject(UploadService) private readonly uploadService : UploadService,
  ){}

  async create(payload: ICreatePrRequest): Promise<IProductItemResponse> {

    await this.productService.findOne(payload.productId);



    const productItem = await this.prismaService.productItem.create({
      data : payload
    })
    return {
      message : 'ProductItem created'
    };
  }

  findAll() {
    return `This action returns all productItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productItem`;
  }

  update(payload:IUpdatePrRequest) {
    return `This action updates a #${payload.id} productItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productItem`;
  }
}
