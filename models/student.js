const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        unique: true
    }

});

studentSchema.pre('save', async function (next) {

    const student = this;

    if (!student.isModified('password')) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(student.password, salt);
        student.password = hashedPassword;
        next();
    } catch (err) {
        return next(err);
    }
})

studentSchema.methods.comparePassword = async function (candidatePassword) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch (err) {
        throw err;
    }
}

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;