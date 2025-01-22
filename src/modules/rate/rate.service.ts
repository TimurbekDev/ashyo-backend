import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ProductService } from '../product/product.service';
import { UserService } from '../user';
import { ICreateRateRequest, IRateResponse, IUpdateRateRequest } from './interfaces';

@Injectable()
export class RateService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async create(payload: ICreateRateRequest): Promise<IRateResponse> {

    await this.productService.findOne(payload.productId);
    await this.userService.findOne(payload.userId);

    const rate = await this.prismaService.rate.create({ data: payload });

    return {
      message: 'Like created',
      rate
    };
  }

  async findAll(): Promise<IRateResponse> {

    const rates = await this.prismaService.rate.findMany();

    return {
      message: 'All Likes',
      rates
    };
  }

  async findOne(id: number): Promise<IRateResponse> {

    const rate = await this.prismaService.rate.findFirst({ where: { id } });

    if (!rate)
      throw new NotFoundException('Like not found');

    return {
      message: 'Like found',
      rate
    };
  }

  async update(payload: IUpdateRateRequest): Promise<IRateResponse> {

    await this.findOne(payload.id);

    const rate = await this.prismaService.rate.update({
      where: { id: payload.id },
      data: payload
    })
    return {
      message: 'Like updated',
      rate
    };
  }

  async remove(id: number): Promise<IRateResponse> {

    await this.findOne(id);

    const rate = await this.prismaService.rate.delete({ where: { id } });

    return {
      message: 'Like Deleted',
      rate
    };
  }
}
