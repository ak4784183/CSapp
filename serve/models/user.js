const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const user=new Schema({
    //用户ID
    userId:String,
    username:String,
    password:String,
    email:String,
    phone:Number,
    note:String,
    pic:String,
    money:Number
});

module.exports=mongoose.model('user',user);