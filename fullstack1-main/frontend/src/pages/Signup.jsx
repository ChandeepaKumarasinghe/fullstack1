import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSnackbar } from "notistack";

const Signup = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState(""); // Default empty string
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSignup = async (e) => {
    e.preventDefault();

    // Add validation for userType
    if (!userType) {
      enqueueSnackbar("Please select a user type", { variant: "error" });
      return;
    }

    const success = await signup(name, password, userType);
    if (success) {
      enqueueSnackbar("Signup successful", { variant: "success" });
      navigate("/");
    } else {
      enqueueSnackbar("Signup failed", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign up for Library Management
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSignup}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Username"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <select
            value={userType} // Fixed: Added value prop
            onChange={(e) => setUserType(e.target.value)} // Fixed: Added onChange handler
            required // Added required attribute
            className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          >
            <option value="">Select User Type</option>
            <option value="adminUser">Admin User</option>
            <option value="normalUser">Normal User</option>
          </select>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="text-indigo-600 hover:text-indigo-500">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
