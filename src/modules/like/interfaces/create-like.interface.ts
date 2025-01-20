import { Like } from "@prisma/client";

export declare interface ICreateLikeRequest extends Omit<Like, 'id'> { }