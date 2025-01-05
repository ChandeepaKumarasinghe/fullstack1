import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddStaff = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5555/staff", { name, role });
      alert("Staff member added successfully");
      navigate("/view-staff");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add staff member");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Add New Staff Member</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Role</label>
          <select
            className="w-full border rounded p-2"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          >
            <option value="">Select Role</option>
            <option value="Librarian">Librarian</option>
            <option value="Assistant">Assistant</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="space-x-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Add Staff
          </button>
          <button
            type="button"
            className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
            onClick={() => navigate("/users")}
          >
            Go Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddStaff;
