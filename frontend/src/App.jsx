import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateBook from "./pages/CreateBooks";
import ShowBook from "./pages/ShowBook";
import EditBook from "./pages/EditBook";
import DeleteBook from "./pages/DeleteBook";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PrivateRoute from "./components/PrivateRoute";
import UsersList from "./components/UsersList";

const App = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/users" element={<UsersList />} />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/create"
        element={
          <PrivateRoute>
            <CreateBook />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/details/:id"
        element={
          <PrivateRoute>
            <ShowBook />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/edit/:id"
        element={
          <PrivateRoute>
            <EditBook />
          </PrivateRoute>
        }
      />
      <Route
        path="/books/delete/:id"
        element={
          <PrivateRoute>
            <DeleteBook />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
