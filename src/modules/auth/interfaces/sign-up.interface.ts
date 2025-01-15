import { User } from "@prisma/client";

export declare interface ISignUpRequest extends Pick<User,'email'|'fullName'|'password'>{}