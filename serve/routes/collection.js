const express = require('express');
const router = express.Router();
const user = require('../models/user');
const collet = require('../models/collect');
const skin = require('../models/skin');

router.get('/:name', function (req, res) {
    // 通过name查询收藏表获取数据，拿到对应的skinId
    // console.log(req.params.name);
    collet.find({ username: req.params.name }, function (err, skinmessage) {
        if (err) {
            console.log(err);
        }
        // 用一个对象保存好返回的skinId
        // 如果搜到就继续执行，没搜到就不返回数据
        if (skinmessage.length) {
            var collectIdList = [];
            for (let i = 0; i < skinmessage.length; i++) {
                collectIdList.push(skinmessage[i].skinId);
                console.log(collectIdList);
            }

            var skinResult = [];
            for (let i = 0; i < collectIdList.length; i++) {
                //关键一步，给skinId设置遍历值，当等于遍历值的时候，返回push后的数组
                var max = collectIdList.length - 1;
                skin.findById(collectIdList[i], function (err, result) {
                    if (err) {
                        console.log(err);
                    } else {
                        // {buyer:""}
                        console.log(result);
                        // console.log(result.length);
                        skinResult.push(result);
                        if (i == max) {
                            // console.log(skinResult);
                            res.json({
                                skinResult
                            })
                        }
                    }

                })

            }
        } else {
            res.json({
                status: '200'
            })
        }

    })

})

router.post('/', function (req, res) {
    // console.log(req.body);
    collet.find({
        username: req.body.username,
        skinId: req.body.skinId
    }, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            if (result.length) {
                res.json({
                    status: 500,
                    message: "已经收藏过了"
                })
            } else {
                var collectInstance = new collet({
                    username: req.body.username,
                    skinId: req.body.skinId
                })
                collectInstance.save();
                res.json({
                    status: 200,
                    message: "收藏成功"
                })
            }
        }
    })




})
module.exports = router;