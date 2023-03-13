import { Response, NextFunction } from 'express';
import Product from '../models/Product.model'
import { MyRequest } from '../interfaces/interfaceExpress';
import joi from 'joi'
import createHttpError from 'http-errors';

const productValidate = joi.object({
    // userId: joi.string().required(),
    tittle: joi.string().required(),
    description: joi.string().required(),
    price: joi.number().required(),
    avaliable: joi.boolean().required(),
    images: joi.array().required()
})

// {
//     "tittle" : "Venta de Apartamento",
//     "description": "Hermoso apto en la unidad Ensenada Ubicado en Amazonia, Bello piso 2118",
//     "price": 120000,
//     "avaliable":true,
//     "images":["primeraimagen", "segundaimagen", "terceraimagen"]
// }

export const productController = {
    createProduct: async (req: MyRequest, res: Response, next: NextFunction) => {
        try {
            const {user_id} = req.user_id
            const { error, value } = productValidate.validate(req.body)
            if (error) return res.status(400).send(error);

            const product = new Product({...value, userId:user_id })
            const productSave = await product.save()

            return res.status(200).json({ data: productSave })

        } catch (error) {
            return next(createHttpError.InternalServerError);
        }
    },
    isAvaliable: async (req: MyRequest, res: Response, next: NextFunction) => {
        try {
            const {user_id} = req.user_id
            const {id} = req.params
            const product = await Product.findById(id)
            if(product?.userId !== user_id) return res.status(400).json({error: 'No tienes permisos para modificar este campo'})
            const updateProduct = await Product.findByIdAndUpdate(
                {_id: id},
                {avaliable: !product?.avaliable},
                {new: true}
            )
            return res.status(200).json({data: updateProduct})
        } catch (error:any) {
            return next(createHttpError.InternalServerError);
            // return res.status(400).json({error:error.message})
        }
    },
    allProducts: async(req: MyRequest, res: Response, next: NextFunction) => {
        try {
            const products = await Product.find()
            return res.status(200).json({data:products})
        } catch (error) {
            return next(createHttpError.InternalServerError);
        }
    },
    productId:  async(req: MyRequest, res: Response, next: NextFunction) =>{
        try {
            const {id} = req.params
            const products = await Product.findById(id)
            return res.status(200).json({data:products})
        } catch (error) {
            return next(createHttpError.InternalServerError);
            
        }
    }

}
