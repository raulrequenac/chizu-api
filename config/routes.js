const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const usersController = require('../controllers/users.controller')
const locationsController = require('../controllers/locations.controller')
const routesController = require('../controllers/routes.controller')
const businessController = require('../controllers/business.controller')

router.get('/', controller.base);

router.post('/register', usersController.register)
router.get('/validate/:validateToken', usersController.validate)
router.patch('/edit', usersController.edit)
router.post('/delete', usersController.delete)
router.post('/login', usersController.login)
router.post('/socialLogin', usersController.socialLogin)
router.post('/logout', usersController.logout)

router.post('/addLocation', locationsController.addLocation)
router.patch('/editLocation/:locationId', locationsController.editLocation)
router.post('/deleteLocation/:locationId', locationsController.deleteLocation)

router.post('/addRoute', routesController.addRoute)
router.patch('/editRoute/:routeId', routesController.editRoute)
router.post('/deleteRoute/:routeId', routesController.deleteRoute)

module.exports = router;
