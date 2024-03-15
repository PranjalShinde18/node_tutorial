const express = require('express');

const router = express.Router();

const Student = require('./../models/student');

router.post('/', async (req, res) => {

    try {
        const data = req.body;

        const newStudent = new Student(data);

        const response = await newStudent.save();

        console.log('Student data saved successfully');
        res.status(200).json(response);

    } catch (err) {
        console.log('Error saving data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

}
);


router.get('/', async (req, res) => {

    try {
        const response = await Student.find();

        console.log('Student data fetched successfully');
        res.status(200).json(response);

    } catch (err) {
        console.log('Error fetching data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }

}
);


router.get('/:passingYear', async (req, res) => {

    try {

        const passingYear = req.params.passingYear;

        if (passingYear === '2024' || passingYear === '2025' || passingYear === '2026') {

            const response = await Student.find({ passing_year: passingYear });
            console.log('Student data fetched successfully');
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

router.put("/:id", async (req ,res) => {

    try{
        const studentId = req.params.id;
        const updatedStudentData = req.body;

        const response = await Student.findByIdAndUpdate(studentId, updatedStudentData,{
            new : true ,
            runValidators : true
        })

        if(!response){
            return res.status(404).json({error : 'Data not found'});
        }

        console.log('Student data updated successfully');
        res.status(200).json(response);

    }catch(err){
        console.log('Error updating data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }


})


router.delete("/:id", async (req ,res) => {

    try{
        const studentId = req.params.id;
        const response = await Student.findByIdAndDelete(studentId);

        if(!response){
            return res.status(404).json({error : 'Data not found'});
        }

        console.log('Student data deleted successfully');
        res.status(200).json('Data deleted.');

    }catch(err){
        console.log('Error deleting data : ', err);
        res.status(500).json({ error: 'Internal server Error' })
    }
})

module.exports = router;

