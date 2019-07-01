const express=require('express');
const router=express.Router();
const skin=require('../models/skin');
const formidable=require('formidable');
const path=require('path');


router.get('/:id',function(req,res){
    // console.log(req.params.id);
    skin.findById(req.params.id,function(err,skinmessage){
        if (err) {
            throw err;
        } else {
            res.json({
                skinmessage:skinmessage
            })
        }
    })
})

router.post('/:id',function(req,res){
    // console.log(req);
    const skinform=new formidable.IncomingForm();
    skinform.keepExtensions=true;
    skinform.uploadDir=path.join(__dirname,"../","uploads");
    skinform.parse(req,function(err,fileds,files){
        if (err) {
            throw err;
        }else{
            var updateSkin={
                ...fileds,
                updateAt:new Date()
            }
            // console.log(files);
            // 判断图片
           

            // 根据ID查询数据库，修改数据
            skin.findByIdAndUpdate(req.params.id,updateSkin,function(err){
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        status:200,
                        update:"修改成功"
                    })
                }
            })
                    
        }

    });
})
router.post('/pic/:id',function(req,res){
    // console.log(req);
    const skinform=new formidable.IncomingForm();
    skinform.keepExtensions=true;
    skinform.uploadDir=path.join(__dirname,"../","uploads");
    skinform.parse(req,function(err,fileds,files){
        if (err) {
            throw err;
        }else{
            var updateSkin={
                ...fileds,
                updateAt:new Date()
            }
            // console.log(files);
            // 判断图片
            if (files.pic.name) {
                updateSkin.pic='/'+path.basename(files.pic.path)
            }else { //图片没有更新  使用原来的图片

            }

            // 根据ID查询数据库，修改数据
            skin.findByIdAndUpdate(req.params.id,updateSkin,function(err){
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        status:200,
                        update:"修改成功"
                    })
                }
            })
                    
        }

    });
})

module.exports=router;
