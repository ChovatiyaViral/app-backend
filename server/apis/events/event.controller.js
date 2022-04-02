const Events = require('./event.model');

const getEventData = async (req, res, next) => {
    try {
        const eventData = await Events.find();
        res.status(200).send(eventData)
    } catch (err) {
        next(err);
    }
};

const createEvent = async (req, res, next) => {
    try {

        const { event_name, event_address, description } = req.body;

        if (!(event_name && event_address && description)) {
            res.status(400).send("All input is required");
        }

        const event = new Events({
            event_name, event_address, description
        });

        const eventData = await event.save();

        const allEventData = await Events.find({});
        res.status(200).json(allEventData)

    } catch (e) {
        next(e)
    }
}

const deleteEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const findId = await Events.find({ id });


        if (!findId) {
            res.status(400).send("record not avilable in data");
        }

        Events.findByIdAndRemove(id, async (err, doc) => {
            if (!err) {
                const allData = await Events.find({});
                res.status(200).json(allData)
            } else {
                res.status(400).send("record not avilable in data");
            }
        })

    } catch (error) {
        next(error)
    }
}


const editEvent = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { event_name, event_address, description } = req.body;

        const findId = await Events.findOne({ id });


        if (!findId) {
            res.status(400).send("record not avilable in data");
        }

        const updateEventData = await Events.findByIdAndUpdate({ _id: id }, {
            event_name,
            event_address,
            description
        }
        )

        const allData = await Events.find({});
        res.status(200).json(allData)

    } catch (error) {
        next(error)
    }
}


module.exports = { getEventData, createEvent, deleteEvent, editEvent }