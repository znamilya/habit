const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const ActivitySchema = new Schema({
    year: {
        type: Number,
        required: true,
    },
    month: {
        type: Number,
        required: true,
    },
    days: [Number],
})

const HabitSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    activities: {
        type: [ActivitySchema],
    },
})



module.exports = mongoose.model('Habit', HabitSchema);
