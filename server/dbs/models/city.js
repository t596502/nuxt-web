import moogoose from 'mongoose'

const Schema = moogoose.Schema;

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
export default moogoose.model('City',City)
