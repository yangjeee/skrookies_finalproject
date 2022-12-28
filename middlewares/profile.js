const axios = require("axios");
const {decryptRequest, decryptEnc} = require("./crypt");
const profile = async (cookie) => {
    let data2
    await axios({
        method: "post",
        url: "http://15.152.81.150:3000/api/user/profile",
        headers: {"authorization": "1 " + cookie}
    }).then(( data )=> {
        data2 = decryptRequest(data.data)
    })
    return data2
}

module.exports = profile