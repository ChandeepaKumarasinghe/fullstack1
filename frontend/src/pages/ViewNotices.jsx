// // pages/ViewNotices.jsx
// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const ViewNotices = () => {
//   const [notices, setNotices] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5555/notices")
//       .then((response) => setNotices(response.data))
//       .catch((error) => console.error("Failed to fetch notices", error));
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">All Notices</h1>
//       {notices.length === 0 ? (
//         <p>No notices found</p>
//       ) : (
//         <ul>
//           {notices.map((notice) => (
//             <li key={notice._id} className="mb-4">
//               <h2 className="text-xl font-bold">{notice.title}</h2>
//               <p>{notice.description}</p>
//               <small>{new Date(notice.createdAt).toLocaleString()}</small>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ViewNotices;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

const ViewNotices = () => {
  const [notices, setNotices] = useState([]);
  const { user } = useAuth();
  const userType = user?.userType;

  useEffect(() => {
    axios
      .get("http://localhost:5555/notices")
      .then((response) => setNotices(response.data))
      .catch((error) => console.error("Failed to fetch notices", error));
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">All Notices</h1>
        {userType === "adminUser" && (
          <Link to="/add-notice">
            <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
              Add Notice
            </button>
          </Link>
        )}
      </div>
      {notices.length === 0 ? (
        <p>No notices found</p>
      ) : (
        <ul>
          {notices.map((notice) => (
            <li key={notice._id} className="mb-4">
              <h2 className="text-xl font-bold">{notice.title}</h2>
              <p>{notice.description}</p>
              <small>{new Date(notice.createdAt).toLocaleString()}</small>
            </li>
          ))}
          {/* Added: Link to Home Page */}
          <div className="mt-6">
            <Link to="/">
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Go Home
              </button>
            </Link>
          </div>
        </ul>
      )}
    </div>
  );
};

export default ViewNotices;
