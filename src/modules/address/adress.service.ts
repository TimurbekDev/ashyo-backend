import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateAddressRequest, IUpdateAddressRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { Address,} from '@prisma/client';

@Injectable()
export class AddressService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) { }

  async create(payload: ICreateAddressRequest): Promise<{ message: string, address: Address }> {

    const newaddress = await this.prismaService.address.create({
      data: payload
    })

    return {
      message: 'Address created',
      address: newaddress
    };
  }

  async findAll(): Promise<{ message: string, address: Address[] }> {

    const allAddress = await this.prismaService.address.findMany({
      include: {
        city: true,
        user: true,
        village: true
      }
    });

    return {
      message: 'Return all address',
      address: allAddress
    };
  }

  async findOne(id: number): Promise<{
    message: string,
    address: Address
  }> {
    const address = await this.prismaService.address.findUnique({
      where: { id }
    });

    return {
      message: 'Address returned',
      address
    };
  }

  async update(payload: IUpdateAddressRequest): Promise<{ message: string, address: Address }> {
    const address = await this.prismaService.address.findFirst({ where: { id: payload.id } });

    if (!address) {
      throw new BadRequestException('Address not found');
    }

    const updatedAddress = await this.prismaService.address.update({
      where: { id: address.id },
      data: payload
    });

    return {
      message: 'Updated',
      address: updatedAddress
    };
  }

  remove(id: number) {
    return `This action removes a #${id} address`;
  }
}
