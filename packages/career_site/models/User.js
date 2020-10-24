const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bcrypt = require('bcryptjs')
const SALT_WORK_FACTOR = 10;

var UserSchema = new Schema({
    email: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    fullName: { type: String, required: true }
    // sessionKey: { type: String, required: true }
});

UserSchema.pre('save', function(next) {
    if(!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hashSync(this.password, SALT_WORK_FACTOR);
    next();
});

UserSchema.methods.comparePassword = function(plaintext) {
    return bcrypt.compareSync(plaintext, this.password);
};

// UserSchema.methods.comparePassword = function(plaintext, callback) {
//     return callback(null, bcrypt.compareSync(plaintext, this.password));
// };

module.exports = mongoose.model('UserLogin', UserSchema);