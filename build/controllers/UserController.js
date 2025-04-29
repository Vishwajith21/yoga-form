"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUser = exports.createUser = void 0;
const app_1 = require("../app");
const ApiError_1 = __importDefault(require("../error/ApiError"));
const createUser = async (req, res, next) => {
    const userData = req.body;
    const batchId = req.body.batch_id;
    try {
        await app_1.prisma.user.create({
            data: userData,
        });
        res.status(201).json({
            message: "User created successfully",
            user: userData
        });
    }
    catch (error) {
        next(ApiError_1.default.internalServerError("Something went wrong")); //explicitly inserting the handler function msg takes default value if not sent
    }
};
exports.createUser = createUser;
const getUser = async (req, res, next) => {
    const userId = String(req.params.id);
    try {
        const user = await app_1.prisma.user.findUnique({
            where: {
                id: userId
            }
        });
        res.status(200).json({
            message: "User Found",
            user: user
        });
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.getUser = getUser;
const getAllUsers = async (req, res, next) => {
    try {
        const users = await app_1.prisma.user.findMany();
        res.json(users);
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.getAllUsers = getAllUsers;
const updateUser = async (req, res, next) => {
    const userId = String(req.params.id);
    const userData = req.body;
    try {
        const user = await app_1.prisma.user.update({
            where: {
                id: userId
            },
            data: userData,
        });
        res.status(200).json({
            message: "Updated user",
            user: user
        });
    }
    catch (error) {
        next(ApiError_1.default.badRequest("Something went wrong"));
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res, next) => {
    const userId = String(req.params.id);
    try {
        const user = await app_1.prisma.user.delete({
            where: {
                id: userId,
            }
        });
        res.status(200).json({
            message: "Successfully deleted user"
        });
        next();
    }
    catch (error) {
        next(ApiError_1.default.internalServerError("Something went wrong"));
    }
};
exports.deleteUser = deleteUser;
