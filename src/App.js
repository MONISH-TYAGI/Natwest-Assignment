import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FileUpload from './Components/fileUpload'; // Corrected filename
import StudentSearch from './Components/studentSearch'; // Corrected filename
import NatwestLogo from './pic.jpg'; // Assuming the Natwest logo file is named natwest-logo.png

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-center mb-4">
            <img src={NatwestLogo} alt="Natwest Group" className="h-[6rem] w-1/5" />
          </div>
          <nav className="mb-8">
            <ul className="flex justify-center">
              <li className="mr-6">
                <Link to="/upload" className="text-blue-300 hover:text-blue-200 underline">Upload File</Link>
              </li>
              <li>
                <Link to="/search" className="text-blue-300 hover:text-blue-200 underline">Search Student</Link>
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/upload" element={<FileUpload />} />
            <Route path="/search" element={<StudentSearch />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
