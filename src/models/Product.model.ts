import {Document, Schema, model } from 'mongoose';

export interface ProductInterface extends Document{
    userId: string;
    tittle: string;
    description:string;
    price: number;
    avaliable: boolean;
    images: string[];
}

const ProductSchema: Schema = new Schema({
    userId:{
        type:String, 
        require:true 
    },
    title: String,
    description: String,
    price:Number,
    avaliable:Boolean,
    images:{
        type: Array,
        default:[]
    }
})

export default model<ProductInterface>('Product', ProductSchema);