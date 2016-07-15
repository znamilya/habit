const mongoose = require('mongoose');
const crypto   = require('crypto');
const Schema   = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
});


UserSchema.statics.createHash = (password) => {
    return crypto.createHash('sha512').update(password).digest('hex');
}


module.exports = mongoose.model('User', UserSchema);
