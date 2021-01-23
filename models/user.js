const mongoose = require('mongoose');
const { Schema } = mongoose;
const bycrpt = require('bcryptjs')


const userSchema = new Schema({

    username: {
        type: String,
        unique: true,
        required: true,
        maxlength: 140,
        minlength: 8,
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        maxlength: 140,
        required: true,
    },
    Blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'blog',
    }],

    Following: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }],
    Followers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    }]






});

userSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    return obj;
}


userSchema.pre('save', function preSave(next) {
    this.password = bycrpt.hashSync(this.password, 8);
    next();
})

userSchema.pre('findOneAndUpdate', function preSave(next) {

    if (!this._update.password) {
        return;
    }
    this._update.password = bycrpt.hashSync(this._update.password, 8);
    next();
})

userSchema.methods.validatePassword = function validatePassword(password) {
    
   
    return bycrpt.compareSync(password, this.password);


}


userModel = mongoose.model('user', userSchema);
module.exports = userModel;


