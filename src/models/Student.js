// models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  rollNumber: { type: String, required: true },
  studentName: { type: String, required: true },
  science: { type: Number, required: true },
  maths: { type: Number, required: true },
  english: { type: Number, required: true },
  computer: { type: Number, required: true },
  eligibilityStatus: { type: String, default: 'ToBeChecked' },
});

module.exports = mongoose.model('Student', studentSchema);
