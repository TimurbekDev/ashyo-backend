import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateCartRequest, IUpdateCartRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { Cart } from '@prisma/client';

@Injectable()
export class CartService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) { }

  async create(payload: ICreateCartRequest): Promise<{ message: string, cart: Cart }> {

    const newCart = await this.prismaService.cart.create({
      data: payload
    })

    return {
      message: 'Cart created',
      cart: newCart
    };
  }


  async findCartByUserId(userId: number): Promise<{ message: string, cart: Cart[] }> {
    const allCart = await this.prismaService.cart.findMany({where: {userId}, include: {cartItems: true}});

    return {
      message: 'Return all Cart',
      cart: allCart
    };
  }



  async findAll(): Promise<{ message: string, cart: Cart[] }> {

    const allCart = await this.prismaService.cart.findMany();

    return {
      message: 'Return all Cart',
      cart: allCart
    };
  }

  async findOne(id: number): Promise<{
    message: string,
    cart: Cart
  }> {
    const cart = await this.prismaService.cart.findUnique({
      where: { id  }
    });

    return {
      message: 'Address returned',
      cart
    };
  }

  async update(payload: IUpdateCartRequest): Promise<{ message: string, cart: Cart }> {
    const cart = await this.prismaService.cart.findFirst({ where: { id: payload.id } });

    if (!cart) {
      throw new BadRequestException('Cart not found');
    }

    const updatedCart = await this.prismaService.cart.update({
      where: { id: cart.id },
      data: payload
    });

    return {
      message: 'Updated',
      cart: updatedCart
    };
  }

  remove(id: number) {
    return `This action removes a #${id} cart`;
  }
}
