const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const app = express();

//importing routes
const userRoutes = require('./routes/userRouter.js')
const counselorRoutes = require('./routes/counselorRouter')

//adding middlewares
app.use(cors())
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//adding routes
app.use('/', (req, res) => {
    res.send('welcome to mocktherapy official api')
})
app.use('/user/', userRoutes);
app.use('/counselor/', counselorRoutes);

app.use('/', (req, res) => {
    res.send('hello world')
})

app.listen(process.env.PORT || 3000, () => console.log('server started'))