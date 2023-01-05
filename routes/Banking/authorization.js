var express = require('express');
var router = express.Router();
var axios = require("axios");


const checkCookie = require("../../middlewares/checkCookie");
const { render } = require('ejs');

router.get('/', checkCookie, function (req, res, next) {
    console.log(req.query.url);
    axios({
        method: "get",
        url: req.query.url
    }).then((data) => {
        res.render("Banking/authorization", {html: data.data});
    })
});

module.exports = router;