const express = require('express')   // importing express.
const app = express();  // generally we use "app" for express but we can use any other name also.

const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());  // req.body

const passport = require('./auth');
const localAuthMiddleware = passport.authenticate('local', { session: false })
app.use(passport.initialize());


require('dotenv').config();
const PORT = process.env.PORT;

const logRequest = (req, res, next) => {
    console.log(`Request made at : [${new Date().toLocaleString()}]\n`);
    next();
}
app.use(logRequest);

app.get('/', function (req, res) {
    res.send('Welcome to the institute')
})

const studentRoutes = require('./routes/studentRoutes');
app.use('/student', studentRoutes);

const courseRoutes = require('./routes/courseRoutes');
app.use('/course', courseRoutes);


app.listen(PORT, () => {
    console.log('Server is active!')
})