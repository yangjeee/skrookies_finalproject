const axios = require("axios");
var { decryptEnc } = require("../../middlewares/crypt");

exports.authresult = function(req, callback){
    // const cookie = decryptEnc(req.get("cookie").split("Token=")[1])
    axios({
        method: "get",
        url: "http://15.152.81.150:3000/api/auth/check",

        // headers: {"authorization": "1 "+ cookie},
        headers: {"authorization": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaXNfYWRtaW4iOnRydWUsImlhdCI6MTY3MjIwMzY4MH0.MBq56j5d1yI2G7wDKonIfpCWpU5FKZPczheZ0G3k8f4"},
        
    }).then((data)=>{
        if(data.data.status.message == 'Success'){
        var result = true;
        }else{
        var result = false;
        }
        callback(result);
    });
}

