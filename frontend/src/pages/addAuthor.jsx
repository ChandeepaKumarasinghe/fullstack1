// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./AddAuthor.css"; // Import the CSS file for styling

// const AddAuthor = () => {
//   const [author, setAuthor] = useState({
//     name: "",
//     age: "",
//     medium: "",
//     country: "",
//   });
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAuthor({ ...author, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:5555/authors/add", author)
//       .then(() => navigate("/"))
//       .catch((error) => console.error("Error adding author:", error));
//   };

//   return (
//     <div className="add-author-container">
//       <form onSubmit={handleSubmit} className="add-author-form">
//         <h1 className="form-title">Add Author</h1>

//         <input
//           className="form-input"
//           name="name"
//           placeholder="Name"
//           value={author.name}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="form-input"
//           name="age"
//           placeholder="Age"
//           type="number"
//           value={author.age}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="form-input"
//           name="medium"
//           placeholder="Medium"
//           value={author.medium}
//           onChange={handleChange}
//           required
//         />
//         <input
//           className="form-input"
//           name="country"
//           placeholder="Country"
//           value={author.country}
//           onChange={handleChange}
//           required
//         />
//         <button
//           type="submit"
//           className="submit-button"
//           sstyle={{ color: "black" }}
//         >
//           Add Author
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddAuthor;
// addAuthor.jsx file
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AddAuthor.css"; // Import the CSS file for styling

const AddAuthor = () => {
  const [author, setAuthor] = useState({
    name: "",
    age: "",
    medium: "",
    country: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthor({ ...author, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5555/authors/add", author)
      .then(() => navigate("/"))
      .catch((error) => console.error("Error adding author:", error));
  };

  return (
    <div className="add-author-container">
      <form onSubmit={handleSubmit} className="add-author-form">
        <h1 className="form-title">Add Author</h1>
        <input
          className="form-input"
          name="name"
          placeholder="Name"
          value={author.name}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="age"
          placeholder="Age"
          type="number"
          value={author.age}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="medium"
          placeholder="Medium"
          value={author.medium}
          onChange={handleChange}
          required
        />
        <input
          className="form-input"
          name="country"
          placeholder="Country"
          value={author.country}
          onChange={handleChange}
          required
        />
        <button type="submit" className="submit-button">
          Add Author
        </button>
      </form>
    </div>
  );
};

export default AddAuthor;
