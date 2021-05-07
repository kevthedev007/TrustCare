const pool = require('../models/queries');
const { therapistValidation } = require('../validation')

const therapistController = {
    therapistSurvey: async(req, res) => {
        const { error } = therapistValidation(req.body);
        if(error) return res.json(error.details[0].message);

        const { firstname, lastname, d_o_b, gender, phone_no, gender_preference, specialty, state_of_residence, about_me } = req.body;

        //insert into client database
        try {
        const info = await pool.query('INSERT INTO therapists (user_id, firstname, lastname, d_o_b, gender, phone_no, gender_preference, specialty, state_of_residence, about_me) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)', [req.user._id, firstname, lastname, d_o_b, gender, phone_no, gender_preference, specialty, state_of_residence, about_me]);
        const changeStat = await pool.query('UPDATE users SET survey = $1 WHERE user_id = $2', [true, req.user._id])
        res.send('successful');
        } catch(err) {
            res.send(err)
        }
    },

    profile: async(req, res) => {
        const therapistDetails = await pool.query('SELECT * FROM therapists WHERE user_id = $1', [req.user._id]);
        const checkClients = await pool.query('SELECT * FROM match where therapist_id = $1', [req.user._id]);
        if(checkTherapist.rows) {

        }
        res.json({therapistDetails})
    }
}



module.exports = therapistController;

