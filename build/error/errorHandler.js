"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ApiError_1 = __importDefault(require("./ApiError"));
const PrismaError_1 = __importDefault(require("./PrismaError"));
function errorHandler(err, res) {
    console.log("running");
    if (err instanceof ApiError_1.default) {
        console.log("running");
        res.status(err.code).json({ message: err.message });
        return;
    }
    if (err instanceof PrismaError_1.default) {
        res.status(err.code).json(err.message);
    }
    res.status(500).json({
        message: "Something went wrong with the server"
    });
}
exports.default = errorHandler;
