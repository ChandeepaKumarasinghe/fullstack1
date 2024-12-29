// import React, { useState } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

// const DeleteBook = () => {
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const { enqueueSnackbar } = useSnackbar();

//   const handleDeleteBook = () => {
//     setLoading(true);
//     axios
//       .delete(`http://localhost:5555/books/${id}`)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Book Deleted successfully', { variant: 'success' });
//         navigate('/');
//       })
//       .catch((error) => {
//         setLoading(false);
//         // alert('An error happened. Please Chack console');
//         enqueueSnackbar('Error', { variant: 'error' });
//         console.log(error);
//       });
//   };

//   return (
//     <div className='p-4'>
//       <BackButton />
//       <h1 className='text-3xl my-4'>Delete Book</h1>
//       {loading ? <Spinner /> : ''}
//       <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto'>
//         <h3 className='text-2xl'>Are You Sure You want to delete this book?</h3>

//         <button
//           className='p-4 bg-red-600 text-white m-8 w-full'
//           onClick={handleDeleteBook}
//         >
//           Yes, Delete it
//         </button>
//       </div>
//     </div>
//   )
// }

// export default DeleteBook;
import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const DeleteBook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  const handleDeleteBook = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/books/${id}`)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Deleted successfully", { variant: "success" });
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar("Error", { variant: "error" });
        console.log(error);
      });
  };

  if (loading) return <Spinner />;

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl">Delete Book</h1>
        <BackButton />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white border rounded-lg">
          <div className="p-6">
            <div className="flex flex-col items-center">
              <div className="text-xl font-medium text-gray-900 mb-4">
                Are you sure you want to delete this book?
              </div>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleDeleteBook}
                  className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Delete
                </button>
                <button
                  onClick={() => navigate("/")}
                  className="bg-gray-500 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-medium"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBook;
