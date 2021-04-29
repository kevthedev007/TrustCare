const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

//importing routes
const authRoutes = require('./routes/authRoute');

//adding middlewares
// var corsOption = {
//     origin: '*',
//     optionsSuccessStatus: 200,
//     methods: "GET, POST"
// }

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//adding routes
app.use('/home', (req, res) => {
    res.send('welcome to mocktherapy official api')
})
app.use('/user/', authRoutes);


app.listen(process.env.PORT || 3000, () => console.log('server started'))