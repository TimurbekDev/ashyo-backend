import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { PrismaClient } from "@prisma/client";

@Module({
    providers : [PrismaService],
    imports : [PrismaClient]
})
export class PrismaModule {}