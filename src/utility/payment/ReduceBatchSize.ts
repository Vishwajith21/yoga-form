import { Batch, Payment } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../../app'
import ApiError from '../../error/ApiError'

export const ReduceBatchSize = async (req: Request, res: Response, next: NextFunction) => {
   
    //Reduce batch size
    const paymentId = req.params.id
    const payment = await prisma.payment.findUnique({
        where:{
            id: paymentId
        }
    })
    const {batch_id} = payment as Payment
    const batch = await prisma.batch.findUnique({
        where: {
            id: batch_id
        }
    })
    const { batch_capacity_current } = batch as Batch
    await prisma.batch.update({
        where: {
            id: batch_id
        },
        data: {
            batch_capacity_current: batch_capacity_current - 1,
        }
    })


}