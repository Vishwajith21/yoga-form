
import { Request, Response, NextFunction } from 'express'

export const calculateExpiry = async (req: Request, res: Response, next: NextFunction) => {
    
    const currentDate = new Date()
    var calculatedExpireDate
    if(currentDate.getMonth() == 11){
        calculatedExpireDate = new Date(currentDate.getFullYear()+1,0,1)
    }else{
        calculatedExpireDate = new Date(currentDate.getFullYear(),currentDate.getMonth()+1,1)
    }


    req.body['expiresAt'] = calculatedExpireDate
    
    return calculateExpiry
}