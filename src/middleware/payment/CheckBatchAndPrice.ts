import { Batch } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../../app'
import ApiError from '../../error/ApiError'

export const CheckBatchAndPrice = async (req: Request, res: Response, next: NextFunction)=>{
    const {batch_id} = req.body
    if(!batch_id) next (ApiError.badRequest("No batch id"));

    const batch = await prisma.batch.findUnique({
        where:{
            id: batch_id
        }
    })
    const {batch_capacity_max, batch_capacity_current, price} = batch as Batch || {}
    if(batch_capacity_current+1>batch_capacity_max)next (ApiError.badRequest("Batch is full!"))
    req.body['price'] = price
    next()
}