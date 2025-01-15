import { HASH_SALT } from "@config";
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaService } from "@prisma";
import { Roles } from "@prisma/client";
import { hash } from "bcrypt";

@Injectable()
export class SeedsService implements OnModuleInit {
    constructor(
        @Inject(PrismaService) private prismaService: PrismaService
    ) { }

    async onModuleInit() {
        await this.seedUsers()
    }

    async seedUsers(): Promise<void> {
        const usersCount = await this.prismaService.user.count()

        if (usersCount == 0) {
            await this.prismaService.user.create({
                data: {
                    fullName: "I'm admin!",
                    email: 'admin@gmail.com',
                    password: await hash('admin123', HASH_SALT),
                    role: Roles.Admin
                }
            })
        }
    }
}