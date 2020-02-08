const mongoose = require('mongoose')
const Schema = mongoose.Schema

const routeSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  locations: [{
      type: {
        type: String,
        enum: ['Point'],
        required: true,
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        required: true
      }
  }]
}, {
  timestamps:true,
  toJSON: {
    transform: (res, ret) => {
      ret.id = res._id
      delete ret._id
      delete ret.__v
      return ret
    }
  }
})

routeSchema.pre('save', function (next) {
  User.findById(this.user)
    .populate('routes')
    .then(user => this.name = `Route ${user.routes.length+1}`)
    .catch(next)
});

const route = new mongoose.model('Route', routeSchema)

module.exports = route
