const express = require('express')   // importing express.
const app = express();  // generally we use "app" for express but we can use any other name also.
const db = require('./db');
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

require('dotenv').config();
const PORT = process.env.PORT;

//Get the data.
app.get('/greeting', function (req, res) { // add /greeting to end of request url to get this method, req = request and res = response
    res.send('Welcome to the institute')
})

const studentRoutes = require('./routes/studentRoutes');
app.use('/student',studentRoutes);

const courseRoutes = require('./routes/courseRoutes');
app.use('/course',courseRoutes);


app.listen(PORT, () => {
    console.log('Server is active!')
})

