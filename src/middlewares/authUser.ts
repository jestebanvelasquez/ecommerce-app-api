import {Response, Request, NextFunction} from 'express';
import createHttpError from 'http-errors';
import JwT from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from '../models/User.model';
import User from '../models/User.model';
import jwt from 'jsonwebtoken';





export const authUser = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {
                userName,
                lastName,
                picture,
                email,
                avaliable,
                password
            }: UserModel = req.body

            const user = await User.findOne({ email });
            if (user) return next(createHttpError(406, 'Usuario ya existe.'))

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
            const accessToken = JwT.sign({user_id:saveUser._id}, process.env.SECRET_TOKEN!)
            return res.status(200).json({ data: saveUser, token: accessToken});
        } catch (error: any) {
            return next(createHttpError.InternalServerError);
        }
    },
    login: async (req:Request, res:Response, next:NextFunction) => {
        try {

            const {email, password} = req.body;
            if(!email || !password)  return next(createHttpError(400, 'Credenciales Incompletas.'))
            const user = await User.findOne({email});

            if(!user)  return next(createHttpError(400, 'Credenciales Incompletas.'))
            

            const comparePass = await bcrypt.compare(password, user.password)
            if(!comparePass){
                return next(createHttpError(404, 'Email ó Password Incorrecto.' ))
            }
            const accessToken = jwt.sign({user_id: user._id},process.env.SECRET_TOKEN!)
            return res.status(200).json({ data: user, token: accessToken});
        } catch (error) {
            return next(createHttpError.InternalServerError);
        }
    },
}