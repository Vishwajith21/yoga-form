import errorHandler from "./errorHandler";
import {NextFunction, Request, Response} from 'express'

class ApiError {
    message : string;
    code : number;

    constructor(message: string, code: number){
        this.message = message;
        this.code = code;
    }

    static badRequest(message:string = "Bad Request"){
        const error = new ApiError (message, 400);
        // errorHandler(error,res)
        return
    }
    static unauthorized(message:string = "Unauthorized access"){
        return new ApiError (message, 401);
    }
    static serverNotFound(message:string = "Not Found"){
        return new ApiError (message, 404);
    }
    static internalServerError(message:string = "Something went wrong"){
        return new ApiError (message, 500);
    }
    static requestTimeout (message: string = "Request Timeout") {
        return new ApiError (message, 408);
    }
    static networkAuthenticationerror (message: string = "Network Error") {
        return new ApiError (message, 511);
    }
    static paymentRequired (message: string = "Payment Not Yet Done") {
        return new ApiError (message, 402);
    }
}

export default ApiError;