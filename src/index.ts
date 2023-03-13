

//                       _oo0oo_
//                      o8888888o
//                      88" . "88
//                      (| -_- |)
//                      0\  =  /0
//                    ___/`---'\___
//                  .' \\|     |// '.
//                 / \\|||  :  |||// \
//                / _||||| -:- |||||- \
//               |   | \\\  -  /// |   |
//               | \_|  ''\---/''  |_/ |
//               \  .-\__  '-'  ___/-. /
//             ___'. .'  /--.--\  `. .'___
//          ."" '<  `.___\_<|>_/___.' >' "".
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |
//         \  \ `_.   \_ __\ /__ _/   .-` /  /
//     =====`-.____`.___ \_____/___.-`___.-'=====
//                       `=---='


//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import app from './app';
import createHttpError from 'http-errors'
import mongoose from 'mongoose';
import { products } from './data/mook';
import Product from './models/Product.model';

const PORT = process.env.PORT || '4000';

mongoose.connect(process.env.MONGO_URL!)
    .then(() => {
        // Product.insertMany(products)
        app.listen(PORT, () => {
            console.log(` Escuchando en el Puerto ${PORT}`, '&& Connected to Database Ecommerce-App'  );
        })
    }).catch(() => {
        throw createHttpError(501, 'Unable to Connect Database')
    })


