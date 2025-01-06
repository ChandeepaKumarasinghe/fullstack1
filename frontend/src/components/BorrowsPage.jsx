// export default BorrowsPage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { format } from "date-fns";

const BorrowsPage = () => {
  const [borrows, setBorrows] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    setLoading(true);
    fetchBorrows();
  }, []);

  const fetchBorrows = async () => {
    try {
      const response = await axios.get("http://localhost:5555/borrows");
      setBorrows(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching borrows:", error);
      setLoading(false);
    }
  };

  const deleteBorrow = async (borrowId) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this borrow record?")
      ) {
        await axios.delete(`http://localhost:5555/borrows/${borrowId}`);
        fetchBorrows(); // Refresh the borrows list after deletion
      }
    } catch (error) {
      console.error("Error deleting borrow:", error);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await axios.put(`http://localhost:5555/borrows/return/${borrowId}`);
      fetchBorrows();
    } catch (error) {
      console.error("Error returning book:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Borrows List</h1>
        {/* Modified Go Home Button */}
        <button
          onClick={() => navigate("/")} // Navigate to the home page
          className="bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>

      {loading ? (
        <div className="text-center text-2xl">Loading...</div>
      ) : (
        <table className="w-full border-separate border-spacing-2">
          <thead>
            <tr>
              <th className="border border-slate-600 rounded-md">No</th>
              <th className="border border-slate-600 rounded-md">Book Title</th>
              <th className="border border-slate-600 rounded-md">User ID</th>
              <th className="border border-slate-600 rounded-md">
                Borrow Date
              </th>
              <th className="border border-slate-600 rounded-md">
                Return Date
              </th>
              <th className="border border-slate-600 rounded-md">Status</th>
              <th className="border border-slate-600 rounded-md">Actions</th>
            </tr>
          </thead>
          <tbody>
            {borrows.map((borrow, index) => (
              <tr key={borrow._id} className="h-8">
                <td className="border border-slate-700 rounded-md text-center">
                  {index + 1}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {borrow.bookId.title}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {borrow.userId}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {format(new Date(borrow.borrowDate), "MMM d, yyyy")}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  {format(new Date(borrow.returnDate), "MMM d, yyyy")}
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      borrow.status === "borrowed"
                        ? "bg-yellow-200"
                        : "bg-green-200"
                    }`}
                  >
                    {borrow.status}
                  </span>
                </td>
                <td className="border border-slate-700 rounded-md text-center">
                  <div className="flex justify-center gap-x-4">
                    <Link to={`/borrows/details/${borrow._id}`}>
                      <BsInfoCircle className="text-2xl text-green-800" />
                    </Link>
                    {borrow.status === "borrowed" && (
                      <button
                        onClick={() => handleReturn(borrow._id)}
                        className="text-yellow-600 hover:text-yellow-800"
                      >
                        Return
                      </button>
                    )}
                    <button
                      onClick={() => deleteBorrow(borrow._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdOutlineDelete className="text-2xl" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BorrowsPage;
