// // export default ViewAuthor;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import "./viewAuthor.css"; // Import the CSS file for styling

// const ViewAuthor = () => {
//   const [authors, setAuthors] = useState([]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5555/authors")
//       .then((response) => setAuthors(response.data))
//       .catch((error) => console.error("Error fetching authors:", error));
//   }, []);

//   const deleteAuthor = (id) => {
//     axios
//       .delete(`http://localhost:5555/authors/delete/${id}`)
//       .then(() => setAuthors(authors.filter((author) => author._id !== id)))
//       .catch((error) => console.error("Error deleting author:", error));
//   };

//   return (
//     <div className="view-author-container">
//       <h1 className="title">Authors List</h1>
//       <Link to="/" className="home-link">
//         Go Home
//       </Link>
//       <ul className="author-list">
//         {authors.map((author) => (
//           <li key={author._id} className="author-item">
//             <span className="author-details">
//               {author.name} ({author.age}, {author.medium}, {author.country})
//             </span>
//             <button
//               onClick={() => deleteAuthor(author._id)}
//               className="delete-button"
//             >
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default ViewAuthor;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./viewAuthor.css";

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:5555/authors");
      setAuthors(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching authors:", err);
      setError("Failed to load authors");
    }
  };

  const deleteAuthor = async (id) => {
    try {
      await axios.delete(`http://localhost:5555/authors/delete/${id}`);
      setAuthors(authors.filter((author) => author._id !== id));
      setError(null);
    } catch (err) {
      console.error("Error deleting author:", err);
      setError("Failed to delete author");
    }
  };

  if (error) {
    return (
      <div className="view-author-container">
        <h1 className="title">Authors List</h1>
        <div role="alert" className="error-message">
          {error}
        </div>
        <Link to="/" className="home-link">
          Go Home
        </Link>
      </div>
    );
  }

  return (
    <div className="view-author-container">
      <h1 className="title">Authors List</h1>
      <Link to="/" className="home-link">
        Go Home
      </Link>
      <ul className="author-list" data-testid="author-list">
        {authors.map((author) => (
          <li key={author._id} className="author-item">
            <span className="author-details">
              {author.name} ({author.age}, {author.medium}, {author.country})
            </span>
            <button
              onClick={() => deleteAuthor(author._id)}
              className="delete-button"
              aria-label={`Delete ${author.name}`}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewAuthor;
