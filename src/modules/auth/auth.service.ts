import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ISignInRequest, ISignUpRequest } from './interfaces';
import { JwtCustomService } from '../jwt';
import { compare } from 'bcrypt';
import { UserService } from '../user';
// import { HASH_SALT } from '@constants';
// import { RedisService } from '@redis';
// import { MailerCustomService } from '@mailer';
// import { DevicesService } from '../devices';


@Injectable()
export class AuthService {
  constructor(
    @Inject(UserService) private userService: UserService,
    @Inject(JwtCustomService) private jwtCustomService: JwtCustomService,
    // @Inject(RedisService) private redisService: RedisService,
    // @Inject(MailerCustomService) private mailerService: MailerCustomService,
  ) { }

  async signUp(payload: ISignUpRequest) {
    const data = await this.userService.create({
      ...payload,
      image : null
    })
    const tokens = await this.jwtCustomService.generateTokens({
      userId: data.user.id,
      role: data.user.role,
    })


    return {
      user: data.user,
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

  // async googleAuth(req: any) {
  //   let user = await this.userService.findByEmail(req.user.email)
  //   let newUser = null

  //   if (!user) {
  //     newUser = await this.userService.create({
  //       email: req.user.email,
  //       password: req.user.googleId,
  //       full_name: req.user.displayName
  //     });
  //     user = newUser
  //   }

  //   const tokens = await this.jwtCustomService.generateTokens({
  //     userId: user.id,
  //     role: user.role,
  //   })


  //   return {
  //     user,
  //     access_token: tokens.access,
  //     refresh_token: tokens.refresh
  //   }
  // }


  // async forgotPassword(email: string) {
  //   const user = await this.userService.findByEmail(email)
  //   if (!user)
  //     throw new NotFoundException('User not found')

  //   const opt = this.#generateOtp()

  //   await this.mailerService.sendMail({
  //     to: user.email,
  //     subject: 'OTP',
  //     text: `Your otp : ${opt}`
  //   })

  //   await this.redisService.setItem({
  //     key: user.email,
  //     value: opt,
  //     expireTime: 60 * 5
  //   })

  //   return {
  //     message: `OTP sended to this email : ${user.email}`
  //   }
  // }

  // async resetPassword(payload: IResetPasswordRequest) {
  //   const user = await this.userService.findByEmail(payload.email)
  //   if (!user)
  //     throw new NotFoundException('User not found')

  //   const otp = await this.redisService.getItem(user.email)

  //   if (otp != payload.code)
  //     throw new BadRequestException('OTP doesnt match')

  //   user.update({
  //     password: await hash(payload.password, HASH_SALT)
  //   })

  //   return {
  //     message: 'Password Successully Updated'
  //   }
  // }

  #generateOtp = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }
}



