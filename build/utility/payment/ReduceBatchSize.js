"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReduceBatchSize = void 0;
const app_1 = require("../../app");
const ReduceBatchSize = async (req, res, next) => {
    //Reduce batch size
    const paymentId = req.params.id;
    const payment = await app_1.prisma.payment.findUnique({
        where: {
            id: paymentId
        }
    });
    const { batch_id } = payment;
    const batch = await app_1.prisma.batch.findUnique({
        where: {
            id: batch_id
        }
    });
    const { batch_capacity_current } = batch;
    await app_1.prisma.batch.update({
        where: {
            id: batch_id
        },
        data: {
            batch_capacity_current: batch_capacity_current - 1,
        }
    });
};
exports.ReduceBatchSize = ReduceBatchSize;
