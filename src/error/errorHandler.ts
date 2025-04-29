import ApiError from "./ApiError"
import PrismaError from './PrismaError'
import {Response} from 'express'
function errorHandler(err: any, res: Response){
    console.log("running")
    if (err instanceof ApiError){
        console.log("running")
        res.status(err.code).json({message: err.message})
        return
    }
    if(err instanceof PrismaError){
        res.status(err.code).json(err.message)
    }
    res.status(500).json({
        message: "Something went wrong with the server"
    })
}

export default errorHandler;