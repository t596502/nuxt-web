import mongoose from 'mongoose'

const Schema = mongoose.Schema;

const City = new Schema({
    value:{
        type:Array,
        require:true
    },
    id:{
        type:String,
        require:true
    }
});
export default mongoose.model('City',City)
