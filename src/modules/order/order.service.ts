import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { CartService } from '../cart';
import { ICreateOrderRequest, IUpdateOrderRequest } from './interfaces';
import { IOrderResponse } from './interfaces/order-response.interface';
import { AddressService } from '../address';

@Injectable()
export class OrderService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(CartService) private readonly cartService: CartService,
    @Inject(AddressService) private readonly adressService: AddressService
  ) { }

  async create(payload: ICreateOrderRequest): Promise<IOrderResponse> {

    await this.cartService.findOne(payload.cartId);
    await this.adressService.findOne(payload.adressId);

    const order = await this.prismaService.order.create({
      data: payload
    });

    return {
      message: 'Order created',
      order: order
    };
  }

  async findAll(): Promise<IOrderResponse> {

    const orders = await this.prismaService.order.findMany();
    return {
      message: 'All orders retrieved',
      orders
    };
  }

  async findOne(id: number): Promise<IOrderResponse> {

    const order = await this.prismaService.order.findFirst({ where: { id } });

    if (!order)
      throw new NotFoundException('Order not found');

    return {
      message: 'Order found',
      order
    };;
  }

  async update(payload: IUpdateOrderRequest): Promise<IOrderResponse> {

    await this.findOne(payload.id);

    if (payload.adressId)
      await this.adressService.findOne(payload.adressId);

    const order = await this.prismaService.order.update({
      where: { id: payload.id },
      data: payload
    })

    return {
      message: 'Order Updated',
      order
    };
  }

  async remove(id: number) {

    await this.findOne(id);

    const order = await this.prismaService.order.delete({ where: { id } });

    return {
      message: 'Order deleted',
      order
    };
  }
}
