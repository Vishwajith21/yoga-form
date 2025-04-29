"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckBatchAndPrice = void 0;
const app_1 = require("../../app");
const ApiError_1 = __importDefault(require("../../error/ApiError"));
const CheckBatchAndPrice = async (req, res, next) => {
    const { batch_id } = req.body;
    if (!batch_id)
        next(ApiError_1.default.badRequest("No batch id"));
    const batch = await app_1.prisma.batch.findUnique({
        where: {
            id: batch_id
        }
    });
    const { batch_capacity_max, batch_capacity_current, price } = batch;
    if (batch_capacity_current + 1 > batch_capacity_max)
        next(ApiError_1.default.badRequest("Batch is full!"));
    req.body['price'] = price;
    next();
};
exports.CheckBatchAndPrice = CheckBatchAndPrice;
