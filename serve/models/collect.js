const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const collect=new Schema({
    //用户ID
    username:String,
    skinId:String
});

module.exports=mongoose.model('collect',collect);