import {Schema, Document, model} from 'mongoose';

export interface UserModel extends Document {
    userName: string;
    lastName: string;
    picture: string;
    password: string;
    email: string;
    avaliable: boolean;


}

const UserSchema: Schema = new Schema({
    userName: {
        type:String,
        min: 2,
        max:50
    },
    lastName: {
        type:String,
        min: 2,
        max:50
    },
    picture:{
        type:String
    },
    password:{
        type: String,
        require: true
    },
    email: {
        type:String,
        unique: true,
    },
    avaliable:{
        type:Boolean,
        default: true
    }

})

export default model<UserModel>('User', UserSchema)