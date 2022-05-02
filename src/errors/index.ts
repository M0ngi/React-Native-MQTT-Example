export class Error2 extends Error{
    public code : string;

    public constructor(message : string, code: string){
        super(message);
        this.code = code;
    }
}

export class NotLoggedInError extends Error2{
    public constructor(message?: string){
        super(message ?? "You are not logged in!", "user-not-logged-in");
    }
}