const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const _ = require('lodash');

module.exports = function() {
  let server = express(),
      create,
      start;
   create = function(config, db) {
       let routes = require('./routes');
       // Server settings
       server.set("port", process.env.PORT || 3000);
       // Returns middleware that parses json
       server.use(bodyParser.json());
       server.use(bodyParser.urlencoded({ extended: false }));
       server.use(cookieParser());
       server.use(logger('dev'));
       server.use(passport.initialize());
       mongoose.connect(db.database, {useNewUrlParser: true});
       require('../configs/passport')(passport);
       // Set up routes
       routes.init(server);
   };
   start = function() {
        server.listen(server.get("port"), () => {
        console.log("Server on port", server.get("port"));
      });
      
    };
    return {
       create: create,
       start: start
    };
};
