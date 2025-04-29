"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PrismaError {
    constructor(message, code) {
        this.message = message;
        this.code = code;
    }
    static databaseUnreachable(message = "Cannot find database in server at given port") {
        return new PrismaError(message, 1001);
    }
    static databaseNotFound(message = "Database does not exist in given file path") {
        return new PrismaError(message, 1003);
    }
    static accesDenied(message = "Access denied") {
        return new PrismaError(message, 1010);
    }
    static UniqueKeyConstraint(message = "Unique constraint failed") {
        return new PrismaError(message, 2002);
    }
    static ForeignKeyConstraint(message = "Foreign key constraint failed") {
        return new PrismaError(message, 2003);
    }
    static ConstraintFailed(message = "Constraint failed in the database") {
        return new PrismaError(message, 2005);
    }
    static QueryParsingError(message = "Failed to parse query") {
        return new PrismaError(message, 2008);
    }
}
exports.default = PrismaError;
