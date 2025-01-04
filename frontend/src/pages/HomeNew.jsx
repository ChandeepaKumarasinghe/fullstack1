import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AiOutlineEdit, AiOutlineTable } from "react-icons/ai";
import { BsInfoCircle, BsGrid } from "react-icons/bs";
import { MdOutlineAddBox } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import BooksTable from "../components/home/BooksTable";
import BooksCard from "../components/home/BooksCard";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const [view, setView] = useState("books"); // Toggle between 'books' and 'categories'

  const { user, logout } = useAuth();
  const userType = user?.userType;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    if (view === "books") {
      axios
        .get("http://localhost:5555/books")
        .then((response) => {
          setBooks(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    } else if (view === "categories") {
      axios
        .get("http://localhost:5555/categories")
        .then((response) => {
          setCategories(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [view]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="p-4">
      {/* Small App Bar */}
      <div className="bg-gray-800 text-white p-3 rounded-lg shadow-md flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold">📚 Library System</h1>
        <div className="flex items-center gap-4">
          {/* Toggle View Button */}
          <button
            onClick={() => setShowType(showType === "table" ? "card" : "table")}
            className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center gap-1"
          >
            {showType === "table" ? <BsGrid /> : <AiOutlineTable />} View
          </button>

          {/* Category Button */}
          <button
            onClick={() => setView(view === "books" ? "categories" : "books")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-md"
          >
            {view === "books" ? "View Categories" : "View Books"}
          </button>

          {/* See Users Button (Only Admins) */}
          {userType === "adminUser" && (
            <Link to="/users">
              <button className="bg-purple-500 hover:bg-purple-700 text-white px-3 py-2 rounded-md">
                See Users
              </button>
            </Link>
          )}

          {/* Add Book Button (Only Admins) */}
          {userType === "adminUser" && view === "books" && (
            <Link to="/books/create">
              <MdOutlineAddBox className="text-green-500 text-2xl cursor-pointer" />
            </Link>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white px-3 py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Welcome Section */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl">
          Welcome, {user?.name ? user.name : "Guest"}!
        </h2>
      </div>

      {/* Content Section */}
      {loading ? (
        <Spinner />
      ) : view === "books" ? (
        showType === "table" ? (
          <BooksTable books={books} />
        ) : (
          <BooksCard books={books} />
        )
      ) : (
        <div>
          <h3 className="text-2xl my-4">📂 Categories List</h3>
          <table className="min-w-full border-collapse bg-white shadow-md rounded-md">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">#</th>
                <th className="p-2 border">Category Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category._id} className="hover:bg-gray-50">
                  <td className="p-2 border text-center">{index + 1}</td>
                  <td className="p-2 border">{category.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Admin Info */}
      <div className="mt-4">
        {userType ? (
          <p></p>
        ) : (
          <p className="text-gray-500">
            Only admins are allowed to add, delete, or modify book details.
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
