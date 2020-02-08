const mongoose = require('mongoose')
const Schema = mongoose.Schema

const locationSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: [true, 'This name is already in use']
  },
  type: {
    type: String,
    enum: ['Point'],
    required: true,
    default: 'Point'
  },
  coordinates: {
    type: [Number],
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
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

locationSchema.pre('save', function (next) {
  if (!this.name){
    User.findById(this.user)
      .populate('locations')
      .then(user => {
        this.name = `Location ${user.locations.length+1}`
        next()
      })
      .catch(next)
  } else {
    next()
  }
});

const location = new mongoose.model('Location', locationSchema)

module.exports = location

