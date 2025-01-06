// export default ViewAuthor;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./ViewAuthor.css"; // Import the CSS file for styling

const ViewAuthor = () => {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5555/authors")
      .then((response) => setAuthors(response.data))
      .catch((error) => console.error("Error fetching authors:", error));
  }, []);

  const deleteAuthor = (id) => {
    axios
      .delete(`http://localhost:5555/authors/delete/${id}`)
      .then(() => setAuthors(authors.filter((author) => author._id !== id)))
      .catch((error) => console.error("Error deleting author:", error));
  };

  return (
    <div className="view-author-container">
      <h1 className="title">Authors List</h1>
      <Link to="/" className="home-link">
        Go Home
      </Link>
      <ul className="author-list">
        {authors.map((author) => (
          <li key={author._id} className="author-item">
            <span className="author-details">
              {author.name} ({author.age}, {author.medium}, {author.country})
            </span>
            <button
              onClick={() => deleteAuthor(author._id)}
              className="delete-button"
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
