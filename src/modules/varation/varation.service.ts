import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ICreateVarationRequest, IUpdateVarationRequest } from './interfaces';
import { PrismaService } from '@prisma';
import { Varation } from '@prisma/client';
import { IVarationResponse } from './interfaces/category-response.interface';
import { CategoryService } from '../category';

@Injectable()
export class VarationService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(CategoryService) private readonly categoryService: CategoryService
  ) { }

  async create(payload: ICreateVarationRequest): Promise<IVarationResponse> {

    await this.categoryService.findOne(payload.categoryId);

    const newVaration = await this.prismaService.varation.create({
      data: payload
    })

    return {
      message: 'Varation created',
      varation: newVaration
    };
  }

  async findAll(): Promise<IVarationResponse> {

    const allVarations = await this.prismaService.varation.findMany();

    return {
      message: 'Return all varations',
      varations: allVarations
    };
  }

  async findOne(id: number): Promise<IVarationResponse> {
    const varation = await this.prismaService.varation.findUnique({
      where: { id }
    });

    if (!varation)
      throw new BadRequestException('Varation Not Found');

    return {
      message: 'Varation returned',
      varation
    };
  }

  async update(payload: IUpdateVarationRequest): Promise<IVarationResponse> {

    await this.findOne(payload.id);

    if (payload.categoryId)
      await this.categoryService.findOne(payload.categoryId);

    const updatedvaration = await this.prismaService.varation.update({
      where: { id: payload.id },
      data: payload
    });

    return {
      message: 'Updated',
      varation: updatedvaration
    };
  }

  async remove(id: number): Promise<IVarationResponse> {

    await this.findOne(id);

    const deletedVaration = await this.prismaService.varation.delete({ where: { id } });

    return {
      message: 'Varation deleted',
      varation: deletedVaration
    };
  }
}
