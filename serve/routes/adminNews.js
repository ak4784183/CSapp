const express=require('express');
const router=express.Router();
const news=require('../models/news');

router.get('/',function(req,res){
    news.find({},function(err,newsResult){
        if (err) {
            console.log(err);
        } else {
            res.json({
                newsResult
            })
        }
    })
})
module.exports=router;