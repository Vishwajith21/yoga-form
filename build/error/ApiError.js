"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ApiError {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
    static badRequest(message = "Bad Request") {
        const error = new ApiError(message, 400);
        // errorHandler(error,res)
        return;
    }
    static unauthorized(message = "Unauthorized access") {
        return new ApiError(message, 401);
    }
    static serverNotFound(message = "Not Found") {
        return new ApiError(message, 404);
    }
    static internalServerError(message = "Something went wrong") {
        return new ApiError(message, 500);
    }
    static requestTimeout(message = "Request Timeout") {
        return new ApiError(message, 408);
    }
    static networkAuthenticationerror(message = "Network Error") {
        return new ApiError(message, 511);
    }
    static paymentRequired(message = "Payment Not Yet Done") {
        return new ApiError(message, 402);
    }
}
exports.default = ApiError;
