import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { IAddressResponse, ICreateAddressRequest, IUpdateAddressRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { Address, } from '@prisma/client';
import { RegionService } from '../region';
import { UserService } from '../user';

@Injectable()
export class AddressService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(RegionService) private readonly regionService: RegionService,
    @Inject(UserService) private readonly userService: UserService,
  ) { }

  async create(payload: ICreateAddressRequest): Promise<IAddressResponse> {

    await this.regionService.findOne(payload.cityId);
    await this.regionService.findOne(payload.villageId);
    await this.userService.findOne(payload.userId);

    const newaddress = await this.prismaService.address.create({
      data: payload
    })

    return {
      message: 'Address created',
      address: newaddress
    };
  }

  async findAll(): Promise<IAddressResponse> {

    const allAddress = await this.prismaService.address.findMany({
      include: {
        city: true,
        user: true,
        village: true
      }
    });

    return {
      message: 'Return all address',
      addresses: allAddress
    };
  }

  async findAllByUser(userId:number): Promise<IAddressResponse> {

    const allAddress = await this.prismaService.address.findMany({
      include: {
        city: true,
        user: true,
        village: true
      },
      where : { userId }
    });

    return {
      message: 'Return all address',
      addresses: allAddress
    };
  }

  async findOne(id: number): Promise<IAddressResponse> {
    const address = await this.prismaService.address.findUnique({
      where: { id }
    });

    return {
      message: 'Address returned',
      address
    };
  }

  async update(payload: IUpdateAddressRequest): Promise<IAddressResponse> {
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
