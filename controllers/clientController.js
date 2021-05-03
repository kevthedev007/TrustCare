const pool = require('../models/queries');
const { clientValidation } = require('../validation')

const clientController = {
    clientSurvey: async(req, res) => {
        const { error } = clientValidation(req.body);
        if(error) return res.json(error.details[0].message);

        const { firstname, lastname, age, gender, gender_preference, issue, previous_therapy } = req.body;

        //insert into client database
        try {
        const info = await pool.query('INSERT INTO clients (user_id, firstname, lastname, age, gender, gender_preference, issue, previous_therapy) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)', [req.user._id, firstname, lastname, age, gender, gender_preference, issue, previous_therapy]);
            res.redirect();
        } catch(err) {
            res.send(err)
        }
    },

    sendTherapists: async(req, res) => {
        const match = await pool.query

    }


}

module.exports = clientController;