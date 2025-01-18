import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { OrderService } from '../order/order.service';
import { ICreateOiRequest, IOiResponse, IUpdateOiRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { ProductItemService } from '../product-item';

@Injectable()
export class OrderItemService {

  constructor(
    @Inject(OrderService) private readonly orderService: OrderService,
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(ProductItemService) private readonly productItemService: ProductItemService,
  ) { }

  async create(payload: ICreateOiRequest): Promise<IOiResponse> {

    await this.orderService.findOne(payload.orderId);
    await this.productItemService.findOne(payload.productItemId);

    const orderItem = await this.prismaService.orderItem.create({ data: payload });

    return {
      message: 'Order Item created',
      orderItem
    };
  }

  async findAll(): Promise<IOiResponse> {

    const orderItems = await this.prismaService.orderItem.findMany();

    return {
      message: 'All OrderItems',
      orderItems
    };
  }

  async findOne(id: number): Promise<IOiResponse> {

    const orderItem = await this.prismaService.orderItem.findFirst({ where: { id } });

    if (!orderItem)
      throw new NotFoundException('OrderItem not found');

    return {
      message: 'OrderiTem found',
      orderItem
    };
  }

  async update(payload: IUpdateOiRequest): Promise<IOiResponse> {

    await this.findOne(payload.id);
    await this.orderService.findOne(payload.orderId);
    await this.productItemService.findOne(payload.productItemId);

    const orderItem = await this.prismaService.orderItem.update({
      where: { id: payload.id },
      data: payload
    });

    return {
      message: 'OrderItem updated',
      orderItem
    };
  }

  async remove(id: number): Promise<IOiResponse> {

    await this.findOne(id);

    const orderItem = await this.prismaService.orderItem.delete({ where: { id } });

    return {
      message: 'OrderItem deleted',
      orderItem
    };
  }
}
