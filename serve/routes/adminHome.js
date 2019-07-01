const express=require('express');
const skin=require('../models/skin');
const router=express.Router();

router.get('/',function(req,res){
    skin.find({},function(err,skinlist){
        if (err) {
            console.log(err);
        } else {
            res.json({
                skinlist
            })
        }
        
    })
})




module.exports=router;