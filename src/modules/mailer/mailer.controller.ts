import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MailerCustomService } from './mailer.service';
import { ConnectSupport } from './dtos';
import { Public } from '@decorators';



@ApiTags('Mailer')
@Controller('mailer')
export class MailerController {
  constructor(private readonly mailerService: MailerCustomService) { }
  @Public()
  @Post()
  async sendSupportEmail(@Body() body: ConnectSupport) {
    console.log(body)
    return this.mailerService.Support(body)
  }
}