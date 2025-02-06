

Book shop Website

Overview

This project is a responsive bicycle e-commerce platform that allows users to browse bicycles, register accounts, place orders, and make payments. The platform features role-based authentication for users and admins, product management, order tracking, and payment integration.

Features

Frontend

User Registration & Authentication

Role-based authentication (User & Admin)

Secure user registration and login with JWT authentication

Routing & Pages

Public Routes:

Home Page: Overview of the platform

All Products Page: Displays all available bicycles with sorting and filtering options

Product Details Page: Detailed view of a specific bicycle

About Us Page: Information about the platform/company

Private Routes:

Checkout Page: Only accessible to authenticated users

Dashboard (Role-Based Access):

User Role: View order history and account details

Admin Role: Manage products, view orders, and oversee platform activities

UI/UX Design

Fully responsive and mobile-friendly design

User-friendly navigation and clean interface

Built according to the provided Figma design

Backend (Module Pattern)

Database (MongoDB)

Users (Roles: User, Admin)

Products (Attributes: name, brand, price, model, stock, etc.)

Orders (Linked to user, product details, total price, status)

Authentication

User registration and login with JWT token management

Secure password hashing

Logout functionality

Product Management

CRUD operations for bicycles (Create, Read, Update, Delete)

Order Management

CRUD operations for orders

Ensure stock levels before processing orders

Payment Integration

 SSLCommerz

Error Handling

Consistent, user-friendly error messages for issues like invalid login, out-of-stock products, etc.

Additional Backend Features

API pagination for product listings and order retrieval

Authentication middleware to protect private routes

Tech Stack

Frontend:

React.js (with React Router)

Tailwind CSS / Bootstrap (for styling)

Redux / Context API (for state management)

Backend:

Node.js (Express.js)

MongoDB (Mongoose ODM)

JWT (for authentication)

bcrypt (for password hashing)

Deployment:

Frontend: Vercel / Netlify

Backend: Vercel 

Database: MongoDB Atlas




