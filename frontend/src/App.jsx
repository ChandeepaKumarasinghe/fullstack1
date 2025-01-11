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
import BorrowBooks from "./components/BorrowBooks";
import BorrowsPage from "./components/BorrowsPage";
import AddAuthor from "./pages/addAuthor";
import ViewAuthor from "./pages/viewAuthor";
import AddNotice from "./pages/AddNotice";
import ViewNotices from "./pages/ViewNotices";
import ViewStaff from "./pages/ViewStaff";
import AddStaff from "./pages/AddStaff";
import ViewPayments from "./pages/ViewPayments";
import AddPayment from "./pages/AddPayment";

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
      <Route
        path="/borrow-books"
        element={
          <PrivateRoute>
            <BorrowBooks />
          </PrivateRoute>
        }
      />
      <Route
        path="/borrows"
        element={
          <PrivateRoute>
            <BorrowsPage />
          </PrivateRoute>
        }
      />
      <Route path="/add-author" element={<AddAuthor />} />
      <Route path="/view-authors" element={<ViewAuthor />} />
      <Route
        path="/add-notice"
        element={
          <PrivateRoute>
            <AddNotice />
          </PrivateRoute>
        }
      />
      <Route
        path="/view-notices"
        element={
          <PrivateRoute>
            <ViewNotices />
          </PrivateRoute>
        }
      />
      <Route path="/view-staff" element={<ViewStaff />} />
      <Route path="/add-staff" element={<AddStaff />} />
      <Route
        path="/view-payments"
        element={
          <PrivateRoute>
            <ViewPayments />
          </PrivateRoute>
        }
      />
      <Route
        path="/add-payment"
        element={
          <PrivateRoute>
            <AddPayment />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default App;
