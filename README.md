# 🚀 Library Management System Using MERN Stack

## 📂 Overview

This project is a Library Management System built using the MERN stack (MongoDB, Express.js, React, and Node.js). The system is designed to efficiently manage the operations of a library, including book management, user management, and administrative functionalities. It serves as an assessment project for the PUSL3120 module.

## 📂 Features

-**User Management:**
-User registration and login.
-Role-based access control (Admin and Member).
-Profile management.

-**Book Management:**
-Add, update, and delete books (Admin only).
-View book details.
-Search and filter books by title, author, or genre.

-**Library Operations:**
-Borrow and return books.
-Track borrowed books and due dates.
-Notifications for overdue books.

-**Administrative Features:**
-Manage user accounts.
-View system logs and reports.

## 📂 System Architecture

This project follows a modular architecture with the following components:

**1. Backend**
Built using Node.js with Express.js.
RESTful API for handling requests.
Database integration using MongoDB Atlas.
Authentication and authorization using JWT (JSON Web Token).
Input validation and error handling.

**2. Frontend**
Developed using React.
State management with Redux.
Responsive design using Bootstrap and CSS modules.

**3. Database**
Hosted on MongoDB Atlas.
Contains three collections:
admins: Stores admin account details.
books: Stores book details such as title, author, genre, and availability status.
products: (Placeholder collection for scalability).

## 📂 Installation

**Prerequisites**
Node.js and npm installed.
MongoDB Atlas account.

**Steps**
Clone the repository:
git clone <repository_url>
cd library-management-system

Navigate to the backend directory:

```
cd backend
npm install
```

Set up environment variables in a .env file:

```
PORT=5000
MONGO_URI=<your_mongo_db_uri>
JWT_SECRET=<your_jwt_secret>
```

Start the backend server:

```
npm start
```

Navigate to the frontend directory:

```
cd ../frontend
npm install
```

Start the frontend server:

```
npm start
```

## Development Tools

Git: Version control.
Postman: API testing.
VS Code: Code editor.

test commit
