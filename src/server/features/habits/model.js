const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const HabitSchema = new Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    activities: [Number],
})


HabitSchema.pre('save', next => {
    this.activities = [];

    next();
});



module.exports = mongoose.model('Habit', HabitSchema);
