const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const skin=new Schema({
    skinId:String,
    skinname:String,
    price:Number,
    pic:String,
    buyer:String,
    createAt:{
        type:Date,
        default:Date.now(),
    },
    updateAt:{
        type:Date,
        default:new Date()
    }
})

module.exports=mongoose.model("skin",skin);