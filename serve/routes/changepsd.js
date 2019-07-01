const express=require('express');
const router=express.Router();
const user=require('../models/user');
const md5=require('md5');

router.post('/:name',function(req,res){
    // console.log(req.params.name);
    // console.log(req.body.findpsd);

    user.findOne({username:req.params.name},function(err,result){
        if (md5(req.body.findpsd)!=result.password) {
            res.json({
                status:500
            })
        }else{
            var psdObj={
                password:md5(req.body.password)
            }
            user.findOneAndUpdate({username:req.params.name},psdObj,function(err){
                if (err) {
                    console.log(err)
                } else {
                    console.log('修改成功');
                    res.json({
                        status:200
                    })
                }
               
            })
        }
    })
})

module.exports=router;