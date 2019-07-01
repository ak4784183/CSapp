const express = require('express');
const router = express.Router();
const skin = require('../models/skin');

router.get('/:name', function (req, res) {
    console.log(req.params.name);
    skin.find({buyer:req.params.name},function(err,goodsmessage){
        if (err) {
            console.log(err);
        } else {
            // console.log(goodsmessage);
            res.json({
                goodsmessage
            })            
        }
    })
})

router.post('/', function (req, res) {
    // console.log(req.body);
    skin.findById({ _id: req.body.skinId }, function (err, skinMessage) {
        if (err) {
            console.log(err);
        } else {
            

            if (skinMessage.length) {
                res.json({
                    status:500,
                    message:"皮肤已入库存"
                })
            } else {
                var buySkin = {
                    createAt: skinMessage.createAt,
                    updateAt: skinMessage.updateAt,
                    skinname: skinMessage.skinname,
                    price: skinMessage.price,
                    pic: skinMessage.pic,
                    buyer: req.body.username
                }
                skin.findByIdAndUpdate({_id: req.body.skinId},buySkin,function(err){
                    if (err) {
                        console.log(err);
                    } else {
                        
                    }
                })
            }
            
            // console.log(buySkin);
        }
    })

    // 购买后对skin表插入购买用户字段

})


module.exports = router;