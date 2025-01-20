import { User } from "@prisma/client";

export declare interface ICreateUserRequest extends Omit<User, 'id' | 'role'> { }
export declare interface IUserResponse {
    message: string;
    user?: User,
    users?: User[]
}