import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ICartItemResponse, ICreateCartItemRequest, IUpdateCartItemRequest } from './interfaces';
import { ProductItemService } from '../product-item';
import { CartService } from '../cart/cart.service';

@Injectable()
export class CartItemService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(ProductItemService) private readonly productItemService: ProductItemService,
    @Inject(CartService) private readonly cartService: CartService,
  ) { }

  async create(payload: ICreateCartItemRequest): Promise<ICartItemResponse> {

    await this.productItemService.findOne(payload.productItemId);
    await this.cartService.findOne(payload.cartId);

    const cartItem = await this.prismaService.cartItem.create({ data: payload });

    return {
      message: 'CartItem created',
      cartItem
    };
  }

  async findAll(): Promise<ICartItemResponse> {

    const cartItems = await this.prismaService.cartItem.findMany();

    return {
      message: 'All CartItems',
      cartItems
    };
  }

  async findOne(id: number): Promise<ICartItemResponse> {

    const cartItem = await this.prismaService.cartItem.findFirst({ where: { id } });

    if (!cartItem)
      throw new NotFoundException('Like not found');

    return {
      message: 'CartItem found',
      cartItem
    };
  }

  async update(payload: IUpdateCartItemRequest): Promise<ICartItemResponse> {

    await this.findOne(payload.id);

    const cartItem = await this.prismaService.cartItem.update({
      where: { id: payload.id },
      data: payload
    })
    return {
      message: 'CartItem updated',
      cartItem
    };
  }

  async remove(id: number): Promise<ICartItemResponse> {

    await this.findOne(id);

    const cartItem = await this.prismaService.cartItem.delete({ where: { id } });

    return {
      message: 'CartItem Deleted',
      cartItem
    };
  }
}
