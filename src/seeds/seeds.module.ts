import { UsersModule } from "@modules";
import { Module } from "@nestjs/common";
import { SeedsService } from "./seeds.service";
import { PrismaService } from "@prisma";

@Module({
    imports : [],
    providers : [SeedsService,PrismaService]
})
export class SeedsModule {}