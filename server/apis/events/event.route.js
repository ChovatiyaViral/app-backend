const express = require('express');
const EventCtrl = require('./event.controller');
const auth = require('../../../middleware/checkAuthentication');


const router = express.Router();

router.route('/delete/:id')
    .delete(auth, EventCtrl.deleteEvent)

router.route('/')
    .get(auth, EventCtrl.getEventData)
    .post(auth, EventCtrl.createEvent);


module.exports = router;