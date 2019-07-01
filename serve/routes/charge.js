const express=require('express');
const router=express.Router();
const user=require('../models/user');

router.get('/:name',function(req,res){
    user.findOne({username:req.params.name},function(err,usermessage){
        if (err) {
            console.log(err);
        } else {
            // console.log(usermessage.money)
            res.json({
                money:usermessage.money
            })
        }
    })
})
router.post('/:name',function(req,res){
    // 充值涉及用户的财产，需要用POST
    // console.log(req.body.username)
    var chargeMoney={
        money:req.body.money
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

module.exports=router;