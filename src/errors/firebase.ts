import { Error2 } from './base';
import { FirebaseErrorCodes } from './error-codes';

export class FirebaseNotInitedError extends Error2{
    public constructor(message ?: string){
        super(message ?? "Firebase not initialized!", FirebaseErrorCodes.FirebaseNotInitedError);
    }
}