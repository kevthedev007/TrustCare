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
const { METHODS } = require('http');

//adding middlewares
var corsOption = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
    methods: "GET, POST"
}

app.use(cors(corsOption))
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//adding routes
app.use('/home', (req, res) => {
    res.send('welcome to mocktherapy official api')
})
app.use('/user/', authRoutes);


app.listen(process.env.PORT || 3000, () => console.log('server started'))