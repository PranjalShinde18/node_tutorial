const express = require('express');

const router = express.Router();

const Course = require('./../models/course');

router.post('/', async (req, res) => {

    try {
        const data = req.body;

        const newCourse = new Course(data);

        const response = await newCourse.save();

        console.log('Course data saved successfully \n');
        res.status(200).json(response);

    } catch (err) {
        console.log('Error saving data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }
}
);

router.get('/', async (req, res) => {
    try {
        const response = await Course.find();

        console.log('Course data fetched successfully \n');
        res.status(200).json(response);

    } catch (err) {
        console.log('Error fetching data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

})

router.get('/:duration', async (req, res) => {

    try {

        const duration = req.params.duration;

        if (duration === "1 Month" || duration === "3 Months" || duration === "6 Months") {

            const response = await Course.find({ duration: duration });
            console.log('Course data fetched successfully \n');
            res.status(200).json(response);
        } else {
            console.log('Invalid duration');
            res.status(400).json({ error: 'Invalid duration' })
        }
    }
    catch (err) {
        console.log('Error fetching data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

});


module.exports = router;