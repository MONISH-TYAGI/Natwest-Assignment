import React, { useState } from 'react';
import axios from 'axios';

function StudentSearch() {
  const [rollNumber, setRollNumber] = useState('');
  const [studentData, setStudentData] = useState(null);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/students/${rollNumber}`);
      setStudentData(response.data);
    } catch (error) {
      console.error('Error searching student:', error);
      alert('Failed to search student.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-gray-800 rounded-lg">
      <input
        type="text"
        placeholder="Enter Roll Number"
        value={rollNumber}
        onChange={(e) => setRollNumber(e.target.value)}
        className="mb-4 bg-gray-700 text-white px-4 py-2 rounded-lg w-full"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2 hover:bg-blue-600"
      >
        Search
      </button>
      {studentData && (
        <div className="mt-4">
          <p className="text-white">Name: {studentData.studentName}</p>
          <p className="text-white">Science: {studentData.science}</p>
          <p className="text-white">Maths: {studentData.maths}</p>
          <p className="text-white">English: {studentData.english}</p>
          <p className="text-white">Computer: {studentData.computer}</p>
          <p className="text-white">Eligibility Status: {studentData.eligibilityStatus}</p>
        </div>
      )}
    </div>
  );
}

export default StudentSearch;
