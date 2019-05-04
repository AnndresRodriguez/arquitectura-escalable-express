const express = require('express');
const User = require('../../models/User');
const httpMessages = {

  onValidationError: {
    success: false,
    message: 'Por favor ingrese el correo y la contraseña'
  },
  onUserSaveError: {
    success: false,
    message: 'Este correo ya está registrado'
  },
  onUserSaveSuccess: {
    success: true,
    message: 'Nuevo Usuario Creado'
  }
}

// Register new users
function registerUser(request, response) {
    let { email, password } = request.body;
    if (!email || !password) {
      response.json(httpMessages.onValidationError);
    } else {
      let newUser = new User({
        email: email,
        password: password
      });
      // Attempt to save the user
      newUser.save(error => {
        if (error) {
          return response.json(httpMessages.onUserSaveError);
        }
        response.json(httpMessages.onUserSaveSuccess);
      });
    }
  }
  module.exports = {
    registerUser: registerUser
  };