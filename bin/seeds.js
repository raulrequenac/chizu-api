const mongoose = require('mongoose');
const Columns = require('../models/Columns.model');
const Cards = require('../models/Cards.model');

const dbtitle = 'base-api';
mongoose.connect(`mongodb://localhost/${dbtitle}`);
Columns.collection.drop();
Cards.collection.drop();
