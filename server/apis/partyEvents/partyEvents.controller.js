const PartyEvents = require('./partyEvents.model');


const createPartyEvents = async (req, res, next) => {
    try {
        const { poster_img, event_name, state, date, logo, company_logo, company_name, sponsor } = req.body;
        if (!(event_name && state && date && logo && company_logo && company_name && sponsor, poster_img)) {
            res.status(400).send("enter all details");
        }

        const partyEvents = new PartyEvents({
            poster_img,
            event_name,
            state,
            date,
            logo,
            company_logo,
            company_name,
            sponsor
        })

        const partyEventsData = await partyEvents.save();

        res.status(200).json(partyEvents)

    } catch (e) {
        next(e)
    }
};


const getAllPartyEventsData = async (req, res, next) => {
    try {
        const allPartyEventsData = await PartyEvents.find();
        res.status(200).json(allPartyEventsData)
    } catch (e) {
        next(e)
    }
}


module.exports = { createPartyEvents, getAllPartyEventsData }