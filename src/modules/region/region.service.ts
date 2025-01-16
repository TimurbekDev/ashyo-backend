import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateRegionRequest, IUpdateRegionRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { Region } from '@prisma/client';

@Injectable()
export class RegionService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) { }

  async create(payload: ICreateRegionRequest): Promise<{ message: string, region: Region }> {

    const newRegion= await this.prismaService.region.create({
      data: payload
    })

    return {
      message: 'Region created',
      region: newRegion
    };
  }

  async findAll(): Promise<{ message: string, regions: Region[] }> {

    const allRegion = await this.prismaService.region.findMany();

    return {
      message: 'Return all region',
      regions: allRegion
    };
  }

  async findOne(id: number): Promise<{
    message: string,
    region: Region
  }> {
    const region = await this.prismaService.region.findUnique({
      where: { id }
    });

    return {
      message: 'Region returned',
      region
    };
  }

  async update(payload: IUpdateRegionRequest): Promise<{ message: string, region: Region }> {
    const region = await this.prismaService.region.findFirst({ where: { id: payload.id } });

    if (!region) {
      throw new BadRequestException('Region not found');
    }

    const updatedregion = await this.prismaService.region.update({
      where: { id: region.id },
      data: payload
    });

    return {
      message: 'Updated',
      region: updatedregion
    };
  }

  remove(id: number) {
    return `This action removes a #${id} region`;
  }
}
