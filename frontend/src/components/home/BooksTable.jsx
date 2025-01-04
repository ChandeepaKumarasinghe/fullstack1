// import React from "react";
// import { Link } from "react-router-dom";
// import { AiOutlineEdit } from "react-icons/ai";
// import { BsInfoCircle } from "react-icons/bs";
// import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
// import { useAuth } from "/src/context/AuthContext";

// const BooksTable = ({ books }) => {
//   const { user } = useAuth();
//   const userType = user?.userType;

//   // Function to render operations based on user type
//   const renderOperations = (book) => {
//     // Allow all operations for admin
//     if (userType === "adminUser") {
//       return (
//         <div className="flex justify-center gap-x-4">
//           <Link to={`/books/details/${book._id}`}>
//             <BsInfoCircle className="text-2xl text-green-800" />
//           </Link>
//           <Link to={`/books/edit/${book._id}`}>
//             <AiOutlineEdit className="text-2xl text-yellow-600" />
//           </Link>
//           <Link to={`/books/delete/${book._id}`}>
//             <MdOutlineDelete className="text-2xl text-red-600" />
//           </Link>
//         </div>
//       );
//     }

//     if (userType === null) {
//       return (
//         <div className="flex justify-center gap-x-4">
//           <Link to={`/books/details/${book._id}`}>
//             <BsInfoCircle className="text-2xl text-green-800" />
//           </Link>
//         </div>
//       );
//     }

//     // Allow only view for viewer
//     if (userType === "normalUser") {
//       return (
//         <div className="flex justify-center gap-x-4">
//           <Link to={`/books/details/${book._id}`}>
//             <BsInfoCircle className="text-2xl text-green-800" />
//           </Link>
//         </div>
//       );
//     }

//     // If no user type or unauthorized, return null
//     return null;
//   };

//   return (
//     <table className="w-full border-separate border-spacing-2">
//       <thead>
//         <tr>
//           <th className="border border-slate-600 rounded-md">No</th>
//           <th className="border border-slate-600 rounded-md">Title</th>
//           <th className="border border-slate-600 rounded-md max-md:hidden">
//             Author
//           </th>
//           <th className="border border-slate-600 rounded-md max-md:hidden">
//             Publish Year
//           </th>
//           <th className="border border-slate-600 rounded-md">Operations</th>
//         </tr>
//       </thead>
//       <tbody>
//         {books.map((book, index) => (
//           <tr key={book._id} className="h-8">
//             <td className="border border-slate-700 rounded-md text-center">
//               {index + 1}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center">
//               {book.title}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center max-md:hidden">
//               {book.author}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center max-md:hidden">
//               {book.publishYear}
//             </td>
//             <td className="border border-slate-700 rounded-md text-center">
//               {renderOperations(book)}
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default BooksTable;
import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineDelete } from "react-icons/md";
import { useAuth } from "/src/context/AuthContext";

const BooksTable = ({ books }) => {
  const { user } = useAuth();
  const userType = user?.userType;

  const renderOperations = (book) => {
    if (userType === "adminUser") {
      return (
        <div className="flex gap-x-4">
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-lg text-blue-600 hover:text-blue-900" />
          </Link>
          <Link to={`/books/edit/${book._id}`}>
            <AiOutlineEdit className="text-lg text-yellow-600 hover:text-yellow-900" />
          </Link>
          <Link to={`/books/delete/${book._id}`}>
            <MdOutlineDelete className="text-lg text-red-600 hover:text-red-900" />
          </Link>
        </div>
      );
    }

    if (userType === null || userType === "normalUser") {
      return (
        <div className="flex justify-center">
          <Link to={`/books/details/${book._id}`}>
            <BsInfoCircle className="text-lg text-blue-600 hover:text-blue-900" />
          </Link>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-lg">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              No
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:hidden">
              Author
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider max-md:hidden">
              Publish Year
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Operations
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {books.map((book, index) => (
            <tr key={book._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {index + 1}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {book.title}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-md:hidden">
                {book.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 max-md:hidden">
                {book.publishYear}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {renderOperations(book)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksTable;
