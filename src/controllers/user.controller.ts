import { Request, Response, NextFunction } from 'express';
import User from '../models/User.model';
import { UserModel } from '../models/User.model';
import { errorHandler } from '../middlewares/errorHandler';
import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { MyRequest } from '../interfaces/interfaceExpress';
import Product from '../models/Product.model';


export const UserController = {

    create: async (req:Request, res:Response, next:NextFunction) => {
        try {
            const {
                userName,
                lastName,
                picture,
                email,
                avaliable,
                password
            }:UserModel = req.body

            const user = await User.findOne({email});
            if(user) return  next(createHttpError(406, 'Usuario ya existe.'))

            const salt = await bcrypt.genSalt();
            const passHash = await bcrypt.hash(password, salt);

            const newUser = new User({
                userName,
                lastName,
                picture,
                email,
                avaliable,
                password: passHash
            })

            const saveUser = await newUser.save()
            return res.status(200).json({data: saveUser});

        } catch (error:any) {
            return next(createHttpError.InternalServerError);
            // return res.status(500).json({error:error.message})

        }
    },
    getUser: async (req:MyRequest, res:Response, next:NextFunction) => {
        try {
            const {user_id} = req.user_id
            const user = await User.findById(user_id)
            const products = await Product.find({userId:user_id})

            // traer productos del usuario

            return res.status(200).json({data: user, products: products})
        } catch (error) {
            return next(createHttpError.InternalServerError);
        }
    }
}