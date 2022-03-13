const express = require('express');
const PartyEventsCtrl = require('./partyEvents.controller');
const auth = require('../../../middleware/checkAuthentication');
const multer = require('multer');


const storageOne = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storageOne });


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname)
//     }
// });

// const upload = multer({ storage: storage });

const router = express.Router();

router.route('/')
    .post(auth, upload.single('logo'), PartyEventsCtrl.createPartyEvents)
    .get(auth, PartyEventsCtrl.getAllPartyEventsData)


module.exports = router;