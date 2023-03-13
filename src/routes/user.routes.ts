import { Router } from "express";
import { authUser } from '../middlewares/authUser';
import { UserController } from '../controllers/user.controller';
import { verifyToken } from '../middlewares/verifyToken';


const userRoutes = Router();

userRoutes.post('/', authUser.register);
userRoutes.post('/login', authUser.login)
userRoutes.get('/profile', verifyToken, UserController.getUser )


export default userRoutes;