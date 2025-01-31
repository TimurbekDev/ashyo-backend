import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { UserService } from '../user';
import { ICreateLikeRequest, ILikeResponse, IUpdateLikeRequest } from './interfaces';
import { ProductItemService } from '../product-item';

@Injectable()
export class LikeService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(ProductItemService) private readonly productItemService: ProductItemService,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async create(payload: ICreateLikeRequest): Promise<ILikeResponse> {

    await this.productItemService.findOne(payload.productItemId);
    await this.userService.findOne(payload.userId);

    const like = await this.prismaService.like.create({ data: payload });

    return {
      message: 'Like created',
      like
    };
  }

  async findAll(): Promise<ILikeResponse> {

    const likes = await this.prismaService.like.findMany();

    return {
      message: 'All Likes',
      likes
    };
  }

  async findLikesUser(userId:number): Promise<ILikeResponse> {

    const likes = await this.prismaService.like.findMany({
      where : { userId }
    });

    return {
      message: 'Users Likes',
      likes
    };
  }

  async findOne(id: number): Promise<ILikeResponse> {

    const like = await this.prismaService.like.findFirst({ where: { id } });

    if (!like)
      throw new NotFoundException('Like not found');

    return {
      message: 'Like found',
      like
    };
  }

  async update(payload: IUpdateLikeRequest): Promise<ILikeResponse> {

    await this.findOne(payload.id);

    const like = await this.prismaService.like.update({
      where: { id: payload.id },
      data: payload
    })
    return {
      message: 'Like updated',
      like
    };
  }

  async remove(id: number): Promise<ILikeResponse> {

    await this.findOne(id);

    const like = await this.prismaService.like.delete({ where: { id } });

    return {
      message: 'Like Deleted',
      like
    };
  }
}
