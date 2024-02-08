// routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create student
router.post('/', async (req, res) => {
    console.log("/");
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).send(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).send('Failed to create student.');
  }
});

// Get student by roll number
router.get('/:rollNumber', async (req, res) => {
    console.log("/roll");
  try {
    const student = await Student.findOne({ rollNumber: req.params.rollNumber });
    if (!student) {
      return res.status(404).send('Student not found.');
    }
    res.status(200).send(student);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).send('Failed to retrieve student.');
  }
});

// Update student eligibility status
router.put('/:rollNumber', async (req, res) => {
    console.log("/putroll");
  try {
    const student = await Student.findOneAndUpdate(
      { rollNumber: req.params.rollNumber },
      { $set: { eligibilityStatus: req.body.eligibilityStatus } },
      { new: true }
    );
    if (!student) {
      return res.status(404).send('Student not found.');
    }
    res.status(200).send(student);
  } catch (error) {
    console.error('Error updating student eligibility status:', error);
    res.status(500).send('Failed to update student eligibility status.');
  }
});

module.exports = router;
