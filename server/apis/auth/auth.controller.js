const Registration = require('./auth.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * 
 * Get user
 * @returns {Registration}
 */

const create = async (req, res, next) => {
    try {
        const { first_name, email, password } = req.body;

        if (!(email && password && first_name)) {
            res.status(400).send("All input is required");
        }

        const oldUser = await Registration.findOne({ email });

        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }

        encryptedPassword = await bcrypt.hash(password, 10);

        const userRegistration = new Registration({
            first_name,
            email,
            password: encryptedPassword
        });

        const token = jwt.sign(
            { userRegistration_id: userRegistration._id, email },
            process.env.TOKEN_KEY
        );

        userRegistration._doc.token = token;
        const savedUserRegistration = await userRegistration.save();
        res.status(200).json(savedUserRegistration)
    } catch (err) {
        next(err);
    }
};

const getAllRegistrationData = async (req, res, next) => {
    try {
        const userData = await Registration.find();
        res.status(200).send(userData)
    } catch (err) {
        next(err);
    }
};

const userLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).send({ error: "All input is required" });
        }

        const user = await Registration.findOne({ email });
        console.log("user", user);
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY
            );

            user.token = token;

            res.status(200).json(user);
        } else {
            res.status(400).send({ error: "Please Enter Valid Credentials" });
        }
    } catch (e) {
        next(e)
    }
}


module.exports = { create, getAllRegistrationData, userLogin };