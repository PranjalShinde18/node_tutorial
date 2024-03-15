const mongoose = require('mongoose');

// Define the course schema

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    course_code: {
        type: String,
        required: true,
        unique: true
    },
    duration: {
        type: String,
        enum: ['1 Month', '3 Months', '6 Months'],
        required: true
    },
    fees: {
        type: Number,
        default: 0
    },
    perks: {
        type: [String],
        default: []
    }

});

const Course = mongoose.model('course', courseSchema);

module.exports = Course;