const express=require('express');
const router=express.Router();
const path=require('path');
const fs=require('fs');
const news=require('../models/news');

router.get('/:id',function(req,res){
    // console.log(req.params.id);
    news.findById(req.params.id,function(err,result){
        if (err) {
            console.log(err);
        } else {
            
            fs.unlink(path.join(__dirname,'../','uploads',result.newsPic),function(err){
                console.log(err);
            })
            news.findByIdAndRemove(req.params.id,function(err){
                if (err) {
                    console.log(err);
                }else{
                    res.json({
                        deleted: "删除成功了哟"
                    })
                }
            })
        }
    })





    
})
module.exports=router;