import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IBannerResponse, ICreateBannerRequest, IUpdateBannerRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { UploadService } from '../upload';
import { ProductService } from '../product';
import { Banner } from '@prisma/client';

@Injectable()
export class BannerService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(UploadService) private readonly uploadService: UploadService,
    @Inject(ProductService) private readonly productService: ProductService
  ) { }

  async create(payload: ICreateBannerRequest): Promise<IBannerResponse> {

    await this.productService.findOne(payload.productId);
    payload.image = (await this.uploadService.uploadFile({
      file: payload.image as Express.Multer.File,
      destination: 'banner'
    })).imageUrl as string;

    const banner = await this.prismaService.banner.create({ data: payload as Omit<Banner, "id"> });

    return {
      message: 'Banner created successfully',
      banner
    };
  }

  async findAll(): Promise<IBannerResponse> {

    const banners = await this.prismaService.banner.findMany();

    return {
      message: 'Banners fetched successfully',
      banners
    };
  }

  async findOne(id: number): Promise<IBannerResponse> {

    const banner = await this.prismaService.banner.findUnique({ where: { id } });

    if (!banner)
      throw new NotFoundException('Banner not found');

    return {
      message: 'Banner fetched successfully',
      banner
    };
  }

  async update(payload: IUpdateBannerRequest): Promise<IBannerResponse> {

    await this.productService.findOne(payload.productId);
    await this.findOne(payload.id);

    payload.image = (await this.uploadService.uploadFile({
      file: payload.image as Express.Multer.File,
      destination: 'banner'
    })).imageUrl as string;

    return {
      message: 'Banner updated successfully',
      banner: await this.prismaService.banner.update({
        where: { id: payload.id },
        data: payload as Omit<Banner, "id">
      })
    };
  }

  async remove(id: number): Promise<IBannerResponse> {

    await this.findOne(id);

    return {
      message: 'Banner deleted successfully',
      banner: await this.prismaService.banner.delete({ where: { id } })
    };
  }
}
