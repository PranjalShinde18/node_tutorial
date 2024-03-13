const mongoose = require('mongoose');

// Define the person schema

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    roll_no: {
        type: String,
        required: true,
        unique: true
    },
    passing_year: {
        type: String,
        enum: ['2024', '2025', '2026'],
        required: true
    },
    mobile_no: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }

});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;