  import React, { useState } from 'react';
  import axios from 'axios';

  function FileUpload() {
    const [file, setFile] = useState(null);
    const [csvData, setCsvData] = useState([]);
    const [uploadMessage, setUploadMessage] = useState('');

    const handleFileChange = (e) => {
      setFile(e.target.files[0]);
    };

    const handleUpload = async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios.post('http://localhost:5000/api/files/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setCsvData(response.data); // Assuming the backend returns the CSV data
        setUploadMessage('File uploaded successfully!');
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadMessage('Failed to upload file.');
      }
    };

    const handleDownloadCsv = () => {
      const csvContent = [];
      csvContent.push(Object.keys(csvData[0]).join(',')); // Add headers
      csvData.forEach((row) => {
        const values = Object.values(row).map((value) => `"${value}"`).join(',');
        csvContent.push(values);
      });
      const csvString = csvContent.join('\n');

      const blob = new Blob([csvString], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'data.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    };

    return (
      <div>
      <div className="max-w-md mx-auto mt-8 p-4 bg-gray-800 rounded-lg">
        <input type="file" onChange={handleFileChange} className="mb-4" />
        <button onClick={handleUpload} className="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">
          Upload
        </button>
        {uploadMessage && <p className="text-green-500">{uploadMessage}</p>}
        </div>
        <div>
        {csvData.length > 0 && (
          <div>
            <button onClick={handleDownloadCsv} className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-4">
              Download CSV
            </button>
            <span className='text-2xl ml-10 '>Note :- For Eligibility, student should score more than 85 marks in every subject.</span>
            <table className="mt-4 w-full border-collapse border border-gray-600">
              <thead>
                <tr className="bg-gray-700 text-white">
                  {Object.keys(csvData[0]).map((header, index) => (
                    <th key={index} className="py-2 px-4">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} className="py-2 px-4 border border-gray-600">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      </div>
    );
  }

  export default FileUpload;
