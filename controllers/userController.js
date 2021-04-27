const pool = require('../models/queries');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: 'themocktherapysite@gmail.com', // generated ethereal user
      pass: ' mocktherapy', // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

const userController = {

    postRegister: async function(req, res) {
        const { error } = registerValidation(req.body);
        if(error) return res.json(error.details[0].message);

        const username = req.body.username.toLowerCase();
        const email = req.body.email.toLowerCase();
        const password = req.body.password.toLowerCase();
        const password2 = req.body.password2.toLowerCase();

        //check if email exists in database already
        const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(checkEmail.rows[0]) return res.json('email already exists');

        //check if username exists
        const checkUsername = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
        if(checkUsername.rows[0]) return res.json('username already exists');
       
        //confirm password
        if(password !== password2) return res.json('password does not match')

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //Create confirmation code with email token
        const token = jwt.sign({email: email}, 'sasuke007');
       
        //save to database
        try {
            const savedUser = await pool.query('INSERT INTO users (username, email, password, confirmation_code) VALUES ($1, $2, $3, $4)', [username, email, hashPassword, token]);

             //SENDING ACTIVATION MAIL
             let mailTransport = {
                from: '"noreply@gmail.com" <themocktherapysite@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Account Activation", // Subject line
                html: ` <h1>Email Confirmation</h1>
                        <h2>Hello ${username}</h2>
                        <p>Thank you for subscribing. Please confirm email by clicking on the link below</p>
                        <a href=https://mocktherapy.herokuapp.com/user/confirmation/${token}>Click here</a>`, // html body
              };
        
              transporter.sendMail(mailTransport, (error, info) => {
                  if(error) console.log(error);
                  res.send('Mail has been sent to your email')
              });

        } catch(err) {
            res.status(400).send(err)
        }
    },

    Confirmation: async function(req, res) {
        try {
            let confirmationCode = req.params.token;
            let user = await pool.query('SELECT * FROM users WHERE confirmation_code = $1', [confirmationCode]);
            if(!user.rows[0]) return res.status(400).send('User Not found')

            //if user exist, change isVerified to true
            const isVerified = await pool.query('UPDATE users SET is_verified = $1 WHERE confirmation_code = $2', [true, confirmationCode ])
            res.json('http://localhost:3000/loginClient');
        } catch(err) {
            res.send(err)
        }
    },

    postLogin: async function(req, res) {
        // const { error } = loginValidation(req.body);
        // if(error) return res.status(400).send(error.details[0].message);

        const email = req.body.email;
        const password = req.body.password;

        //check if email exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(!user.rows[0]) return res.json('Email or password is wrong')
        
        //check if password is correct
        const validPass = await bcrypt.compare(password, user.rows[0].password);
        if(!validPass)  return res.json('Invalid password');
        
        //assign jwt token
        const token = jwt.sign({_id: user.rows[0].user_id }, 'sasuke007');
        console.log(token)
        res.cookie('auth_token', token, {maxAge: 3600 * 1000 * 24 * 365, httpOnly: false});
        res.send('logged in')
    },

    logout: function(req, res) {
        res.clearCookie('auth_token')
        res.send('logout successful!')
    }
}



module.exports = userController;