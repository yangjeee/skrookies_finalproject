var express = require('express');
var router = express.Router();
var Model = require('../../../models/index');
var Response = require('../../Response');
var statusCodes = require('../../statusCodes');
var { encryptResponse, decryptRequest } = require("../../../middlewares/crypt");
const jwt = require("jsonwebtoken");

/**
 * Login route
 * This endpoint allows the user to login
 * @path                             - /api/user/login
 * @middleware                       - Checks admin authorization
 * @param username                   - Username to login
 * @param password                   - Password to login
 * @return                           - JWT token
 */
router.post('/', encryptResponse, (req, res) => {
    return req;
});

module.exports = router;