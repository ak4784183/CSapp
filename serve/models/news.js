const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const news=new Schema({
    newsId:String,
    title:String,
    newsPic:String,
    content:String,
    createAt:{
        type:Date,
        default:Date.now(),
    }
})

module.exports=mongoose.model("news",news);