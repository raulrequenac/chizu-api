const Location = require('../models/Location.model')

module.exports.addLocation = (req, res, next) => {
  const location = new Location({...req.body, user: req.currentUser.id})

  location.save()
    .then(location => res.status(201).json(location))
    .catch(next)
}

module.exports.editLocation = (req, res, next) => {
  Location.findByIdAndUpdate(req.params.locationId, req.body, {new: true})
    .then(location => res.status(200).json(location))
    .catch(next)
}

module.exports.deleteLocation = (req, res, next) => {
  Location.findByIdAndRemove(req.params.locationId)
    .then(() => {
      res.status(200).json()
    })
    .catch(next);
}
