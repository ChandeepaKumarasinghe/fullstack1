import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";

const Reservation = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const userType = user?.userType;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/reservations")
      .then((response) => {
        setReservations(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5555/reservations/${id}`)
      .then(() => {
        setReservations(
          reservations.filter((reservation) => reservation._id !== id)
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Reservations</h1>
        {userType === "adminUser" && (
          <Link to="/reservations/create">
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
                <th className="px-6 py-3 text-left">Reservation ID</th>
                <th className="px-6 py-3 text-left">Book Title</th>
                <th className="px-6 py-3 text-left">Reserved By</th>
                <th className="px-6 py-3 text-left">Reservation Date</th>
                {userType === "adminUser" && (
                  <th className="px-6 py-3 text-left">Actions</th>
                )}
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation._id}>
                  <td className="px-6 py-4">{reservation._id}</td>
                  <td className="px-6 py-4">{reservation.bookTitle}</td>
                  <td className="px-6 py-4">{reservation.userName}</td>
                  <td className="px-6 py-4">
                    {new Date(reservation.date).toLocaleString()}
                  </td>
                  {userType === "adminUser" && (
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(reservation._id)}
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

export default Reservation;
