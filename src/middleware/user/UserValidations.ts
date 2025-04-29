import {User} from '@prisma/client'
import ApiError from '../../error/ApiError'
import { Request, Response, NextFunction } from 'express'

const UserFormValidation = async (req: Request, res: Response, next: NextFunction) => {
    const userData : User = req.body
    const {age} = userData
    const {email} = userData
    const {phone_no} = userData

    if(age < 18 || age > 65){
        next(ApiError.badRequest("Age limit must be between 18 ti 65"))
        return;
    }

    if(String(phone_no).length != 10)
    {
        next(ApiError.badRequest("Phone number is not valid"))
        return;
    }

    if(!String(email).includes('@'))
    {
        next(ApiError.badRequest("Email id is not valid"))
        return;
    }
    next();
}


export default UserFormValidation