const passport = require("passport");
const passwordHash = require("password-hash");
const LocalStrategy = require("passport-local").Strategy;
const User = require('../models/user');

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password"
    },
    function(username, password, cb) {
      return User.findOne({ username })
        .then(user => {
          if (!user) {
            return cb(null, false, { message: "Incorrect username" });
          }

          if (passwordHash.verify(password, user.password)) {
            return cb(null, user, { message: "Logged In Successfully" });
          } else {
            return cb(null, false, { message: "Incorrect password" });
          }
        })
        .catch(err => cb(err));
    }
  )
);
