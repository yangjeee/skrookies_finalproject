// const Model = require("../models/index");
const Response = require('./Response');
const statusCodes = require("./statusCodes");

const SECRET = 'amazing';
const SECRET_LENGTH = SECRET.length;

const operate = (input) => {
    let result = "";
    for (let i in input) {
        result += String.fromCharCode(input.charCodeAt(i) ^ SECRET.charCodeAt(i % SECRET_LENGTH));
    }
    return result;
}

const decrypt = (encodedInput) => {
    let input = Buffer.from(encodedInput, 'base64').toString();
    let dec = operate(input);
    return dec;
}

const encrypt = (input) => {
    let enc = operate(input.toString());
    let b64 = Buffer.from(enc).toString('base64');
    return b64;
}

/**
 * Encryption middleware
 * This middleware encrypts server response before forwarding to client
 * @return                           - Calls the next function on success
 */
const encryptResponse = (input) => {
    let b64 = encrypt(input);
    return {
        "enc_data": b64
    };
}

/**
 * Decryption middleware
 * This middleware decrypts user data after authorization check
 * @return                           - Calls the next function on success
 */
const decryptRequest = function (req, res, next) {
    var r = new Response();

    try {
        req.body = JSON.parse(decrypt(req.enc_data));

    } catch (err) {
        r.status = statusCodes.BAD_INPUT;
        r.data = err;
        return res.json(r);
    }
    return req.body
};

const decryptEnc = (enc_data) => {
<<<<<<< HEAD
  let input = Buffer.from(enc_data, 'base64').toString();
  let dec = operate(input);
  const index = dec.indexOf("accessToken")

  return dec.substring(index+14,dec.length-3);
}

module.exports =  {
=======
    let input = Buffer.from(enc_data, 'base64').toString();
    let dec = operate(input);
    const index = dec.indexOf("accessToken")

    return dec.substring(index+14,dec.length-3);
}


module.exports = {
>>>>>>> fae0aaafc9b8a697e70c32bc1577b3d0b27b12a9
    encryptResponse,
    decryptRequest,
    decryptEnc
}
