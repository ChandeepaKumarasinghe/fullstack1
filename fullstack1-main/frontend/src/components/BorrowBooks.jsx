//program 1 -----------------------------------------------------------------------------
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BorrowBook = () => {
//   const [userId, setUserId] = useState("");
//   const [bookId, setBookId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleBorrow = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       const response = await axios.post("http://localhost:5555/borrows", {
//         userId,
//         bookId,
//       });

//       if (response.status === 201) {
//         alert("Book borrowed successfully!");
//         navigate("/"); // Navigate to home page
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "An error occurred while borrowing the book"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Borrow a Book</h2>
//       <form onSubmit={handleBorrow} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             User ID
//           </label>
//           <input
//             type="text"
//             value={userId}
//             onChange={(e) => setUserId(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Book ID
//           </label>
//           <input
//             type="text"
//             value={bookId}
//             onChange={(e) => setBookId(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           />
//         </div>
//         {error && <div className="text-red-500 text-sm">{error}</div>}
//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           {loading ? "Borrowing..." : "Borrow Book"}
//         </button>
//       </form>
//       {/* Added Go Home Button */}
//       <button
//         onClick={() => navigate("/")} // Navigate to the home page
//         className="mt-4 bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
//       >
//         Go Home
//       </button>
//     </div>
//   );
// };

// export default BorrowBook;

//program 2 -----------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const BorrowBook = () => {
//   const [selectedBook, setSelectedBook] = useState("");
//   const [availableBooks, setAvailableBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   // Get logged-in user's ID from localStorage (set during login)
//   const userId = localStorage.getItem("userId");

//   // Fetch available books on component mount
//   useEffect(() => {
//     const fetchAvailableBooks = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5555/books/available"
//         );
//         setAvailableBooks(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch available books");
//         console.error(err);
//       }
//     };

//     fetchAvailableBooks();
//   }, []);

//   const handleBorrow = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!userId) {
//       setError("Please log in to borrow books");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5555/borrows", {
//         userId,
//         bookId: selectedBook,
//       });

//       if (response.status === 201) {
//         alert("Book borrowed successfully!");
//         navigate("/"); // Navigate to home page
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "An error occurred while borrowing the book"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (!userId) {
//     return (
//       <div className="p-4 max-w-lg mx-auto">
//         <div className="text-red-500">Please log in to borrow books</div>
//         <button
//           onClick={() => navigate("/login")}
//           className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Borrow a Book</h2>
//       <form onSubmit={handleBorrow} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Select Book
//           </label>
//           <select
//             value={selectedBook}
//             onChange={(e) => setSelectedBook(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           >
//             <option value="">Select a book</option>
//             {availableBooks.map((book) => (
//               <option key={book._id} value={book._id}>
//                 {book.title} by {book.author}
//               </option>
//             ))}
//           </select>
//         </div>

//         {error && <div className="text-red-500 text-sm">{error}</div>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           {loading ? "Borrowing..." : "Borrow Book"}
//         </button>
//       </form>

//       <button
//         onClick={() => navigate("/")}
//         className="mt-4 w-full bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
//       >
//         Go Home
//       </button>
//     </div>
//   );
// };

// export default BorrowBook;

//program 3 -----------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const BorrowBook = () => {
//   const [selectedBook, setSelectedBook] = useState("");
//   const [availableBooks, setAvailableBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { user, isLoading } = useAuth();

//   // Fetch available books on component mount
//   useEffect(() => {
//     const fetchAvailableBooks = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:5555/books/available"
//         );
//         setAvailableBooks(response.data.data);
//       } catch (err) {
//         setError("Failed to fetch available books");
//         console.error(err);
//       }
//     };

//     fetchAvailableBooks();
//   }, []);

//   const handleBorrow = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError(null);

//     if (!user) {
//       setError("Please log in to borrow books");
//       setLoading(false);
//       return;
//     }

//     try {
//       const response = await axios.post("http://localhost:5555/borrows", {
//         userId: user.id, // Using user.id from AuthContext
//         bookId: selectedBook,
//       });

//       if (response.status === 201) {
//         alert("Book borrowed successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       setError(
//         error.response?.data?.message ||
//           "An error occurred while borrowing the book"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show loading state while checking authentication
//   if (isLoading) {
//     return (
//       <div className="p-4 max-w-lg mx-auto">
//         <div>Loading...</div>
//       </div>
//     );
//   }

//   // Show login prompt if user is not authenticated
//   if (!user) {
//     return (
//       <div className="p-4 max-w-lg mx-auto">
//         <div className="text-red-500">Please log in to borrow books</div>
//         <button
//           onClick={() => navigate("/login")}
//           className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Borrow a Book</h2>
//       <div className="mb-4 text-gray-600">
//         Logged in as: {user.name} ({user.userType})
//       </div>
//       <form onSubmit={handleBorrow} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">
//             Select Book
//           </label>
//           <select
//             value={selectedBook}
//             onChange={(e) => setSelectedBook(e.target.value)}
//             className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//             required
//           >
//             <option value="">Select a book</option>
//             {availableBooks.map((book) => (
//               <option key={book._id} value={book._id}>
//                 {book.title} by {book.author}
//               </option>
//             ))}
//           </select>
//         </div>

//         {error && <div className="text-red-500 text-sm">{error}</div>}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
//         >
//           {loading ? "Borrowing..." : "Borrow Book"}
//         </button>
//       </form>

//       <button
//         onClick={() => navigate("/")}
//         className="mt-4 w-full bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
//       >
//         Go Home
//       </button>
//     </div>
//   );
// };

// export default BorrowBook;

//program 4 -----------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import Spinner from "../components/Spinner"; // Make sure you have this component

// const BorrowBook = () => {
//   const [selectedBook, setSelectedBook] = useState("");
//   const [availableBooks, setAvailableBooks] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [fetchingBooks, setFetchingBooks] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();
//   const { user, isLoading } = useAuth();

//   // Fetch available books on component mount
//   useEffect(() => {
//     const fetchAvailableBooks = async () => {
//       try {
//         setFetchingBooks(true);
//         setError(null);
//         const response = await axios.get(
//           "http://localhost:5555/books/available"
//         );

//         if (response.data && Array.isArray(response.data.data)) {
//           setAvailableBooks(response.data.data);
//         } else {
//           throw new Error("Invalid data format received from server");
//         }
//       } catch (err) {
//         const errorMessage =
//           err.response?.data?.message ||
//           err.message ||
//           "Failed to fetch available books";
//         setError(errorMessage);
//         console.error("Error fetching books:", err);
//       } finally {
//         setFetchingBooks(false);
//       }
//     };

//     fetchAvailableBooks();
//   }, []);

//   const handleBorrow = async (e) => {
//     e.preventDefault();

//     if (!selectedBook) {
//       setError("Please select a book to borrow");
//       return;
//     }

//     if (!user) {
//       setError("Please log in to borrow books");
//       return;
//     }

//     try {
//       setLoading(true);
//       setError(null);

//       const response = await axios.post("http://localhost:5555/borrows", {
//         userId: user.id,
//         bookId: selectedBook,
//       });

//       if (response.status === 201) {
//         alert("Book borrowed successfully!");
//         navigate("/");
//       }
//     } catch (error) {
//       const errorMessage =
//         error.response?.data?.message ||
//         "An error occurred while borrowing the book";
//       setError(errorMessage);
//       console.error("Borrow error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Show loading state while checking authentication
//   if (isLoading) {
//     return (
//       <div className="p-4 max-w-lg mx-auto">
//         <Spinner />
//       </div>
//     );
//   }

//   // Show login prompt if user is not authenticated
//   if (!user) {
//     return (
//       <div className="p-4 max-w-lg mx-auto">
//         <div className="text-red-500">Please log in to borrow books</div>
//         <button
//           onClick={() => navigate("/login")}
//           className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
//         >
//           Go to Login
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="p-4 max-w-lg mx-auto">
//       <h2 className="text-2xl font-bold mb-4">Borrow a Book</h2>
//       <div className="mb-4 text-gray-600">
//         Logged in as: {user.name} ({user.userType})
//       </div>

//       {fetchingBooks ? (
//         <div className="text-center py-4">
//           <Spinner />
//           <p className="mt-2">Loading available books...</p>
//         </div>
//       ) : error ? (
//         <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
//           <strong className="font-bold">Error: </strong>
//           <span className="block sm:inline">{error}</span>
//         </div>
//       ) : (
//         <form onSubmit={handleBorrow} className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700">
//               Select Book
//             </label>
//             {availableBooks.length === 0 ? (
//               <p className="mt-2 text-gray-500">
//                 No books available for borrowing
//               </p>
//             ) : (
//               <select
//                 value={selectedBook}
//                 onChange={(e) => setSelectedBook(e.target.value)}
//                 className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
//                 required
//               >
//                 <option value="">Select a book</option>
//                 {availableBooks.map((book) => (
//                   <option key={book._id} value={book._id}>
//                     {book.title} by {book.author}
//                   </option>
//                 ))}
//               </select>
//             )}
//           </div>

//           <button
//             type="submit"
//             disabled={loading || availableBooks.length === 0}
//             className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
//               (loading || availableBooks.length === 0) &&
//               "opacity-50 cursor-not-allowed"
//             }`}
//           >
//             {loading ? "Borrowing..." : "Borrow Book"}
//           </button>
//         </form>
//       )}

//       <button
//         onClick={() => navigate("/")}
//         className="mt-4 w-full bg-sky-300 hover:bg-sky-600 px-4 py-2 rounded-lg"
//       >
//         Go Home
//       </button>
//     </div>
//   );
// };

// export default BorrowBook;

//program 4 -----------------------------------------------------------------------------
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

const BorrowBook = () => {
  const [selectedBook, setSelectedBook] = useState("");
  const [availableBooks, setAvailableBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchingBooks, setFetchingBooks] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { user, isLoading } = useAuth();

  // Fetch available books on component mount
  useEffect(() => {
    const fetchAvailableBooks = async () => {
      try {
        setFetchingBooks(true);
        setError(null);
        const response = await axios.get(
          "http://localhost:5555/borrows/books/available"
        );

        if (response.data && Array.isArray(response.data.data)) {
          setAvailableBooks(response.data.data);
        } else {
          throw new Error("Invalid data format received from server");
        }
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch available books";
        setError(errorMessage);
        console.error("Error fetching books:", err);
      } finally {
        setFetchingBooks(false);
      }
    };

    fetchAvailableBooks();
  }, []);

  const handleBorrow = async (e) => {
    e.preventDefault();

    if (!selectedBook) {
      setError("Please select a book to borrow");
      return;
    }

    if (!user) {
      setError("Please log in to borrow books");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await axios.post("http://localhost:5555/borrows", {
        userId: user.id,
        bookId: selectedBook,
      });

      if (response.status === 201) {
        alert("Book borrowed successfully!");
        navigate("/");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred while borrowing the book";
      setError(errorMessage);
      console.error("Borrow error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  // Show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="p-4 max-w-lg mx-auto mt-10">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Notice: </strong>
          <span className="block sm:inline">Please log in to borrow books</span>
        </div>
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Go to Login
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full mt-4 bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-lg mx-auto mt-10">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Borrow a Book</h2>

        <div className="mb-6 p-3 bg-gray-50 rounded-md">
          <span className="text-sm text-gray-600">Logged in as: </span>
          <span className="font-medium text-gray-800">
            {user.name} ({user.userType})
          </span>
        </div>

        {fetchingBooks ? (
          <div className="text-center py-8">
            <Spinner />
            <p className="mt-2 text-gray-600">Loading available books...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <form onSubmit={handleBorrow} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Book
              </label>
              {availableBooks.length === 0 ? (
                <p className="text-gray-500 italic">
                  No books available for borrowing
                </p>
              ) : (
                <select
                  value={selectedBook}
                  onChange={(e) => setSelectedBook(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                >
                  <option value="">Select a book</option>
                  {availableBooks.map((book) => (
                    <option key={book._id} value={book._id}>
                      {book.title} by {book.author} ({book.publishYear})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || availableBooks.length === 0}
              className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors
                ${
                  (loading || availableBooks.length === 0) &&
                  "opacity-50 cursor-not-allowed"
                }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Spinner className="w-5 h-5 mr-2" />
                  Borrowing...
                </span>
              ) : (
                "Borrow Book"
              )}
            </button>
          </form>
        )}

        <button
          onClick={() => navigate("/")}
          className="mt-6 w-full bg-gray-200 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default BorrowBook;
