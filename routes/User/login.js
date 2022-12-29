var express = require('express');
var router = express.Router();

const {encryptResponse,decryptRequest} = require('../../middlewares/crypt')
const axios = require("axios");



/* GET users listing. */
router.get('/', function(req, res, next) {
    // res.render("temp/login");
    res.render("temp/login");
});


router.post('/', function(req, res, next) {
    const {username, password} = req.body;
    const baseData=`{"username": "${username}", "password": "${password}"}`
    const enData = encryptResponse(baseData);
    
    axios({
        method: "post",
        url: api_url+"/api/user/login",
        data:enData
    }).then((data)=>{
        console.log(data.data.enc_data)
        console.log("data : ", decryptRequest(data.data))

        res.render("afterlogin",{data:data.data.enc_data})
    })
});

module.exports = router;
