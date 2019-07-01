const express=require('express');
const router=express.Router();
const user=require('../models/user');

router.post('/:name',function(req,res){
    // 充值涉及用户的财产，需要用POST
    // console.log(req.body.username)
    user.findOne({username:req.params.name},function(err,result){
        if (err) {
            console.log(err)
        }
        var newmoney=Number(result.money)+Number(req.body.money);
        // console.log(newmoney)
        var chargeMoney={
            money:newmoney
        }
        user.findOneAndUpdate({username:req.params.name},chargeMoney,function(err){
            if (err) {
                console.log(err);
            } else {
                res.json({
                    status:200,
                    message:"充值成功"
                })
            }
        })
    })
    
})

module.exports=router;