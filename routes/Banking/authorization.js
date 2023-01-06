var express = require('express');
var router = express.Router();
var axios = require("axios");


const checkCookie = require("../../middlewares/checkCookie");
const { render } = require('ejs');

router.get('/', checkCookie, function (req, res, next) {
    axios({
        method: "get",
        url: req.query.url,
        data: req.query
    }).then((data) => {
        res.render("Banking/authorization", {html: data.data});
    })
});

module.exports = router;