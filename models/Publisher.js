const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Publisher name is required'],
        trim: true
    },
    location: {
        type: String,
        required: [true, 'Location is required']
    },
    yearFounded: {
        type: Number,
        min: [1500, 'Year must be after 1500'],
        max: [new Date().getFullYear(), 'Year cannot be in the future']
    },
    website: {
        type: String,
        match: [/^https?:\/\/.+/, 'Please enter a valid URL']
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Publisher', publisherSchema);
