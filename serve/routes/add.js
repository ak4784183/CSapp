const express=require('express');
const skin=require('../models/skin');
const formidable=require('formidable');
const path=require('path');
const router=express.Router();

router.post('/',function(req,res){
    const skinform=new formidable.IncomingForm();
    skinform.keepExtensions=true;
    skinform.uploadDir=path.join(__dirname,"../","uploads");
    skinform.parse(req,function(err,skinmessage,skinpic){
        if (err) {
            throw err;
        }else{
            var skinInstance=new skin({               
                    // skinname:skinmessage.skinname,
                    // price:skinmessage.price,
                    ...skinmessage,
                    buyer:"",
                    pic:'/'+path.basename(skinpic.pic.path)
            })
            skinInstance.save();
            res.json({
                success:"上架成功了哟！"
            })            
        }

    });
    
})

module.exports=router;
