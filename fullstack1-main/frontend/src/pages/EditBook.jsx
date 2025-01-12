// import React, { useState, useEffect } from 'react';
// import BackButton from '../components/BackButton';
// import Spinner from '../components/Spinner';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { useSnackbar } from 'notistack';

// const EditBook = () => {
//   const [title, setTitle] = useState('');
//   const [author, setAuthor] = useState('');
//   const [publishYear, setPublishYear] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const {id} = useParams();
//   const { enqueueSnackbar } = useSnackbar();

//   useEffect(() => {
//     setLoading(true);
//     axios.get(`http://localhost:5555/books/${id}`)
//     .then((response) => {
//         setAuthor(response.data.author);
//         setPublishYear(response.data.publishYear)
//         setTitle(response.data.title)
//         setLoading(false);
//       }).catch((error) => {
//         setLoading(false);
//         alert('An error happened. Please Chack console');
//         console.log(error);
//       });
//   }, [])

//   const handleEditBook = () => {
//     const data = {
//       title,
//       author,
//       publishYear,
//     };
//     setLoading(true);
//     axios
//       .put(`http://localhost:5555/books/${id}`, data)
//       .then(() => {
//         setLoading(false);
//         enqueueSnackbar('Book Edited successfully', { variant: 'success' });
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
//       <h1 className='text-3xl my-4'>Edit Book</h1>
//       {loading ? <Spinner /> : ''}
//       <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Title</label>
//           <input
//             type='text'
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2 w-full'
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Author</label>
//           <input
//             type='text'
//             value={author}
//             onChange={(e) => setAuthor(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
//         <div className='my-4'>
//           <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
//           <input
//             type='number'
//             value={publishYear}
//             onChange={(e) => setPublishYear(e.target.value)}
//             className='border-2 border-gray-500 px-4 py-2  w-full '
//           />
//         </div>
//         <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>
//           Save
//         </button>
//       </div>
//     </div>
//   )
// }

// export default EditBook

import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setAuthor(response.data.author);
        setPublishYear(response.data.publishYear);
        setTitle(response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        enqueueSnackbar("Error fetching book details", { variant: "error" });
      });
  }, []);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar("Book Edited successfully", { variant: "success" });
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
        <h1 className="text-3xl">Edit Book</h1>
        <BackButton />
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full bg-white border rounded-lg">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter book title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">
                  Publish Year
                </label>
                <input
                  type="number"
                  value={publishYear}
                  onChange={(e) => setPublishYear(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  placeholder="Enter publish year"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  onClick={handleEditBook}
                  className="bg-blue-500 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBook;
