const pool = require('../models/queries');
const { therapistValidation } = require('../validation')

const therapistController = {
    therapistSurvey: async(req, res) => {
        const { error } = therapistValidation(req.body);
        if(error) return res.json(error.details[0].message);

        const { firstname, lastname, age, gender, phone_no, gender_preference, specialty, state_of_residence, client_limit, about_me } = req.body;

        //insert into client database
        try {
        const info = await pool.query('INSERT INTO clients (user_id, firstname, lastname, hello, gender, phone_no, gender_preference, specialty, state_of_residence, client_limit, about_me) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)', [req.user._id, firstname, lastname, hello, gender, phone_no, gender_preference, specialty, state_of_residence, client_limit]);
            res.redirect()
        } catch(err) {
            res.send(err)
        }
    },



}

module.exports = therapistController;