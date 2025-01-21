import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ForgotPasswordDto, ResetPasswordDto, SignInDto, SignUpDto } from './dto';
import { Public } from '@decorators';
// import { AuthGuard } from '@nestjs/passport';

@Public()
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @ApiOperation({ summary: "Sign up" })
  @Post('sign-up')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }

  @ApiOperation({ summary: "Sign in" })
  @Post('sign-in')
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto);
  }

  @ApiOperation({ summary: "Sign forgot password" })
  @Post('forgot-password')
  async forgotPassword(@Body() forgotPassDto: ForgotPasswordDto) {
    return await this.authService.forgotPassword(forgotPassDto.email);
  }

  @ApiOperation({ summary: "reset password" })
  @Post('reset-password')
  async resetPassword(@Body() resetPassDto: ResetPasswordDto) {
    return await this.authService.resetPassword(resetPassDto);
  }
}
