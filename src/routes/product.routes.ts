import { Router } from "express";
import { productController } from '../controllers/product.controller';
import { verifyToken } from '../middlewares/verifyToken';

const productRoutes = Router();

productRoutes.post('/', verifyToken, productController.createProduct)
productRoutes.patch('/:id', verifyToken, productController.isAvaliable)
productRoutes.get('/', productController.allProducts)
productRoutes.get('/:id', productController.productId)


export default productRoutes;