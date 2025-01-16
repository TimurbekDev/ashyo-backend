import { Inject, Injectable } from '@nestjs/common';
import { CreateProductItemDto } from './dto/create-product-item.dto';
import { UpdateProductItemDto } from './dto/update-product-item.dto';
import { UploadService } from '../upload';
import { PrismaService } from '@prisma';

@Injectable()
export class ProductItemService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(UploadService) private readonly uploadService: UploadService,
  ) {}
  async create(createProductItemDto: CreateProductItemDto) {
    const productItemImageOptions = await this.uploadService.uploadFile({
      file: createProductItemDto.image,
      destination: 'uploads/productItem',
    });

    console.log(JSON.parse(createProductItemDto.productOptions))


    await this.prismaService.productItem.create({
      data: {
        ...createProductItemDto,
        image: productItemImageOptions.imageUrl,
      },
    });
  }

  findAll() {
    return `This action returns all productItem`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productItem`;
  }

  update(id: number, updateProductItemDto: UpdateProductItemDto) {
    return `This action updates a #${id} productItem`;
  }

  remove(id: number) {
    return `This action removes a #${id} productItem`;
  }
}
