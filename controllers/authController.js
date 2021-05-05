const pool = require('../models/queries');
const { registerValidation, loginValidation } = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER, // generated ethereal user
      pass: process.env.SECRET_KEY, // generated ethereal password
    },
    tls: {
        rejectUnauthorized: false
    }
  });

const userController = {

    postRegister: async function(req, res) {
        const { error } = registerValidation(req.body);
        if(error) return res.json(error.details[0].message);

        const email = req.body.email.toLowerCase();
        const password = req.body.password;
        const password2 = req.body.password2;
        const role = req.body.role.toLowerCase();

        //check if email exists in database already
        const checkEmail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(checkEmail.rows[0]) return res.json('email already exists');
   
        //confirm password
        if(password !== password2) return res.json('password does not match')

        //hashing password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //Create confirmation code with email token
        const token = jwt.sign({email: email}, process.env.SECRET_KEY);
       
        //save to database
        try {
            const savedUser = await pool.query('INSERT INTO users (email, password, role, confirmation_code) VALUES ($1, $2, $3, $4)', [email, hashPassword, role, token]);

             //SENDING ACTIVATION MAIL
             let mailTransport = {
                from: '"noreply" <themocktherapysite@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Account Activation", // Subject line
                html: ` <h1>Email Confirmation</h1>
                        <h2>Hello ${email}</h2>
                        <p>Thank you for subscribing. Please confirm email by clicking on the link below</p>
                        <a href=https://mocktherapy.herokuapp.com/user/confirmation/${token}>Click here</a>`, // html body
              };
        
              transporter.sendMail(mailTransport, (error, info) => {
                  if(error) console.log(error);
                  res.send('A verification link has been sent to your email')
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
            res.redirect('http://localhost:3000/login');
        } catch(err) {
            res.send(err)
        }
    },

    postLogin: async function(req, res) {

        const email = req.body.email.toLowerCase();
        const password = req.body.password;

        //check if email exists
        const user = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(!user.rows[0]) return res.json('Email or password is wrong')
        
        //check if user is confirmed/verified
        if(user.rows[0].is_verified == false) return res.json('Please check your email to verify your account');

        //check if password is correct
        const validPass = await bcrypt.compare(password, user.rows[0].password);
        if(!validPass)  return res.json('Invalid password');
        
        //assign jwt token
        const token = jwt.sign({_id: user.rows[0].user_id }, process.env.SECRET_KEY);
    
        res.json({user: user.rows[0].map(user => {
            return {
                email: user.email,
                role: user.role,
                survey: user.survey
            }
        }), token: token});
    },

    forgot_password: async(req, res) => {
        const email = req.body.email.toLowerCase();
        
        //check email
        const checkMail = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if(!checkMail.rows[0]) return res.json('Account does not exist');

        //user exists and now create a one-time link valid for 10 minutes
        const secret = checkMail.rows[0].password + process.env.SECRET_KEY;
        const token = jwt.sign({_id: checkMail.rows[0].user_id }, secret, {expiresIn: '10m'});

        //send mail
        try {
            let mailTransport = {
                from: '"noreply" <themocktherapysite@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Reset Password", // Subject line
                html: ` <h1>Password Reset</h1>
                        <h2>Hello ${email}</h2>
                        <p>Please click on the one-time link blow to reset your password. link is valid for 10 minutes</p>
                        <a href=https://mocktherapy.herokuapp.com/user/reset-password/${checkMail.rows[0].user_id }/${token}>Click here</a>`, // html body
              };
        
              transporter.sendMail(mailTransport, (error, info) => {
                  if(error) console.log(error);
                  res.send('Password reset link has been sent to your email')
              });

            } catch(err) {
                return res.send(err)
         }


    },

    reset_password: async(req, res) => {
        const {id, token} = req.params;

        //check if this id exists in database
        const user = await pool.query('SELECT * FROM users where user_id = $1', [id]);
        if(!user.rows[0]) return res.json('Invalid user');

        //for valid user with id
        const secret = user.rows[0].password + process.env.SECRET_KEY;
        try {
            const payload = jwt.verify(token, secret);
            res.redirect(`http://localhost:3000/reset-password/${id}/${token}`)
        } catch(err) {
           res.send(err)
        }
    },

    change_password: async(req, res) => {
        const {id, token} = req.params;
        const {password, password2} = req.body;

        //check if this id exists in database
        const user = await pool.query('SELECT * FROM users where user_id = $1', [id]);
        if(!user.rows[0]) return res.json('Invalid user');

        //compare passwords
        if(password !== password2) return res.json('Password does not match');

        const secret = user.rows[0].password + process.env.SECRET_KEY;
        try {
            const payload = jwt.verify(token, secret);
            //encrpyt password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            //insert new password into database
            const newPassword = await pool.query('UPDATE users SET password = $1 WHERE user_id = $2', [hashedPassword, id]);
            res.redirect('http://localhost:3000/login')
        } catch(err) {
            res.send(err);
        }
    },

    resend_mail: async(req, res) => {
        const email = req.body.email.toLowerCase();

        const mailExist = await pool.query('SELECT * FROM users WHERE email = $1', [email])
        if(!mailExist.rows[0]) return res.json('Account does not exist');

        //if account is already verified
        if(mailExist.rows[0].is_verified === true) return res.json('Your account has already been verified')

        //Create confirmation code with email token
        const token = jwt.sign({email: email}, process.env.SECRET_KEY);

        try {
            const changeCODE = await pool.query('UPDATE users SET confirmation_code = $1 WHERE email = $2', [token, email])
             //SENDING ACTIVATION MAIL
             let mailTransport = {
                from: '"noreply" <themocktherapysite@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Account Activation", // Subject line
                html: ` <h1>Email Confirmation</h1>
                        <h2>Hello ${email}</h2>
                        <p>Thank you for subscribing. Please confirm email by clicking on the link below</p>
                        <a href=https://mocktherapy.herokuapp.com/user/confirmation/${token}>Click here</a>`, // html body
              };
        
              transporter.sendMail(mailTransport, (error, info) => {
                  if(error) console.log(error);
                  res.send('A verification link has been sent to your email')
              });

        } catch(err) {
            res.status(400).send(err)
        }
    }

   
}



module.exports = userController;