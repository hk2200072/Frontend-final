# Event Management System

This is a full-stack **Event Management System** built with **Node.js**, **Express**, and **SQLite**. It provides functionality for user authentication, event management, and booking. 

## Features

- **User Authentication**:
  - Register and log in as a regular user or admin.
  - JWT-based authentication with secure cookies.
- **Event Management**:
  - Admins can add, update, and delete events.
  - Users can view available events and book spots.
- **Booking System**:
  - Users can apply for events, and the system tracks available spots.
  - Admins can view all applicants for each event.


## Technologies Used

- **Backend**:
  - Node.js
  - Express
  - SQLite (for database)
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
- **Frontend**:
  - React 
- **Tools**:
  - CORS for cross-origin requests
  - Cookie-parser for handling cookies

## Setup Instructions

**Start the Server**:
node server.js

**Frontend Setup**:
cd myapp
npm start
