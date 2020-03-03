const express = require('express');
const router = express.Router();
const passport = require('passport')
const controller = require('../controllers/base.controller')
const usersController = require('../controllers/users.controller')
const locationsController = require('../controllers/locations.controller')
const routesController = require('../controllers/routes.controller')
const upload = require('./cloudinary.config')

router.get('/', controller.base);

router.get('/users', usersController.getUsers)
router.post('/users/register',upload.single('image'), usersController.register)
router.get('/users/validate/:validateToken', usersController.validate)
router.patch('/users/edit', usersController.edit)
router.post('/users/delete', usersController.delete)

router.post('/login', usersController.login)
router.post('/login/google/users', passport.authenticate('google-users', { scope: ['openid', 'profile', 'email'] }))
router.get('/login/google/users/callback', usersController.socialLogin)
router.post('/logout', usersController.logout)

router.post('/locations/add', locationsController.addLocation)
router.patch('/locations/edit/:locationId', locationsController.editLocation)
router.post('/locations/delete/:locationId', locationsController.deleteLocation)

router.post('/routes/add', routesController.addRoute)
router.patch('/routes/edit/:routeId', routesController.editRoute)
router.post('/routes/delete/:routeId', routesController.deleteRoute)

module.exports = router;
