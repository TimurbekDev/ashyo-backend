import { Like } from "@prisma/client"

export declare interface ILikeResponse {
    message: string
    like?: Like
    likes?: Like[]
}