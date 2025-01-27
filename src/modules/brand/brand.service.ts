import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { PrismaService } from '@prisma';
import { UploadService } from '../upload';
import { IBrandResponse } from './interfaces';

@Injectable()
export class BrandService {
  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(UploadService) private readonly uploadService: UploadService,
  ) {}
  async create(createBrandDto: CreateBrandDto): Promise<IBrandResponse> {
    const brandImageOptions = await this.uploadService.uploadFile({
      file: createBrandDto.image,
      destination: 'brands',
    });
    const newBrand = await this.prismaService.brend.create({
      data: {
        ...createBrandDto,
        image: brandImageOptions.imageUrl,
      },
    });
    return {
      message: 'Created new brand',
      brand: newBrand,
    };
  }

  async findAll(): Promise<IBrandResponse> {
    return {
      message: 'All brands retrieved',
      brands: await this.prismaService.brend.findMany({ include : { Product : true }}),
    };
  }

  async findOne(id: number): Promise<IBrandResponse> {
    const findBrand = await this.prismaService.brend.findUnique({
      where: { id },
      include : { Product : true }
    });
    if (!findBrand) {
      throw new NotFoundException('Brand not found');
    }
    return {
      message: 'Brand found',
      brand: findBrand,
    };
  }

  async update(
    id: number,
    updateBrandDto: UpdateBrandDto,
  ): Promise<IBrandResponse> {
    const findBrand = await this.prismaService.brend.findUnique({
      where: { id },
    });

    if (!findBrand) {
      throw new NotFoundException('Brand not found');
    }

    let updatedImage = findBrand.image;
    if (updateBrandDto.image) {
      const newImageOptions = await this.uploadService.uploadFile({
        file: updateBrandDto.image,
        destination: 'brand',
      });
      updatedImage = newImageOptions.imageUrl;
      await this.uploadService.deleteFile({ fileName: findBrand.image });
    }

    const updatedBrand = await this.prismaService.brend.update({
      where: { id },
      data: {
        ...updateBrandDto,
        image: updatedImage,
      },
    });

    return {
      message: 'Updated brand',
      brand: updatedBrand,
    };
  }

  async remove(id: number):Promise<IBrandResponse> {
    const findBrand = await this.prismaService.brend.findUnique({
      where: { id },
    });

    if (!findBrand) {
      throw new NotFoundException('Brand not found');
    }

    await this.prismaService.brend.delete({
      where: { id },
    })

    await this.uploadService.deleteFile({fileName: findBrand.image})
    return {
      message: "Deleted brand",
      brand: findBrand
    };
  }
}
