import { Module } from "@nestjs/common";
import { JwtCustomService } from "./jwt.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Module({
    providers: [JwtCustomService,JwtService,ConfigService],
    exports: [JwtCustomService]
})
export class JwtCustomModule {}