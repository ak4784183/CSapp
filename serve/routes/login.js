const express=require('express');
const user=require('../models/user');
const md5=require('md5');
const router=express.Router();

// token状态
const jwt=require('jsonwebtoken');
const secret = 'Violin';   //自定义


router.post('/',function(req,res){
    user.find({
        username:req.body.username,
        password:md5(req.body.password)
    },function(err,usermessage){
        if (err) {
            console.log(err);
        }
        // console.log(usermessage[0].money);


        const token = jwt.sign({username:req.body.usermessage},secret,{
            expiresIn:720
        });
        // console.log(token);
        if (usermessage.length) {
            res.json({
                status:200,
                username:req.body.username,
                welcome:"欢迎进入CS饰品网",
                token:token
            })
        } else {
            res.json({
                status:404,
                LoginError:"登录失败"
            })
        }
    })
    
})

router.post('/adminlogin/',function(req,res){
    user.findOne({username:"admin"},function(err,result){
        if (err) {
            console.log(err);
        } else {
            let adminName=result.username;
            let adminpsd=result.password;

            let reqName=req.body.username
            let reqPsd=md5(req.body.password);

            const token = jwt.sign({username:req.body.usermessage},secret,{
                expiresIn:720
            });
            if (adminName==reqName&&adminpsd==reqPsd) {
                console.log('yes')
                res.json({
                    status:200,
                    token
                })
            } else {
                res.json({
                    status:404,
                    LoginError:"管理员用户名或密码错误"
                })
            }

        }
    })

    
})


module.exports=router;
