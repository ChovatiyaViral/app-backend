const Registration = require('./auth.model');

/**
 * 
 * Get user
 * @returns {Registration}
 */

async function create(req, res, next) {
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
        next(err);
    }
};

async function getAllRegistrationData(req, res, next) {
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
            res.status(400).send("All input is required");
        }

        const user = await Registration.findOne({ email });

        if (user && (await compare(password, user.password))) {
            const token = jwt.sign(
                { user_id: user._id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;

            res.status(200).json(user);
        }

        res.status(400).send("Invalid Credentials");

    } catch (e) {

    }
}


module.exports = { create, getAllRegistrationData, userLogin };