import {Request, Response, NextFunction} from 'express'
import {prisma} from '../app'
import {Batch} from '@prisma/client'
import ApiError from '../error/ApiError'

export const createBatch = async (req: Request, res: Response, next: NextFunction) => {
    const batchData = req.body;
    try{
        const batch = await prisma.batch.create({
            data: batchData,
        })
        res.status(201).json({
            message: "Batch created successfully",
            batch: batch
        })
    }catch(error){
        console.log(error)
        next(ApiError.internalServerError("Something went wrong"))
    }
}

export const getBatch = async (req: Request, res: Response, next: NextFunction) => {
    const batchId = String(req.params.id);
    try{
        const batch = await prisma.batch.findUnique({
            where: {
                id: batchId,
            }
        })
        res.status(200).json({
            message: "Batch found",
            batch: batch
        })
    }catch(error){
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const getAllBatches = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const batches = await prisma.batch.findMany()
        res.status(200).json(batches)
    }catch(error){
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const updateBatch = async (req: Request, res: Response, next: NextFunction) => {
    const batchId = String(req.params.id)
    const batchData = req.body
    try{
        if(batchData.batch_capacity_current > batchData.batch_capacity_max)
        {
            throw "Maxium capacity reached"
        }
        const batch = await prisma.batch.update({
            where: {
                id: batchId,
            },
            data: batchData
        })
        res.status(200).json({
            message: "Updated batch succesfully",
            batch: batch,
        })
        next()
    }catch(error){
        next(ApiError.badRequest("Something went wrong"))
    }
}