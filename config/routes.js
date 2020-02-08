const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const usersController = require('../controllers/users.controller')
const locationsController = require('../controllers/locations.controller')
const routesController= require('../controllers/routes.controller')

router.get('/', controller.base);

router.post('/users/register', usersController.register)
router.get('/users/:validateToken/validate', usersController.validate)
router.patch('/users/edit', usersController.edit)
router.post('/users/delete', usersController.delete)
router.post('/users/login', usersController.login)
router.post('/users/socialLogin', usersController.socialLogin)
router.post('/users/logout', usersController.logout)

router.post('/users/addLocation', locationsController.addLocation)
router.patch('/users/editLocation/:locationId', locationsController.editLocation)
router.post('/users/deleteLocation/:locationId', locationsController.deleteLocation)

router.post('/users/addRoute', routesController.addRoute)
router.patch('/users/editRoute/:routeId', routesController.editRoute)
router.post('/users/deleteRoute/:routeId', routesController.deleteRoute)

module.exports = router;
