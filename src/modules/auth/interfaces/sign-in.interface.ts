import { User } from "@prisma/client";

export declare interface ISignInRequest extends Pick<User,'email' | 'password'>{}