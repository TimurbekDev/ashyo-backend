import { User } from "@prisma/client";

export declare interface IUpdateUserRequest extends Partial<Omit<User, 'role'>> { }