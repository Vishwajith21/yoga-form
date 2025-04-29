"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckExistingUser = void 0;
const app_1 = require("../../app");
const PrismaError_1 = __importDefault(require("../../error/PrismaError"));
const CheckExistingUser = async (req, res, next) => {
    const { userId } = req.body;
    const user = await app_1.prisma.user.findUnique({
        where: {
            id: userId
        }
    });
    const { payment_status } = user;
    if (payment_status === true)
        next(PrismaError_1.default.UniqueKeyConstraint("You are already subscribed"));
    else
        next();
};
exports.CheckExistingUser = CheckExistingUser;
