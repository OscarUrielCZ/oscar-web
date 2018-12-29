'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ProjectSchema = Schema({
  name: String,
  description: String,
  year: Number,
  technologies: String,
  image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
