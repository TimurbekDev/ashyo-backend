import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateVarationRequest, IUpdateVarationRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { Varation } from '@prisma/client';

@Injectable()
export class VarationService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService
  ) { }

  async create(payload: ICreateVarationRequest): Promise<{ message: string, varation: Varation }> {

    const newvaration = await this.prismaService.varation.create({
      data: payload
    })

    return {
      message: 'Varation created',
      varation: newvaration
    };
  }

  async findAll(): Promise<{ message: string, varations: Varation[] }> {

    const allVarations = await this.prismaService.varation.findMany();

    return {
      message: 'Return all varations',
      varations: allVarations
    };
  }

  async findOne(id: number): Promise<{
    message: string,
    varation: Varation
  }> {
    const varation = await this.prismaService.varation.findUnique({
      where: { id }
    });

    return {
      message: 'Varation returned',
      varation
    };
  }

  async update(payload: IUpdateVarationRequest): Promise<{ message: string, varation: Varation }> {
    const varation = await this.prismaService.varation.findFirst({ where: { id: payload.id } });

    if (!varation) {
      throw new BadRequestException('Varation not found');
    }

    const updatedvaration = await this.prismaService.varation.update({
      where: { id: varation.id },
      data: payload
    });

    return {
      message: 'Updated',
      varation: updatedvaration
    };
  }

  remove(id: number) {
    return `This action removes a #${id} varation`;
  }
}
