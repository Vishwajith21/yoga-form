import errorHandler from "./errorHandler";
import {NextFunction, Request, Response} from 'express'

class PrismaError{
    message: string;
    code: number;

    constructor(message: string, code: number){
        this.message = message;
        this.code = code;
    }

    static databaseUnreachable(message: string = "Cannot find database in server at given port"){
        return new PrismaError(message,1001)
    }

    static databaseNotFound(message: string = "Database does not exist in given file path"){
        return new PrismaError(message,1003)
    }

    static accesDenied(message: string = "Access denied"){
        return new PrismaError(message,1010)
    }

    static UniqueKeyConstraint(message: string = "Unique constraint failed"){
        return new PrismaError(message,2002)
    }

    static ForeignKeyConstraint(message: string = "Foreign key constraint failed"){
        return new PrismaError(message,2003)
    }

    static ConstraintFailed(message: string = "Constraint failed in the database"){
        return new PrismaError(message,2005)
    }

    static QueryParsingError(message: string = "Failed to parse query"){
        return new PrismaError(message,2008)
    }

}

export default PrismaError;