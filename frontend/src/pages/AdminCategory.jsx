import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete, MdOutlineAddBox } from "react-icons/md";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const { user } = useAuth();
  const userType = user?.userType;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/categories")
      .then((response) => {
        setCategories(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        setLoading(false);
      });
  }, []);

  const handleAddCategory = () => {
    if (!newCategory.trim()) return;
    axios
      .post("http://localhost:5555/categories", { name: newCategory })
      .then((response) => {
        setCategories([...categories, response.data.data]);
        setNewCategory("");
      })
      .catch((error) => console.error("Error adding category:", error));
  };

  const handleDeleteCategory = (id) => {
    axios
      .delete(`http://localhost:5555/categories/${id}`)
      .then(() => {
        setCategories(categories.filter((category) => category._id !== id));
      })
      .catch((error) => console.error("Error deleting category:", error));
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl mb-4">📚 Categories</h1>
      {userType === "adminUser" && (
        <div className="mb-4 flex gap-2">
          <input
            type="text"
            placeholder="Add new category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            className="border p-2 rounded-md"
          />
          <button
            onClick={handleAddCategory}
            className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-md"
          >
            <MdOutlineAddBox className="inline-block text-lg mr-1" /> Add
          </button>
        </div>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <table className="min-w-full border-collapse bg-white shadow-md rounded-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 border">#</th>
              <th className="p-2 border">Category Name</th>
              {userType === "adminUser" && <th className="p-2 border">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="p-2 border text-center">{index + 1}</td>
                <td className="p-2 border">{category.name}</td>
                {userType === "adminUser" && (
                  <td className="p-2 border text-center flex gap-2 justify-center">
                    <Link to={`/categories/edit/${category._id}`}>
                      <button className="bg-blue-500 hover:bg-blue-700 text-white px-2 py-1 rounded-md">
                        <AiOutlineEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDeleteCategory(category._id)}
                      className="bg-red-500 hover:bg-red-700 text-white px-2 py-1 rounded-md"
                    >
                      <MdOutlineDelete />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Categories;
