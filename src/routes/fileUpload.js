// routes/fileUpload.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const Student = require('../models/Student');

const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        const frontend=[];
       
        for (const studentData of results) {
            let status='Not-Elgiible';
            console.log("studentdata->"+JSON.stringify(studentData));
            const { rollNumber, studentName, science,maths,english,computer } = studentData;
                        if(science>=80 && maths>=80 && english>=80 && computer>=80){
                            status='Eligible';
                        }  
                        if(rollNumber && studentName && science && maths && english && computer)
                        frontend.push({rollNumber,studentName,science,maths,english,computer,eligibilityStatus:status});
          await Student.findOneAndUpdate(
            { rollNumber: studentData.rollNumber },
            { $set: { ...studentData, eligibilityStatus: status } },
            { upsert: true }
          );
        }
        fs.unlinkSync(req.file.path);
        res.status(200).send(frontend);
      });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Failed to upload and process file.');
  }
});

module.exports = router;
