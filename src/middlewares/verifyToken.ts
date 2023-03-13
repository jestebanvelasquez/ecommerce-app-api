// import Jwt from 'jsonwebtoken';
import User from '../models/User.model';
import { Response, NextFunction, Request } from 'express';
import createHttpError from 'http-errors';
import jwt from 'jsonwebtoken';
import { MyRequest } from '../interfaces/interfaceExpress';



export const verifyToken = async (req:MyRequest, res:Response, next:NextFunction) => {
    try {
        const headerToken = req.get('Authorization')
        if(!headerToken) return res.status(400).json({succes: false, error: 'Token no valido'})
        const token = headerToken.replace('Bearer ', '')

            jwt.verify(token, process.env.SECRET_TOKEN!, (error, decoded) => {
            if(error){
                return res.status( 400).json({message: error.message, error})
            }else{
                // res.locals.user_id = decoded
                req.user_id = decoded
                next()
            }
        })
    } catch (error) {
        return next(createHttpError.InternalServerError);
    }
}
