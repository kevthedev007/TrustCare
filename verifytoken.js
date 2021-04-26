const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    const token = req.cookies.auth_token;
    console.log(token);
    if(!authtoken) return res.status(400).send('Access Denied!')

    try {
        const user = jwt.verify(token, process.env.SECRET_KEY);
        req.user = user;
        next()
    } catch(err) {
        res.status(400).send('Invalid Token');
    }
};

