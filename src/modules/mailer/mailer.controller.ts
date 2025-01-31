import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerCustomService } from './mailer.service';
import { ConnectSupport } from './dtos';



@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerCustomService) { }
  @Post()
  async sendSupportEmail(@Body() body: ConnectSupport) {
    this.mailerService.Support(body)
  }
}