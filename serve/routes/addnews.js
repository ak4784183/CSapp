const express=require('express');
const router=express.Router();
const news=require('../models/news');
const formidable=require('formidable');
const path=require('path');

router.post('/',function(req,res){
    const newsForm=new formidable.IncomingForm();
    newsForm.keepExtensions=true;
    newsForm.uploadDir=path.join(__dirname,'../','uploads');
    
    newsForm.parse(req,function(err,newsmessage,newspic){
        if (err) {
            console.log(err);
        } else {
            var newsInstance=new news({               
                ...newsmessage,
                newsPic:'/'+path.basename(newspic.newsPic.path),
                
        })
        newsInstance.save();
        res.json({
            success:"发布成功"
        })       
        }
    })


})
module.exports=router;