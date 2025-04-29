"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePayment = exports.updatePayment = exports.getAllPayments = exports.getPayment = exports.createPayment = void 0;
const app_1 = require("../app");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const expiresAt_1 = require("../utility/payment/expiresAt");
const ReduceBatchSize_1 = require("../utility/payment/ReduceBatchSize");
const createPayment = async (req, res, next) => {
    const paymentData = req.body;
    try {
        const payment = await app_1.prisma.payment.create({
            data: paymentData
        });
        (0, expiresAt_1.calculateExpiry)(req, res, next);
        const calculatedExpireDate = req.body.expiresAt;
        const { id } = payment;
        await app_1.prisma.payment.update({
            where: {
                id: id
            },
            data: {
                isActive: true,
                expiresAt: calculatedExpireDate
            }
        });
        res.status(201).json({
            message: "Succesfully made payment",
            payment: paymentData,
        });
    }
    catch (error) {
        next(ApiError_1.default.internalServerError("Something went wrong"));
    }
};
exports.createPayment = createPayment;
const getPayment = async (req, res, next) => {
    const paymentId = String(req.params.id);
    try {
        const payment = await app_1.prisma.payment.findUnique({
            where: {
                id: paymentId,
            },
        });
        res.status(200).json({
            message: "Found payment",
            payment: payment
        });
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.getPayment = getPayment;
const getAllPayments = async (req, res, next) => {
    try {
        const payments = await app_1.prisma.payment.findMany();
        res.json(payments);
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.getAllPayments = getAllPayments;
const updatePayment = async (req, res, next) => {
    const paymentId = String(req.params.id);
    const paymentData = req.body;
    try {
        const payment = await app_1.prisma.payment.update({
            where: {
                id: paymentId
            },
            data: paymentData
        });
        res.status(200).json({
            message: "Updated payment succesfully",
            payment: payment
        });
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.updatePayment = updatePayment;
const deletePayment = async (req, res, next) => {
    const paymentId = String(req.params.id);
    try {
        const payment = await app_1.prisma.payment.findUnique({
            where: {
                id: paymentId
            },
        });
        const { userId } = payment;
        //Batch size reduced
        (0, ReduceBatchSize_1.ReduceBatchSize)(req, res, next);
        //User payment status updated
        await app_1.prisma.user.update({
            where: {
                id: userId
            },
            data: {
                payment_status: false,
                batch_id: null
            }
        });
        //Payment deleted
        await app_1.prisma.payment.delete({
            where: {
                id: paymentId,
            }
        });
        res.status(200).json({
            message: "Deleted payment succesfully"
        });
    }
    catch (error) {
        console.log(error);
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.deletePayment = deletePayment;
