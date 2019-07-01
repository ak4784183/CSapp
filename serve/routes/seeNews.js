const express=require('express');
const router=express.Router();
const news=require('../models/news');

router.get('/:id',function(req,res){
    console.log(req.params.id);
    news.findById(req.params.id,function(err,newsContent){
        if (err) {
            res.json({
                status:500
            })
        } else {
            res.json({
                newsContent
            })
        }
    })
})

module.exports=router;