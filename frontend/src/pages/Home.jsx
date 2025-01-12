////////////////////////////////////////////////////////////////program 1
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import { useAuth } from "../context/AuthContext";
// import BooksTable from "../components/home/BooksTable";

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showType, setShowType] = useState("table");
//   const { user, logout } = useAuth();
//   const userType = user?.userType;
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:5555/books")
//       .then((response) => {
//         setBooks(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl">
//           Welcome, {user?.name ? user.name : "Guest"}!
//         </h1>
//         {/* <div>User Type: {user?.userType || "Not specified"}</div> */}
//         <div className="flex items-center gap-x-4">
//           {userType === "adminUser" && (
//             <Link to="/users">
//               <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
//                 See Users
//               </button>
//             </Link>
//           )}
//           {userType === "adminUser" && (
//             <Link to="/borrow-books">
//               <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//                 Borrow Books
//               </button>
//             </Link>
//           )}
//           <Link to="/borrows">
//             <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//               See Borrowings
//             </button>
//           </Link>
//           {userType === "adminUser" && (
//             <Link to="/add-author">
//               <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
//                 Add Author
//               </button>
//             </Link>
//           )}
//           <Link to="/view-authors">
//             <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
//               View Authors
//             </button>
//           </Link>
//           {userType === "adminUser" && (
//             <Link to="/add-author">
//               <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
//                 Add Author
//               </button>
//             </Link>
//           )}
//           <Link to="/view-notices">
//             <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
//               Notice Board
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl my-8">Books List</h1>
//         {userType === "adminUser" && (
//           <Link to="/books/create">
//             <MdOutlineAddBox className="text-sky-800 text-4xl" />
//           </Link>
//         )}
//       </div>
//       {loading ? (
//         <Spinner />
//       ) : showType === "table" ? (
//         <BooksTable books={books} />
//       ) : (
//         <BooksCard books={books} />
//       )}
//       <div>
//         <br />
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//         >
//           Logout
//         </button>{" "}
//         {userType ? (
//           <p></p>
//         ) : (
//           <p>
//             only admins are allow the add, delete or modify the books details
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };
// export default Home;

////////////////////////////////////////////////////////////////program 2
// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import BooksTable from "../components/home/BooksTable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState("table");
  const { user, logout } = useAuth();
  const userType = user?.userType;
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:5555/books")
      .then((response) => {
        setBooks(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="p-4" data-testid="home-container">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl" data-testid="welcome-message">
          Welcome, {user?.name ? user.name : "Guest"}!
        </h1>
        <div className="flex items-center gap-x-4">
          {userType === "adminUser" && (
            <Link to="/users">
              <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
                See Users
              </button>
            </Link>
          )}
          {userType === "adminUser" && (
            <Link to="/borrow-books">
              <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
                Borrow Books
              </button>
            </Link>
          )}
          <Link to="/borrows">
            <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
              See Borrowings
            </button>
          </Link>
          {userType === "adminUser" && (
            <Link to="/add-author">
              <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
                Add Author
              </button>
            </Link>
          )}
          <Link to="/view-authors">
            <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
              View Authors
            </button>
          </Link>
          <Link to="/view-notices">
            <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
              Notice Board
            </button>
          </Link>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <h1 className="text-3xl my-8">Books List</h1>
        {userType === "adminUser" && (
          <Link to="/books/create">
            <MdOutlineAddBox className="text-sky-800 text-4xl" />
          </Link>
        )}
      </div>
      {loading ? <Spinner /> : <BooksTable books={books} />}
      <div>
        <br />
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
          data-testid="logout-button"
        >
          Logout
        </button>
        &nbsp;
        <Link to="#">
          <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
            Live Chat
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;

////////////////////////////////////////////////////////////////program 3
// import React, { useEffect, useState, useContext } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom";
// import Spinner from "../components/Spinner";
// import { MdOutlineAddBox } from "react-icons/md";
// import { AuthContext } from "../context/AuthContext";
// import BooksTable from "../components/home/BooksTable";

// const Home = () => {
//   const [books, setBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const { user, logout } = useContext(AuthContext);
//   const userType = user?.userType;
//   const navigate = useNavigate();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get("http://localhost:5555/books")
//       .then((response) => {
//         setBooks(response.data.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       navigate("/login");
//     } catch (error) {
//       console.error("Logout failed", error);
//     }
//   };

//   return (
//     <div className="p-4" data-testid="home-container">
//       <div className="flex justify-between items-center mb-4">
//         <h1 className="text-3xl" data-testid="welcome-message">
//           Welcome, {user?.name ? user.name : "Guest"}!
//         </h1>
//         <div className="flex items-center gap-x-4">
//           {userType === "adminUser" && (
//             <>
//               <Link to="/users">
//                 <button className="bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded-lg">
//                   See Users
//                 </button>
//               </Link>
//               <Link to="/borrow-books">
//                 <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//                   Borrow Books
//                 </button>
//               </Link>
//               <Link to="/add-author">
//                 <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
//                   Add Author
//                 </button>
//               </Link>
//             </>
//           )}
//           <Link to="/borrows">
//             <button className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg">
//               See Borrowings
//             </button>
//           </Link>
//           <Link to="/view-authors">
//             <button className="bg-orange-500 hover:bg-orange-700 text-white px-4 py-2 rounded-lg">
//               View Authors
//             </button>
//           </Link>
//           <Link to="/view-notices">
//             <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
//               Notice Board
//             </button>
//           </Link>
//         </div>
//       </div>
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl my-8">Books List</h1>
//         {userType === "adminUser" && (
//           <Link to="/books/create">
//             <MdOutlineAddBox className="text-sky-800 text-4xl" />
//           </Link>
//         )}
//       </div>
//       {loading ? <Spinner /> : <BooksTable books={books} />}
//       <div>
//         <br />
//         <button
//           onClick={handleLogout}
//           className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//           data-testid="logout-button"
//         >
//           Logout
//         </button>
//         {userType ? null : (
//           <p data-testid="admin-message">
//             only admins are allow the add, delete or modify the books details
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;
