const express=require('express');
const router=express.Router();
const user=require('../models/user');

router.get('/:name',function(req,res){
    // 通过url的动态id参数寻找数据库对应的用户，返回对应的信息
    // console.log(req.params.name);
    user.find({username:req.params.name},function(err,usermessage){
        if (err) {
            console.log(err);
        } else {
            res.json({
                usermessage
            })
        }
    })
})

router.post('/:name',function(req,res){
    console.log(req.params.name);
    var userform={
        phone:req.body.phone,
        email:req.body.email,
        note:req.body.note
    }
    
    user.findOneAndUpdate({username:req.params.name},userform,function(err){
        if (err) {
            console.log(err);
        } else {




            res.json({
                status:200,
                message:"success"
            })
        }
    })
})

module.exports=router;