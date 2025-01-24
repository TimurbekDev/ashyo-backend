import { User } from "@prisma/client";

export interface IGetMeResponse {
    message: string,
    user: User,
}