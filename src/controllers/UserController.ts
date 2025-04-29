import { User } from '@prisma/client'
import { NextFunction, Response, Request } from 'express'
import { prisma } from '../app'
import ApiError from '../error/ApiError'
export const createUser = async (req: Request, res: Response, next: NextFunction) => {

    const userData: User = req.body;
    try {
        const user = await prisma.user.create({
            data: userData,
        });

        const { id } = user as User

        res.status(201).json({
            message: "User created successfully",
            user: user as User
        })
    } catch (error) {
        next(ApiError.internalServerError("Something went wrong"))//explicitly inserting the handler function msg takes default value if not sent
    }
}

export const getUser = async (req: Request, res: Response, next: NextFunction) => {

    const userId = String(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        res.status(200).json({
            message: "User Found",
            user: user
        })
    } catch (error) {
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const getUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const emailId = String(req.params.id).trim();
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: emailId
            }
        })
        res.status(200).json({
            message: "User found",
            user: user
        })
    }
    catch (error) {
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = String(req.params.id);
    const userData = req.body;
    try {
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: userData,
        })
        res.status(200).json({
            message: "Updated user",
            user: user
        })
    } catch (error) {
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = String(req.params.id);
    try {
        await prisma.user.delete({
            where: {
                id: userId,
            }
        })
        res.status(200).json({
            message: "Successfully deleted user"
        })
    } catch (error) {
        next(ApiError.internalServerError("Something went wrong"))
    }
}
