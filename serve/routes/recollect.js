const express=require('express');
const router=express.Router();
const collect=require('../models/collect');
const skin=require('../models/skin');

router.post('/',function(req,res){
    // console.log(req.body.username);
    // console.log(req.body.skinId);
    collect.findOneAndRemove({
        username:req.body.username,
        skinId:req.body.skinId
    },function(err){
        if (err) {
            console.log(err);
        } else {
            res.json({
                message:"撤销成功"
            })
        }
    })
})

module.exports=router;