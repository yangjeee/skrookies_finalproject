const axios = require("axios");
var { decryptEnc } = require("../../middlewares/crypt");

authresult = function(req, callback){
    // const cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    axios({
        method: "get",
        url: "http://15.152.81.150:3000/api/auth/check",
        // headers: {"authorization": "1 " + req.get("cookie").split("Token=")[1]}
        headers: {"authorization": "1 "+ cookie},
        
    }).then((data)=>{
        // console.log(data);
        if(data.data.status.message == 'Success'){
        var result = true;
        }else{
        var result = false;
        }
        callback(result);
    });
}

admauthresult = function(req, callback){
    // const cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    axios({
        method: "get",
        url: "http://15.152.81.150:3000/api/auth/admcheck",
        // headers: {"authorization": "1 " + req.get("cookie").split("Token=")[1]}
        headers: {"authorization": "1 "+ cookie},
    
    }).then((data)=>{
        if(data.data.status.message === 'Success'){
        var result = true;
        }else{
        var result = false;
        }
        callback(result);
    });
}

module.exports =  {
    authresult,
    admauthresult
}
