const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');   // hashes password
const validator = require('validator'); // validates email and password field
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// static signup method
userSchema.statics.signup = async function(email, password) {

    // validation
    if (!email || !password) {
        throw Error('All fields must be filled');
    }
    if (!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)) {
        throw Error('Password not strong enough, requires one uppercase, one lowercase, one number, one symbol, and at least 8 characters long');
    }

    const exists = await this.findOne({ email }); 

    if (exists){
        throw Error('Email already in use');
    }

    // hashing password in case of password breach, uses bcrpyt
    const salt = await bcrpyt.genSalt(10);
    const hash = await bcrpyt.hash(password, salt);

    const user = await this.create({ email, password: hash });

    return user;

}

// static login method
userSchema.statics.login = async function(email, password) {
    // checks if both fields are filled
    if (!email || !password) {
        throw Error('All fields must be filled');
    }

    const user = await this.findOne({ email }); 

    if (!user){
        throw Error('Invalid email address');
    }

    const match = await bcrpyt.compare(password, user.password);

    if (!match){
        throw Error('Invalid password');
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);