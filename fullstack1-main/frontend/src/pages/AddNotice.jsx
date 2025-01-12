// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate, Link } from "react-router-dom"; // Modified: Added Link for navigation to home

// const AddNotice = () => {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5555/notices", { title, description });
//       navigate("/view-notices");
//     } catch (error) {
//       console.error("Failed to add notice", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <h1 className="text-2xl mb-4">Add Notice</h1>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-lg mb-2">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border p-2 w-full"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-lg mb-2">Description</label>
//           <textarea
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border p-2 w-full"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
//         >
//           Add Notice
//         </button>
//       </form>
//       {/* Added: "Go Home" button */}
//       <div className="mt-6">
//         <Link to="/">
//           <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
//             Go Home
//           </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AddNotice;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const AddNotice = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5555/notices", { title, description });
      navigate("/view-notices");
    } catch (error) {
      console.error("Failed to add notice", error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Create Notice</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg mb-2">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Submit Notice
        </button>
      </form>
      <div className="mt-6">
        <Link to="/">
          <button className="bg-gray-500 hover:bg-gray-700 text-white px-4 py-2 rounded">
            Go Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AddNotice;
