const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    googleId: {
        type: String,
    },
    name: { type: String },
    username: {
        type: String,
        required: true,
        unique: true
    },
    userType: { type: String, default: "User" },
    email: {
        type: String,
        lowercase: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
    },
    mobileNumber: {
        type: Number,
        match: /^([0-9]{8})$/g,
    },
    password: { type: String, required: true },
    quizzesGiven: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
            marks: { type: Number },
            responses: [],
            timeEnded: { type: Number },
            timeStarted: { type: Number }
        },
    ],
    quizzesStarted: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        },
    ],
    quizzesEnrolled: [
        {
            quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
        },
    ],
    token: {
        type: String,
    },
    role: {
        type: String,
        enum: ['Student', 'Teacher', 'Admin'],
        default: 'Student'
    },
    imageUrl: {
        type: String,
        default: 'https://www.cmcaindia.org/wp-content/uploads/2015/11/default-profile-picture-gmail-2.png'
    },
    favCourses: [{
        type: mongoose.Types.ObjectId,
        ref: 'Course'
    }],
    favTeachers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Teacher'
    }],
    passResetKey: { type: String },
    passKeyExpires: { type: Number },
    verificationKey: { type: String },
    verificationKeyExpires: { type: Number },
    isEmailVerified: { type: Boolean, default: true },
});

module.exports = mongoose.model("User", userSchema);
