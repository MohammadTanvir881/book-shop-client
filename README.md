📚 Book Shop Website
A full-featured, scalable online bookstore with user authentication, product management, and secure payment processing.

## 🔗 Live Demo
### Live Site: https://book-shop-frontend-site.vercel.app

### API/Server: https://book-shop-baeckend-site.vercel.app/

## ✨ Features
🔐 User Authentication – JWT-based login & registration

📚 Book Catalog – Search, filtering, and category browsing

🛒 Shopping Cart – Add, remove, and update cart items

📦 Order Management – View and track user orders

🛠️ Admin Dashboard – Inventory and user management

💳 Payment Integration – Supports SSLCommerz and Stripe

💬 Reviews & Ratings – Users can leave feedback on books

📱 Responsive Design – Optimized for all device sizes

## 🛠️ Tech Stack
🧩 Frontend
React.js (v18.2.0)

Redux Toolkit (v1.9.5)

Tailwind CSS (v3.3.3)

React Router DOM (v6.15.0)

SSLCOMMERZ (Payment gateway)

## ⚙️ Backend
Node.js (v18.16.0)

Express.js (v4.18.2)

MongoDB (v6.0.6)

Mongoose (v7.5.0)

JWT (v9.0.1) – Authentication

Bcrypt.js (v2.4.3) – Password hashing


Deployment: Vercel (Frontend), Vercel (Backend)

🚀 Getting Started
✅ Prerequisites
Node.js (v18.x or higher)

MongoDB (v6.x or higher)

Git

🧰 Installation Steps
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/MohammadTanvir881/book-shop-client.git
cd book-shop-client
2. Install Dependencies
bash
Copy
Edit
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
3. Configure Environment Variables
Create a .env file in the backend directory:

env
Copy
Edit
PORT=5000
NODE_ENV=production

DATABASE_URL=

BRCYPT_SALT_ROUNDS=12

JWT_ACCESS_TOKEN_SECRET=
JWT_REFRESH_TOKEN_SECRET=
JWT_ACCESS_TOKEN_EXPIREIN=
JWT_REFRESH_TOKEN_EXPIREIN=

# Cloudinary
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# SSLCommerz
STORE_ID=
STORE_PASSWORD=
4. Run the Application
bash
Copy
Edit
# Start Backend
cd backend
npm run start:dev

# Start Frontend (in a new terminal)
cd frontend
npm run dev
🌐 Access the Application
Frontend: http://localhost:3000

Backend API: http://localhost:5000

⚠️ Challenges Faced
Payment Integration: Securely handled Stripe & SSLCommerz payments

Inventory Sync: Ensured real-time updates using database transactions

Performance: Implemented pagination and optimized MongoDB queries

Responsiveness: Built a mobile-first interface using Tailwind CSS
