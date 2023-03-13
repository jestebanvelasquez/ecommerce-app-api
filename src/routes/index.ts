import {Router} from 'express';
import userRoutes from './user.routes';
import productRoutes from './product.routes';

const routerApp = Router()

routerApp.use('/user', userRoutes)
routerApp.use('/product', productRoutes)

export default routerApp;