import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { IResetPasswordRequest, ISignInRequest, ISignUpRequest } from './interfaces';
import { JwtCustomService, TokenType } from '../jwt';
import { compare, hash } from 'bcrypt';
import { UserService } from '../user';
import { RedisCacheService } from 'src/redis/redis.service';
import { MailerCustomService } from '../mailer';
import { PrismaService } from '@prisma';
import { HASH_SALT } from '@config';
import { VerifySendDto, VerifyUserDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { CartService } from '../cart';



@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(PrismaService) private prismaService: PrismaService,
    @Inject(JwtCustomService) private jwtCustomService: JwtCustomService,
    @Inject(RedisCacheService) private redisService: RedisCacheService,
    @Inject(MailerCustomService) private mailerService: MailerCustomService,
    @Inject(ConfigService) private configService: ConfigService,
    @Inject(CartService) private cartService: CartService,
  ) { }

  async signUp(payload: ISignUpRequest) {

    const existUser = await this.prismaService.user.findFirst({ where: { email: payload.email } });

    if (existUser) throw new BadRequestException('Email already in use');
    payload.password = await hash(payload.password, HASH_SALT);
    const newUser = await this.prismaService.user.create({
      data: {
        fullName: payload.fullName,
        email: payload.email,
        password: payload.password
      }
    })


    await this.mailerService.CreatedUserMessage({
      text: newUser.fullName,
      to: newUser.email,
      subject: `Hi ${newUser.fullName}`
    })
    const tokens = await this.jwtCustomService.generateTokens({
      userId: newUser.id,
      role: newUser.role,
    })

    const newCart = await this.cartService.create({userId: newUser.id})
    return {
      user: newUser,
      access_token: tokens.access,
      refresh_token: tokens.refresh
    }
  }

  async signIn(payload: ISignInRequest) {
    const user = await this.userService.findByEmail(payload.email)
    if (!user)
      throw new BadRequestException('email or password invalid')

    const isValid = await compare(payload.password, user.password)

    if (!isValid)
      throw new BadRequestException('email or password invalid')

    const tokens = await this.jwtCustomService.generateTokens({
      userId: user.id,
      role: user.role,
    })

    return {
      user,
      access_token: tokens.access,
      refresh_token: tokens.refresh
    }
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findByEmail(email)
    if (!user)
      throw new NotFoundException('User not found')

    const otp = this.#generateOtp()

    await this.mailerService.sendOTP({
      to: user.email,
      subject: 'Your one time password',
      text: otp
    })

    await this.redisService.setByText({
      key: user.email,
      value: +otp,
      time: 1000 * 60 * 2
    })



    return {
      message: `OTP sended to this email : ${user.email}`
    }
  }

  async resetPassword(payload: IResetPasswordRequest) {
    const user = await this.prismaService.user.findFirst({ where: { email: payload.email } });

    if (!user)
      throw new NotFoundException('User not found')

    const otp = await this.redisService.getByText(user.email)

    if (+otp != payload.code)
      throw new BadRequestException('OTP doesnt match')

    await this.prismaService.user.update({
      where: { email: user.email },
      data: {
        password: await hash(payload.password, HASH_SALT)
      }
    })
    return {
      message: 'Password Successully Updated'
    }
  }

  async sendVerification(payload: VerifySendDto): Promise<{ message: string, email: string }> {

    const user = await this.userService.findByEmail(payload.email)
    if (!user) {
      throw new NotFoundException("Verification failed, User not found")
    }

    if (user.isVerified) {
      throw new BadRequestException("User already verified")
    }

    const tokens = await this.jwtCustomService.generateTokens({
      userId: user.id,
      role: user.role,
    })

    const verifyUrl = `${this.configService.get<string>("baseUrl.BASE_URL")}/api/auth/verify-user?token=${tokens.access}&id=${user.id}`;

    await this.mailerService.VerficationMail({
      text: verifyUrl,
      to: user.email,
      subject: `Hi ${user.fullName} please click Verify me button`
    })



    return {
      message: "Verification sended succesfully, check email",
      email: user.email
    }

  }

  async verifyUser(payload: VerifyUserDto): Promise<{ message: string }> {
    await this.jwtCustomService.verifyToken(payload.token, TokenType.Access)
    const user = await this.userService.findOne(Number(payload.id))
    if (!user) {
      throw new NotFoundException("Verification failed, User not found")
    }
    await this.prismaService.user.update({
      where: { id: Number(payload.id) },
      data: {
        isVerified: true,
      }
    })

    return {
      message: "User verfied successfully"
    }
  }

  async refreshToken(refreshToken: string) {

    const payload = await this.jwtCustomService.verifyToken(refreshToken, TokenType.Refresh);
    const user = (await this.userService.findOne(payload.userId)).user
    if (!user)
      throw new BadRequestException('email or password invalid')

    const tokens = await this.jwtCustomService.generateTokens({
      userId: user.id,
      role: user.role,
    })

    return {
      user,
      access_token: tokens.access,
      refresh_token: tokens.refresh
    }
  }

  #generateOtp = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
}