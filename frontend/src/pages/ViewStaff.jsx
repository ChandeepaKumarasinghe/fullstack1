import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ViewStaff = () => {
  const [staff, setStaff] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await axios.get("http://localhost:5555/staff");
        setStaff(response.data.data);
      } catch (error) {
        alert("Failed to fetch staff members");
      }
    };

    fetchStaff();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/staff/${id}`);
      setStaff(staff.filter((s) => s._id !== id));
      alert("Staff member deleted successfully");
    } catch (error) {
      alert("Failed to delete staff member");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">Staff List</h1>
      <table className="min-w-full bg-white border rounded-lg mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left">Name</th>
            <th className="px-6 py-3 text-left">Role</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr key={member._id} className="border-t">
              <td className="px-6 py-4">{member.name}</td>
              <td className="px-6 py-4">{member.role}</td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(member._id)}
                  className="text-red-600 hover:text-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/users")}
          className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
        <button
          onClick={() => navigate("/add-staff")}
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add New Staff Member
        </button>
      </div>
    </div>
  );
};

export default ViewStaff;
