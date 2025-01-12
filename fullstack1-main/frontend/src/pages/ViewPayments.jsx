import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

const ViewPayments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5555/payments", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(response.data.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      alert("Error fetching payments");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5555/payments/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPayments(payments.filter((payment) => payment._id !== id));
      alert("Payment deleted successfully");
    } catch (error) {
      console.error("Error deleting payment:", error);
      alert("Error deleting payment");
    }
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Payments List</h1>
        <div>
          <button
            onClick={() => navigate("/add-payment")}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2"
          >
            Add New Payment
          </button>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
          >
            Go Back
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                User
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Due Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Created At
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {payments.map((payment) => (
              <tr key={payment._id}>
                <td className="px-6 py-4">{payment.userId.name}</td>
                <td className="px-6 py-4">${payment.amount}</td>
                <td className="px-6 py-4">{payment.description}</td>
                <td className="px-6 py-4">
                  {new Date(payment.dueDate).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(payment._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewPayments;
