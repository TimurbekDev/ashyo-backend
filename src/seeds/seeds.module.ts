import { UsersModule } from "@modules";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { SeedsService } from "./seeds.service";

@Module({
    imports : [SequelizeModule.forFeature([UsersModule])],
    providers : [SeedsService]
})
export class SeedsModule {}