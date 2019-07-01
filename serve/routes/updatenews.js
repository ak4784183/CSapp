const express=require('express');
const router=express.Router();
const news=require('../models/news');
const formidable=require('formidable');
const path=require('path');

router.get('/:id',function(req,res){
    // console.log(req.params.id)
    news.findById(req.params.id,function(err,news){
        if (err) {
            console.log(err)
        } else {
            res.json({
                news
            })
        }
    })
})
router.post('/pic/:id',function(req,res){
    // console.log(req.params.id);
    let newsform=new formidable.IncomingForm();
    newsform.keepExtensions=true;
    newsform.uploadDir=path.join(__dirname,"../","uploads");
    newsform.parse(req,function(err,newsresult,newsimg){
            let changeObj={
                ...newsresult
            }
            
            news.findByIdAndUpdate(req.params.id,changeObj,function(err){
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        status:200,
                        message:"修改成功"
                    })
                }
            })       
    })
})
router.post('/:id',function(req,res){
    // console.log(req.params.id);
    let newsform=new formidable.IncomingForm();
    newsform.keepExtensions=true;
    newsform.uploadDir=path.join(__dirname,"../","uploads");
    newsform.parse(req,function(err,newsresult,newsimg){
            let changeObj={
                ...newsresult
            }
            if (newsimg.newsPic.name) {
                console.log('yes')
                changeObj.newsPic='/'+path.basename(newsimg.newsPic.path);               
            }      
            news.findByIdAndUpdate(req.params.id,changeObj,function(err){
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        status:200,
                        message:"修改成功"
                    })
                }
            })       
    })
})

module.exports=router;
