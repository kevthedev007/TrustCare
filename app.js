const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

//importing routes
const userRoutes = require('./routes/userRouter.js')
const counselorRoutes = require('./routes/counselorRouter')


//adding middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//adding routes
app.use('/user/', userRoutes);
app.use('/counselor/', counselorRoutes);

app.listen(3000, () => console.log('server started'))