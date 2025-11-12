import logo from "../assets/logo.jpeg";
import React from 'react';
export function Main() {
  return (
    <div className="min-h-screen bg-[#003366] flex flex-col items-center justify-start py-10">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[80%] p-6 flex flex-col items-center text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <img
            src={logo}
            alt="Logo"
            className="w-16 h-16"
          />
          <h1 className="text-3xl font-bold text-[#003366]">
            Travel & Subsistence Calculator
          </h1>
        </div>
        <p className="text-gray-600 text-sm">
          Ministry of Finance, Economic Development and Investment Promotion
        </p>
      </div>

      {/*Form Section */}

      <div className="bg-white mt-8 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8">
        <h2 className="text-2xl font-semibold text-[#003366] mb-4">
          Trip Details
        </h2>
        <hr className="border-[#003366] mb-6" />

        {/* Name of the traveller */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
    <div>
      <label className="block text-gray-700 font-medium mb-2">Name:</label>
      <input
        type="text"
        placeholder="Enter full name"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none"
      />
    </div>
        {/* EC Number */}
    <div>
      <label className="block text-gray-700 font-medium mb-2">EC Number:</label>
      <input
        type="text"
        placeholder="Enter EC Number"
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none"
      />
    </div>
  </div>


        {/* Official Grade */}

        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Official Grade:
          </label>
          <select className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none">
              <option>Select Grade</option>
              <option>Ministers and Deputy Ministers</option>
              <option>Accounting Officers</option>
              <option>Accounting Officers (Non-Accounting)</option>
              <option>Chief Directors</option>
              <option>Directors</option>
              <option>Deputy Directors</option>
              <option>Officers</option>
          </select>
        </div>

        {/* Purpose of Journey */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Purpose of Journey:
          </label>
          <textarea
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none"
            placeholder="Enter the purpose of the journey..."
            rows="3"
          ></textarea>
        </div>

      </div>
    </div>
  );
}
