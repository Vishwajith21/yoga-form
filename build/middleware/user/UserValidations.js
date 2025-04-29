"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const UserFormValidation = async (req, res, next) => {
    const userData = req.body;
    const { age } = userData;
    const { email } = userData;
    const { phone_no } = userData;
    if (age < 18 || age > 65) {
        next(ApiError_1.default.badRequest("Age limit must be between 18 ti 65"));
        return;
    }
    if (String(phone_no).length != 10) {
        next(ApiError_1.default.badRequest("Phone number is not valid"));
        return;
    }
    if (!String(email).includes('@')) {
        next(ApiError_1.default.badRequest("Email id is not valid"));
        return;
    }
    next();
};
exports.default = UserFormValidation;
