import express, {Request, Response} from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import helmet from 'helmet';
import { errorHandler } from './middlewares/errorHandler';
import routerApp from './routes/index';
import bodyParser = require('body-parser');


dotenv.config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(bodyParser.json({limit:'30mb'}));
app.use( bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(errorHandler);



app.use('/api', routerApp)


export default app;