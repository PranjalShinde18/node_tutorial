const express = require('express')   // importing express.
const app = express();  // generally we use "app" for express but we can use any other name also.
const db = require('./db');
const Student = require('./models/Student');
const Course = require('./models/course');
const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

//Get the data.
app.get('/greeting', function (req, res) { // add /greeting to end of request url to get this method, req = request and res = response
    res.send('Welcome to the institute')
})

const studentRoutes = require('./routes/studentRoutes');
app.use('/student',studentRoutes);

const courseRoutes = require('./routes/courseRoutes');
app.use('/course',courseRoutes);

app.listen(3000, () => {
    console.log('Server is active on port 3000!')
})

