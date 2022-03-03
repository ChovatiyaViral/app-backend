const express = require('express');
const PartyEventsCtrl = require('./partyEvents.controller');
const auth = require('../../../middleware/checkAuthentication');

const router = express.Router();

router.route('/')
    .post(auth, PartyEventsCtrl.createPartyEvents)


module.exports = router;