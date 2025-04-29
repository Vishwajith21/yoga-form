"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakePayment = void 0;
const app_1 = require("../../app");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const MakePayment = async (req, res, next) => {
    const { price } = req.body;
    if (!price)
        next(ApiError_1.default.internalServerError("Failed to set price"));
    //Make payment
    //Assume payment runs succesfully
    //Update batch
    const { batch_id } = req.body;
    const batch = await app_1.prisma.batch.findUnique({
        where: {
            id: batch_id,
        }
    });
    const { batch_capacity_current } = batch;
    await app_1.prisma.batch.update({
        where: {
            id: batch_id
        },
        data: {
            batch_capacity_current: batch_capacity_current + 1
        }
    });
    //Update user with batch
    const { userId } = req.body;
    await app_1.prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            batch_id: batch_id,
            payment_status: true
        }
    }).catch(error => {
        console.log(error);
        next(ApiError_1.default.internalServerError("Could not update user"));
    });
    next();
};
exports.MakePayment = MakePayment;
