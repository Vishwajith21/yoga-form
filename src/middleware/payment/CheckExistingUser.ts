import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import { prisma } from '../../app'
import PrismaError from '../../error/PrismaError'

export const CheckExistingUser = async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.body

            const user = await prisma.user.findUnique({
            where: {
                id: userId
            }
        })
        const {payment_status} = user as User || {}
        if(payment_status === true) next(PrismaError.UniqueKeyConstraint("You are already subscribed"))
        else next()
}