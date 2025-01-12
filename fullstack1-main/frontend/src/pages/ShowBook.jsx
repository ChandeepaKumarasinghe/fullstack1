// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import BackButton from "../components/BackButton";
// import Spinner from "../components/Spinner";

// const ShowBook = () => {
//   const [book, setBook] = useState({});
//   const [loading, setLoading] = useState(false);
//   const { id } = useParams();

//   useEffect(() => {
//     setLoading(true);
//     axios
//       .get(`http://localhost:5555/books/${id}`)
//       .then((response) => {
//         setBook(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.log(error);
//         setLoading(false);
//       });
//   }, []);

//   return (
//     <div className="p-4">
//       <BackButton />
//       <h1 className="text-3xl my-4">Show Book</h1>
//       {loading ? (
//         <Spinner />
//       ) : (
//         <div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
//           <div className="my-4">
//             <span className="text-xl mr-4 text-gray-500">Id</span>
//             <span>{book._id}</span>
//           </div>
//           <div className="my-4">
//             <span className="text-xl mr-4 text-gray-500">Title</span>
//             <span>{book.title}</span>
//           </div>
//           <div className="my-4">
//             <span className="text-xl mr-4 text-gray-500">Author</span>
//             <span>{book.author}</span>
//           </div>
//           <div className="my-4">
//             <span className="text-xl mr-4 text-gray-500">Publish Year</span>
//             <span>{book.publishYear}</span>
//           </div>
//           <div className="my-4">
//             <span className="text-xl mr-4 text-gray-500">Added Time</span>
//             <span>{new Date(book.createdAt).toLocaleString()}</span>{" "}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ShowBook;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Book Details</h1>
        <BackButton />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Field
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-500">ID</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book._id}</div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-500">Title</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.title}</div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-500">Author</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">{book.author}</div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-500">
                  Publish Year
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {book.publishYear}
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-500">
                  Added Time
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {new Date(book.createdAt).toLocaleString()}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShowBook;
