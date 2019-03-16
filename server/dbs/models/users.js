import mongoose from 'mongoose'

const Schema = mongoose.Schema
const UserSchema = new Schema({
    username:{
        type:String,
        unique:true, // 唯一的
        require:true
    },
    password:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    }
});
export default mongoose.model('User',UserSchema)
