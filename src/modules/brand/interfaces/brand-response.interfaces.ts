import { Brend } from "@prisma/client"

export declare interface IBrandResponse{
    message: string
    brand?: Brend
    brands?: Brend[]
}