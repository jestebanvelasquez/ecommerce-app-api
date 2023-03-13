import { ErrorRequestHandler, Errback } from "express";

export const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err)
    }
    res.status(err.statusCode || 500).json({message: err.message || 'Error Unknow'}) 
} 