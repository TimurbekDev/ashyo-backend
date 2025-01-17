import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ProductService } from '../product/product.service';
import { PrismaService } from '@prisma';
import { UserService } from '../user';
import { ICreateReviewRequest, IReviewResponse, IUpdateReviewRequest } from './interfaces';

@Injectable()
export class ReviewService {

  constructor(
    @Inject(ProductService) private readonly productService: ProductService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(UserService) private readonly userService: UserService
  ) { }

  async create(payload: ICreateReviewRequest): Promise<IReviewResponse> {

    await this.productService.findOne(payload.productId);
    await this.userService.findOne(payload.userId);

    const review = await this.prismaService.review.create({ data: payload });

    return {
      message: 'Review created',
      review
    };
  }

  async findAll(): Promise<IReviewResponse> {

    const reviews = await this.prismaService.review.findMany();

    return {
      message: 'All Reviews retrieved',
      reviews
    };
  }

  async findOne(id: number): Promise<IReviewResponse> {

    const review = await this.prismaService.review.findFirst({ where: { id } });

    if (!review)
      throw new BadRequestException('Review not found');

    return {
      message: 'Review retrieved',
      review
    };
  }

  async update(payload: IUpdateReviewRequest): Promise<IReviewResponse> {

    await this.findOne(payload.id);

    const review = await this.prismaService.review.update({ where: { id: payload.id }, data: payload });

    return {
      message: 'Review updated',
      review
    };
  }

  async remove(id: number): Promise<IReviewResponse> {

    await this.findOne(id);

    const review = await this.prismaService.review.delete({ where: { id } });

    return {
      message: 'Review deleted',
      review
    };
  }
}
