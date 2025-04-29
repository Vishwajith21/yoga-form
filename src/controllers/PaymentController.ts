import { Request, Response, NextFunction } from 'express'
import { prisma } from '../app'
import ApiError from '../error/ApiError'
import { Payment } from '@prisma/client'
import { calculateExpiry } from '../utility/payment/expiresAt'
import { ReduceBatchSize } from '../utility/payment/ReduceBatchSize'

export const createPayment = async (req: Request, res: Response, next: NextFunction) => {
    const paymentData = req.body
    try{
        const payment = await prisma.payment.create({
            data : paymentData
        })
        calculateExpiry(req,res,next)
        const calculatedExpireDate = req.body.expiresAt
        const {id} = payment as Payment
        await prisma.payment.update({
            where: {
                id: id
            },
            data: {
                isActive: true,
                expiresAt: calculatedExpireDate
            }
        })
        res.status(201).json({
            message: "Succesfully made payment",
            payment: payment as Payment,
        })
    }catch(error){
        next(ApiError.internalServerError("Something went wrong"))
    }
}

export const getPayment = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = String(req.params.id)
    try{
        const payment = await prisma.payment.findUnique({
            where: {
                id: paymentId,
            },
        })
        res.status(200).json({
            message: "Found payment",
            payment: payment
        })
    }catch(error){
        next(ApiError.badRequest("Something went wrong"))
    }
}

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
    try{
        const payments = await prisma.payment.findMany();
        res.json(payments);
    }catch(error){
            next(ApiError.badRequest("Something went wrong"))
    }
}

export const updatePayment = async (req: Request, res: Response, next: NextFunction) => {
    const paymentId = String(req.params.id)
    const paymentData = req.body
    try{
        const payment = await prisma.payment.update({
            where: {
                id: paymentId
            },
            data: paymentData
        })
        res.status(200).json({
            message: "Updated payment succesfully",
            payment: payment
        })
    }catch(error){
        next(ApiError.badRequest("Something went wrong"))
    }
    
}

export const deletePayment = async (req: Request, res: Response, next: NextFunction) => {

    const paymentId = String(req.params.id)

    try{
        const payment = await prisma.payment.findUnique({
            where: {
                id: paymentId
            },
        })
        const {userId} = payment as Payment

        //Batch size reduced
        ReduceBatchSize(req,res,next)

        //User payment status updated
        await prisma.user.update({
            where:{
                id: userId
            },
            data: {
                payment_status: false,
                batch_id: null 
            }
        })

        //Payment deleted
        await prisma.payment.delete({
            where: {
                id: paymentId,
            }
        })
        
        res.status(200).json({
            message: "Deleted payment succesfully"
        })
        
    }catch(error){
        console.log(error)
        next(ApiError.badRequest("Something went wrong"))
    }
}
