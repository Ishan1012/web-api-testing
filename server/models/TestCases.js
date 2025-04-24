const mongoose = require('mongoose');

const testCaseSchema = new mongoose.Schema({
  name: String,
  method: String,
  url: String,
  expectedStatus: Number,
  expectedBody: Object,
  lastRun: {
    status: String,
    message: String,
    timestamp: Date,
    responseTime: Number
  }
});

module.exports = mongoose.model('TestCase', testCaseSchema);