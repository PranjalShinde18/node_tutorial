const express = require('express');

const router = express.Router();

const Student = require('../models/Student');

const { generateToken, jwtAuthMiddleware } = require('./../jwt');
const { json } = require('body-parser');



router.post('/signUp', async (req, res) => {

    try {
        const data = req.body;

        const newStudent = new Student(data);

        const response = await newStudent.save();

        const payload = {
            id: response.id,
            username: response.username
        }

        const token = generateToken(payload);

        console.log('Student data saved successfully');
        res.status(200).json({ response: response, token: token });

    } catch (err) {
        console.log('Error saving data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

}
);

router.post('/signIn', async (req, res) => {

    try {

        const { username, password } = req.body;

        const user = await Student.findOne({ username: username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid details' })
        }

        const payload = {
            id: user.id,
            username : user.username
        }

        const token = generateToken(payload);

        return res.json({token})


    } catch (err) {
        console.log(err);
        return res.status(401), json({ error: 'Invalid details' })
    }

})


router.get('/', jwtAuthMiddleware, async (req, res) => {

    try {
        const response = await Student.find();

        console.log('Student data fetched successfully\n');
        res.status(200).json(response);

    } catch (err) {
        console.log('Error fetching data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

}
);

router.get('/profile', jwtAuthMiddleware, async (req,res) => {

    try{

        const userData = req.user;

        const userId = userData.id;

        const user = await Student.findById(userId);

        return res.status(200).json({user})
    }catch(err){
        console.log(err);
        return res.status(401).json({error : 'Internal Server Error'})
    }

})


router.get('/:passingYear', async (req, res) => {

    try {

        const passingYear = req.params.passingYear;

        if (passingYear === '2024' || passingYear === '2025' || passingYear === '2026') {

            const response = await Student.find({ passing_year: passingYear });
            console.log('Student data fetched successfully\n');
            res.status(200).json(response);

        }
        else {
            res.status(400).json({ error: 'Invalid passing year' })
        }

    } catch (err) {
        console.log('Error fetching data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

}
);

router.put("/:id", async (req, res) => {

    try {
        const studentId = req.params.id;
        const updatedStudentData = req.body;

        const response = await Student.findByIdAndUpdate(studentId, updatedStudentData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: 'Data not found' });
        }

        console.log('Student data updated successfully');
        res.status(200).json(response);

    } catch (err) {
        console.log('Error updating data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }


})


router.delete("/:id", async (req, res) => {

    try {
        const studentId = req.params.id;
        const response = await Student.findByIdAndDelete(studentId);

        if (!response) {
            return res.status(404).json({ error: 'Data not found' });
        }

        console.log('Student data deleted successfully');
        res.status(200).json('Data deleted.');

    } catch (err) {
        console.log('Error deleting data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

module.exports = router;

