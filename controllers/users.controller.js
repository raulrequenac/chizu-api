const User = require('../models/User.model')
const mailer = require('../config/mailer.config');
const passport = require('passport');
const createError = require('http-errors');

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch()
}

module.exports.register = (req, res, next) => {
  const user = new User(req.body)

  user.save()
    .then(user => {
      mailer.sendValidateEmail(user)
      res.status(201).json(user)
    })
    .catch(next)
}

module.exports.validate = (req, res, next) => {
  User.findOneAndUpdate({validateToken: req.params.validateToken}, {validated: true}, {new: true})
    .then(user => res.status(200).json(user))
    .catch(next)
}

module.exports.edit = (req, res, next) => {
  const {
    name,
    email,
    password,
    image
  } = req.body
  
  User.findById(req.currentUser.id)
    .populate('routes')
    .then(user => {
      if (name) user.name = name
      if (email) user.email = email
      if (password) user.password = password
      if (image) user.image = image
      user.save()
      res.status(200).json(user)
    })
    .catch(next)
}

module.exports.delete = (req, res, next) => {
  User.findOneAndRemove()
    .then(res.status(200).json())
    .catch()
  User.findByIdAndRemove(req.currentUser.id)
    .then(() => {
      req.session.destroy()
      res.clearCookie("connect.sid")
      res.status(200).json()
    })
    .catch(next);
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    throw createError(400, 'missing credentials');
  }

  User.findOne({ email: email })
    .populate('routes')
    .then(user => {
      if (!user) {
        throw createError(404, 'user not found');
      } else {
        return user.checkPassword(password)
          .then(match => {
            if (!match) {
              throw createError(400, 'invalid password');
            } else if (user.validated){
              req.session.user = user;
              res.cookie('foo', 'bar')
              res.json(user)
            } else {
              throw createError(403, 'user is not validated')
            }
          })
      }
    })
    .catch(next);
}

module.exports.socialLogin = (req, res, next) => {
  passport.authenticate('google-users', (error, user) => {
    if (error) {
      next(error);
    } else {
      req.session.user = user;
      res.json(user)
    }
  })(req, res, next);
}

module.exports.logout = (req, res) => {
  req.session.destroy()
  res.clearCookie("connect.sid")
  res.status(204).json();
}
