"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBatch = exports.getAllBatches = exports.getBatch = exports.createBatch = void 0;
const app_1 = require("../app");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const createBatch = async (req, res, next) => {
    const batchData = req.body;
    try {
        await app_1.prisma.batch.create({
            data: batchData,
        });
        res.status(201).json({
            message: "Batch created successfully",
            batch: batchData
        });
    }
    catch (error) {
        console.log(error);
        next(ApiError_1.default.internalServerError("Something went wrong"));
    }
};
exports.createBatch = createBatch;
const getBatch = async (req, res, next) => {
    const batchId = String(req.params.id);
    try {
        const batch = await app_1.prisma.batch.findUnique({
            where: {
                id: batchId,
            }
        });
        res.status(200).json({
            message: "Batch found",
            batch: batch
        });
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.getBatch = getBatch;
const getAllBatches = async (req, res, next) => {
    try {
        const batches = await app_1.prisma.batch.findMany();
        res.status(200).json(batches);
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.getAllBatches = getAllBatches;
const updateBatch = async (req, res, next) => {
    const batchId = String(req.params.id);
    const batchData = req.body;
    try {
        if (batchData.batch_capacity_current > batchData.batch_capacity_max) {
            throw "Maxium capacity reached";
        }
        const batch = await app_1.prisma.batch.update({
            where: {
                id: batchId,
            },
            data: batchData
        });
        res.status(200).json({
            message: "Updated batch succesfully",
            batch: batch,
        });
        next();
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.updateBatch = updateBatch;
