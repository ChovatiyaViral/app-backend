const express = require('express');
const PartyEventsCtrl = require('./partyEvents.controller');
const auth = require('../../../middleware/checkAuthentication');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage: storage });


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
    .post(auth, upload.fields([{ name: 'logo', maxCount: 1 }, { name: 'company_logo', maxCount: 1 }, { name: 'poster_img', maxCount: 1 }]), PartyEventsCtrl.createPartyEvents)
    .get(auth, PartyEventsCtrl.getAllPartyEventsData)


module.exports = router;