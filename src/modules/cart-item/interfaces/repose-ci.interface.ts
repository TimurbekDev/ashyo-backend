import { CartItem } from "@prisma/client"

export declare interface ICartItemResponse {
    message: string
    cartItem?: CartItem
    cartItems?: CartItem[]
}