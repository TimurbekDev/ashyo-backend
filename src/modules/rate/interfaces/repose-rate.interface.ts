import { Rate } from "@prisma/client"

export declare interface IRateResponse {
    message: string
    rate?: Rate
    rates?: Rate[]
}