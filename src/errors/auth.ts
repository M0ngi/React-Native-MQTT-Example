import { Error2 } from './base';
import { ErrorCodes } from './error-codes';

export class NotLoggedInError extends Error2{
    public constructor(message?: string){
        super(message ?? "You are not logged in!", ErrorCodes.NotLoggedInError);
    }
}