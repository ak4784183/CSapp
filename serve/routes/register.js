const express=require('express');
const md5=require('md5');
const user=require('../models/user');
const router=express.Router();

router.post('/',function(req,res){
    
    user.find({username:req.body.username},function(err,usermessage){
        if (err) {
            console.log(err);
        } else {
            if (usermessage.length) {
                // user表里若已经存在该用户名，返回json信息
                res.json({
                    status:500,
                    message:"该用户名已被注册"
                })
            } else {
                //若不存在，则存入新用户信息
                var userInstance=new user({
                    username:req.body.username,
                    password:md5(req.body.password),
                    email:req.body.email,
                    phone:req.body.phone,
                    pic:"/header/header.png",
                    note:"",
                    money:0
                })
                userInstance.save();
                res.json({                                          
                    message:"注册成功"
                })
            }
        }
    })

    
})

module.exports=router;
