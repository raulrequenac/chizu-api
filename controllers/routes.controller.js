const Route = require('../models/Route.model')

module.export.addRoute = (req, res, next) => {
  const route = new Route({...req.body, user: req.currentUser.id})

  route.save()
    .then(route => res.status(201).json(route))
    .catch(next)
}

module.export.editRoute = (req, res, next) => {
  Route.findByIdAndUpdate(req.params.routeId, req.body, {new: true})
    .then(route => res.status(200).json(route))
    .catch(next)
}

module.export.deleteRoute = (req, res, next) => {
  Route.findByIdAndRemove(req.params.routeId)
    .then(() => {
      res.status(200).json()
    })
    .catch(next);
}
