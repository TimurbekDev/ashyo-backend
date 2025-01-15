import { ISignInRequest } from "./sign-in.interface";

export declare interface IResetPasswordRequest extends ISignInRequest {
    code:number
}