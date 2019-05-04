const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['Client', 'Manager', 'Admin'],
    default: 'Client'
  }
});
UserSchema.pre('save', function(next) {
  let user = this;
   if (this.isModified('password') || this.isNew) {
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          console.log(err);
          return next(err);
        }
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) {
            console.log(err);
            return next(err);
          }
          user.password = hash;
          next();
        });
      });
  } else {
    return next();
  }
});

// Metodo creado para comparar la contraseña ingresada con la contraseña 
// Guardada en la base de datos
UserSchema.methods.comparePassword = (pw, cb) => {
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};
module.exports = mongoose.model('User', UserSchema);