import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ICreateVoRequest, IUpdateVoRequest, IVoResponse } from './interfaces';
import { VarationService } from '../varation/varation.service';
import { PrismaService } from '@prisma';

@Injectable()
export class VarationOptionService {

  constructor(
    @Inject(PrismaService) private readonly prismaService: PrismaService,
    @Inject(VarationService) private readonly varationService: VarationService
  ) { }

  async create(payload: ICreateVoRequest): Promise<IVoResponse> {

    await this.varationService.findOne(payload.varationId)

    const vo = await this.prismaService.varationOption.create({
      data: payload
    });

    return {
      message: 'Varation Option created',
      varationOption: vo
    };
  }

  async findAll(): Promise<IVoResponse> {

    const vos = await this.prismaService.varationOption.findMany();
    return {
      message: 'All varation options retrieved',
      varationOptions: vos
    };
  }

  async findOne(id: number): Promise<IVoResponse> {

    const vo = await this.prismaService.varationOption.findFirst({ where: { id } });

    if (!vo)
      throw new NotFoundException('Varation Options not found');

    return {
      message: 'Varation Option found',
      varationOption: vo
    };;
  }

  async update(payload: IUpdateVoRequest): Promise<IVoResponse> {

    await this.findOne(payload.id);

    if (payload.varationId)
      await this.varationService.findOne(payload.varationId);

    const vo = await this.prismaService.varationOption.update({
      where: { id: payload.id },
      data: payload
    })

    return {
      message: 'Varation Option Updated',
      varationOption: vo
    };
  }

  async remove(id: number) {

    await this.findOne(id);

    const vo = await this.prismaService.varationOption.delete({ where: { id } });

    return {
      message: 'Varation Option deleted',
      varationOption: vo
    };;
  }
}
