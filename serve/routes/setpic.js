const express = require('express');
const router = express.Router();
const user = require('../models/user');
const formidable = require('formidable');
const path = require('path');

router.get('/:name', function (req, res) {

    user.find({ username: req.params.name }, function (err, usermessage) {
        if (err) {
            console.log(err);
        } else {
            // console.log(usermessage);
            res.json({
                usermessage
            })
        }
    })
})

router.post('/:id', function (req, res) {
    const picform = new formidable.IncomingForm();
    picform.keepExtensions = true;
    picform.uploadDir = path.join(__dirname, '../', 'uploads/', 'header');
    picform.parse(req, function (err, usermeassage, userpic) {
        if (err) {
            console.log(err);
        } else {
            console.log(path.basename(userpic.pic.path));
            var userObj = {
                ...usermeassage,
                pic: '/header/'+path.basename(userpic.pic.path)
            }
            user.findByIdAndUpdate(req.params.id,userObj,function(err,result){
                if (err) {
                    console.log(err);
                } else {
                    res.json({
                        status:200
                    })
                    console.log(result);
                }
            })
            
        }
    })
})

module.exports = router;