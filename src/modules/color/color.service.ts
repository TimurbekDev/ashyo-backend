import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { ICreateColorRequest, IUpdateColorRequest } from './interfaces';
import { IColorResponse } from './interfaces/color-response.interface';

@Injectable()
export class ColorService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
  ) { }

  async create(payload: ICreateColorRequest): Promise<IColorResponse> {

    const newVaration = await this.prismaService.color.create({
      data: payload
    })

    return {
      message: 'Color created',
      color: newVaration
    };
  }

  async findAll(): Promise<IColorResponse> {

    const allColors = await this.prismaService.color.findMany();

    return {
      message: 'Return all colors',
      colors: allColors
    };
  }

  async findOne(id: number): Promise<IColorResponse> {

    const color = await this.prismaService.color.findUnique({
      where: { id }
    });

    if (!color)
      throw new BadRequestException('Color Not Found');

    return {
      message: 'Color returned',
      color
    };
  }

  async update(payload: IUpdateColorRequest): Promise<IColorResponse> {

    await this.findOne(payload.id);

    const updatedColor = await this.prismaService.color.update({
      where: { id: payload.id },
      data: payload
    });

    return {
      message: 'Color Updated',
      color: updatedColor
    };
  }

  async remove(id: number): Promise<IColorResponse> {

    await this.findOne(id);

    const deletedColor = await this.prismaService.color.delete({ where: { id } });

    return {
      message: 'Color deleted',
      color: deletedColor
    };
  }
}
