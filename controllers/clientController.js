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
        const changeStat = await pool.query('UPDATE users SET survey = $1 WHERE user_id = $2', [true, req.user._id])
            res.json('successful');
        } catch(err) {
            res.send(err)
        }
    },

    sendTherapists: async(req, res) => {
        const match = await pool.query('SELECT therapist.user_id, therapist.firstname, therapist.lastname, therapist.gender, therapist.specialty, therapist.about_me, therapist.client_limit FROM clients JOIN therapists ON client.gender_preference = therapist.gender_preference AND client.specialty = ANY(therapist.specialty) WHERE client.user_id = $1', [req.user._id]);
        res.json(match.rows);
    },

    pickTherapist: async(req, res) => {
        const id = req.body.therapist_id;

        const addToTable = await pool.query('INSERT INTO match (client_id, therapist_id) VALUES ($1, $2)', [req.user._id, id]);
        //increment the therapist limit
        const limit = await pool.query('UPDATE therapists SET client_limit = client_limit + 1 WHERE user_id = $1', [id]);

        res.json(addToTable.rows[0].therapist_id);
    },

    client_profile: async(req, res) => {
        const clientDetails = await pool.query('SELECT * FROM clients WHERE user_id = $1', [req.user._id]);
        const checkTherapist = await pool.query('SELECT * FROM match where client_id = $1', [req.user._id]);
        if(checkTherapist.rows[0]) {
            const therapistID = checkTherapist.rows[0].therapist_id;
            const getName = await pool.query('SELECT firstname, lastname FROM therapists WHERE user_id = $1', [therapistID]);
            res.json({clientDetails, getName})
        }
        res.json({clientDetails})
    }
}

module.exports = clientController;