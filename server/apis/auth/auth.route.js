const express = require("express");
const RegistrationCtrl = require('./auth.controller')

const router = express.Router();

router.route('/')
    .post(RegistrationCtrl.create)
    .get(RegistrationCtrl.getAllRegistrationData);

router.route('login')
    .post(RegistrationCtrl.userLogin);

module.exports = router