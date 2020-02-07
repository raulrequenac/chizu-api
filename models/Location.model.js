const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  
})

const location = new mongoose.model('Location', locationSchema)

module.exports = location
