const Registration = require('./auth.model');

/**
 * 
 * Get user
 * @returns {Registration}
 */

async function create(req, res, next) {
    console.log("req", req);
    try {
        const { first_name, email, password } = req.body;

        if (!(email && password && first_name)) {
            res.status(400).send("All input is required");
        }

        const userRegistration = new Registration({
            first_name,
            email,
            password
        })
        const savedUserRegistration = await userRegistration.save();
        res.send(200).json(userRegistration)
    } catch (err) {
        console.log("auth error", err);
        next(err)
    }
}

async function getAllRegistrationData(req, res, next) {
    try {
        const userData = await Registration.find();
        res.status(200).send(userData)
    } catch (err) {
        console.log("auth err", err);
    }
}

module.exports = { create, getAllRegistrationData };