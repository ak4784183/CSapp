const express = require('express');
const router = express.Router();
const skin = require('../models/skin');
const fs = require('fs');
const path=require('path');
const collect=require('../models/collect');

router.get('/:id', function (req, res) {
    // console.log(req.params.id);
    skin.findById(req.params.id, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            // console.log(result);
            // var deletedSkin=result.buyer;
            // var deletedName=result.buyer;
            fs.unlink(path.join(__dirname, "../", 'uploads', result.pic), function (err) {
                if (err) throw err;

            })

            skin.findByIdAndRemove(req.params.id, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    
                    res.json({
                        deleted: "删除成功了哟"
                    })
                }
            })
        }
    })


})

module.exports = router;