const jwt = require('jsonwebtoken');
const pool = require('./models/queries');

veify = (req, res, next) => {
    const token = req.headers["access-token"];
    if(!token) return res.status(401).send('Access Denied!')
    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next()
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
};

isClient = async(req, res, next) => {
    let client = await pool.query('SELECT role FROM users WHERE user_id = $1', [req.user_id]);
    if(client.rows[0] == 'client') return next();
    res.status(403).send('Requires Client Role')
};

isTherapist = async(req, res, next) => {
    let therapist = await pool.query('SELECT role FROM users WHERE user_id = $1', [req.user_id]);
    if(therapist.rows[0] == 'therapist') return next();
    res.status(403).send('Requires Therapist Role')
};


module.exports = {verify, isClient, isTherapist};