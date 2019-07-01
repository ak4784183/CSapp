const express=require('express');
const router=express.Router();
const skin=require('../models/skin');

router.get('/:searchSkinValue',function(req,res){
    var skinValue=new RegExp(req.params.searchSkinValue,'i');
    skin.find({skinname:skinValue,buyer:""},function(err,skinmessage){
        if (err) {
            console.log(err);
        } else {
            res.json({
                skinmessage
            })
        }
    })
})

module.exports=router;