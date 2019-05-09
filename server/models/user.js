const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const moment = require('moment');
require('dotenv').config();
const SALT_I = 10;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    maxlength: 100
  },
  lastname: {
    type: String,
    required: true,
    maxlength: 100
  },
  cart: {
    type: Array,
    default: []
  },
  history: {
    type: Array,
    default: []
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  resetToken: {
    type: String
  },
  resetTokenExp: {
    type: Number
  }
});

userSchema.pre('save', function (next) {
  let user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(SALT_I,function (err,salt) {
      if(err) return next(err);

      bcrypt.hash(user.password, salt, function (err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
      })
    })

  } else next();
});

userSchema.methods.comparePassword = function (candidatePassword,cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if(err) return cb(err);
    cb(null, isMatch)
  })
};

userSchema.methods.generateToken = function (cb) {
  let user = this;
  user.token = jwt.sign(user._id.toHexString(), process.env.SECRET);
  user.save(function (err,user) {
    if(err) return cb(err);
    cb(null,user)
  })
};

userSchema.methods.generateResetToken = function(cb){
  let  user = this;
  crypto.randomBytes(20, function (err, buf) {
    let today = moment().startOf('day').valueOf();
    let tomorrow = moment(today).endOf('day').valueOf();

    user.resetTokenExp = tomorrow;
    user.resetToken = buf.toString('hex');
    user.save(function (err,user) {
      if(err) return cb(err);
      cb(null,user);
    })
  })
};

userSchema.statics.findByToken = function (token, cb) {
  let user = this;
  jwt.verify(token, process.env.SECRET, function (err, decode) {
    user.findOne({"_id": decode, "token": token}, function (err, user) {
      if(err) return cb(err);

      cb(null, user);
    })
  })
};

const User = mongoose.model('User', userSchema);

module.exports = { User };