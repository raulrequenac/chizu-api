const createError = require('http-errors');
const mongoose = require('mongoose');

module.exports.base = (_, res) => {
  res.json({});
};
