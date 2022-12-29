var express = require('express');
var router = express.Router();
const {encryptResponse, decryptRequest} = require('../../middlewares/crypt')
const axios = require("axios")
const sha256 = require("js-sha256")

/* GET users listing. */
router.get('/', function (req, res, next) {
    console.log("login.js : ", req.body)
    res.render("temp/signup");
});

router.post('/', function (req, res, next) {
    const {username, password} = req.body;
    const sha256Pass = sha256(password)
    baseData = `{"username": "${username}", "password": "${sha256Pass}"}`
    console.log("basedata : ", baseData)
    const enData = encryptResponse(baseData);

    axios({
        method: "post",
        url: api_url + "/api/user/register",
        data: enData
    }).then((data) => {
        // console.log(decryptRequest(data))
        // console.log("data : ", decryptRequest(data.data))
        let result = decryptRequest(data.data);
        console.log(result);
        if (result.status.code == 200) {
            return res.send("<script>alert('SUCCESS');location.href = \"/user/login\";</script>");

        } else {
            return res.send("<script>alert('FAIL');location.href = \"/user/signup\";</script>");

        }
    })
});


module.exports = router;
