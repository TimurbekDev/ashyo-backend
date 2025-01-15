import { BadRequestException, ConflictException, Inject, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { JsonWebTokenError, JwtService, NotBeforeError, TokenExpiredError } from "@nestjs/jwt";
import { IPayload, ITokens } from "./interfaces";
import { ConfigService } from "@nestjs/config";
import { TokenType } from "./enum";

@Injectable()
export class JwtCustomService {
    constructor(
        @Inject(JwtService) private jwtService: JwtService,
        @Inject(ConfigService) private config: ConfigService
    ) { }

    async generateTokens(payload: IPayload): Promise<ITokens> {
        return {
            access: await this.jwtService.signAsync(payload, {
                expiresIn: this.config.get<string>('access.expiresIn'),
                secret: this.config.get<string>('access.secret')
            }),
            refresh: await this.jwtService.signAsync(payload, {
                expiresIn: this.config.get<string>('refresh.expiresIn'),
                secret: this.config.get<string>('refresh.secret'),
            })
        }
    }

    async verifyToken(token: string, tokenType: TokenType) {
        try {
            let payload = null

            if (tokenType == TokenType.Access) {
                payload = await this.jwtService.verifyAsync(token, {
                    secret: this.config.get<string>('access.secret'),
                })
            }

            if (tokenType == TokenType.Refresh) {
                payload = await this.jwtService.verifyAsync(token, {
                    secret: this.config.get<string>('refresh.secret')
                })
            }

            if (!payload)
                throw new BadRequestException('Token is not valid')

            return payload
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnprocessableEntityException("Token already expired")
            }

            if (error instanceof NotBeforeError) {
                throw new ConflictException("Token not before error")
            }

            if (error instanceof JsonWebTokenError) {
                throw new BadRequestException(error.message)
            }

            throw new BadRequestException('Invalid token')
        }
    }
}