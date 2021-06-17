const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
	userType: { type: String, default: "Admin" },
	name: { type: String, required: true },
	googleId: { type: Number },
	email: {
		type: String,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
	},
	name: {
        type: String,
        default: '',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },
    surname: {
        type: String,
        default: '',
        trim: true,
        set: text => text.charAt(0).toUpperCase() + text.substring(1)
    },
	password: { type: String },

	mobileNumber: {
		type: Number,
		match: /^([7-9][0-9]{9})$/g,
	},
	quizzes: [
		{
			quizId: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" },
		},
	],
	token: {
		type: String,
	},
    jobOccupation: {
        type: String,
        default: 'unknown'
    },
    description: {
        type: String,
        default: 'unknown'
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b'
    },
    linkedin: String,
    website: String,
    youtube: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
	passResetKey: { type: String },
	passKeyExpires: { type: Number },
	verificationKey: { type: String },
	verificationKeyExpires: { type: Number },
	isEmailVerified: { type: Boolean, default: true },
});

module.exports = mongoose.model("Teacher", adminSchema);
