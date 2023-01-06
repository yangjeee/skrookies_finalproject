var express = require('express');
var router = express.Router();
var db = require('../../middlewares/db');

const axios = require("axios");
const Response = require("../../middlewares/Response");
const {decryptRequest, encryptResponse, decryptEnc} = require("../../middlewares/crypt");

/* GET users listing. */
// router.get('/', function(req, res, next) {
//     res.render("main");
// });

router.get('/', function (req, res, next) {

    db.query(`SELECT *
              FROM notice ORDER BY id DESC`, function (error, results) {

        if (error) {
            throw error;
        }

        if (req.cookies.Token) {
            const cookie = decryptEnc(req.cookies.Token);
            axios({
                method: "post",
                url: api_url + "/api/User/profile",
                headers: {"authorization": "1 " + cookie}
            }).then((data) => {
                const result = decryptRequest(data.data);

                return res.render("temp/index", {u_data: result.data.username, results: results,html: "<h1>get start를 눌러주세요</h1>"});
            });
        } else {
            res.render("temp/index", {results: results, html: "<h1>get start를 눌러주세요</h1>"});
        }
    });
});

router.post("/",(req, res)=>{
    let html = ""
    const src = req.body.src;
    console.log(src)
    db.query(`SELECT *
              FROM notice ORDER BY id DESC`, function (error, results) {

        if (error) {
            throw error;
        }

        if (req.cookies.Token) {
            console.log("token")
            const cookie = decryptEnc(req.cookies.Token);
            axios({
                method: "post",
                url: api_url + "/api/User/profile",
                headers: {"authorization": "1 " + cookie}
            }).then((data) => {
                const result = decryptRequest(data.data);

                if(src.toString().indexOf("http")<0){
                    html = `<iframe width='600' height='400' src=${src}></iframe>`
                    return res.render("temp/index", {u_data: result.data.username, results: results, html: html});
                }
                else{
                    axios({
                        method: "get",
                        url: src
                    }).then((data)=>{
                        html = data.data

                        return res.render("temp/index", {u_data: result.data.username, results: results, html: html});
                    })
                }
            });
        } else {
            console.log("no token")
            if(src.toString().indexOf("http")<0){
                html = `<iframe width='600' height='400' src=${src}></iframe>`
                return res.render("temp/index", {results: results, html: html});
            }
            else{
                console.log("else axios")
                axios({
                    method: "get",
                    url: src
                }).then((data)=>{
                    html = data.data
                    console.log(html)
                    return res.render("temp/index", {results: results, html: html});
                })
            }

        }
    });
})

module.exports = router;
