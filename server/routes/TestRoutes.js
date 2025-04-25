const express = require('express');
const router = express.Router();
const axios = require('axios');
const TestCase = require('../models/TestCases');

router.post('/', async (req, res) => {
  const test = new TestCase(req.body);
  await test.save();
  res.send(test);
});

router.get('/', async (req, res) => {
  const tests = await TestCase.find();
  res.send(tests);
});

router.delete('/:id', async (req,res) => {
  try {
    await TestCase.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Test case deleted successfully' });
  } catch(e) {
    res.status(500).json({ message: 'Error deleting test case' });
  }
})

router.post('/run/:id', async (req, res) => {
  const test = await TestCase.findById(req.params.id);
  const start = Date.now();
  try {
    const response = await axios({ method: test.method, url: test.url });
    const passed = response.status === test.expectedStatus;
    const responseTime = Date.now() - start;

    test.lastRun = {
      status: passed ? "Passed" : "Failed",
      message: passed ? "Matched expected status" : "Unexpected status",
      responseTime,
      timestamp: new Date()
    };

    await test.save();
    res.send(test.lastRun);
  } catch (err) {
    test.lastRun = {
      status: "Failed",
      message: err.message,
      responseTime: Date.now() - start,
      timestamp: new Date()
    };
    await test.save();
    res.send(test.lastRun);
  }
});

module.exports = router;
