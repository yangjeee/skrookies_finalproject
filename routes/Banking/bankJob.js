var express = require('express');
var router = express.Router();
const profile = require("../../middlewares/profile")
const {decryptEnc} = require("../../middlewares/crypt");

router.get("/",async (req, res) => {
    const cookie = decryptEnc(req.cookies.Token)
    profile(cookie).then(data=>{
        res.render("Banking/trade_send.ejs",{pending:data})
    })
})

module.exports = router;