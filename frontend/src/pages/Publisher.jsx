import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const Publisher = () => {
  const [publishers, setPublishers] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userType = user?.userType;

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/publishers")
      .then((response) => {
        setPublishers(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/publishers/${id}`)
      .then(() => {
        setPublishers(publishers.filter((publisher) => publisher._id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Publishers</h1>
        {userType === "adminUser" && (
          <Link to="/publishers/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        )}
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left">Publisher ID</th>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left">Address</th>
                <th className="px-6 py-3 text-left">Contact</th>
                {userType === "adminUser" && (
                  <th className="px-6 py-3 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {publishers.map((publisher) => (
                <tr key={publisher._id}>
                  <td className="px-6 py-4">{publisher._id}</td>
                  <td className="px-6 py-4">{publisher.name}</td>
                  <td className="px-6 py-4">{publisher.address}</td>
                  <td className="px-6 py-4">{publisher.contact}</td>
                  {userType === "adminUser" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(publisher._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      >
                        <MdOutlineDelete />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Publisher;
