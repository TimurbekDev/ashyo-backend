import { User } from "@prisma/client";

export interface IUpdateUser extends Pick<User,"id" | "email" | "fullName" | "password">{
    image: Express.Multer.File;
}