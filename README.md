
📚 Book Shop Website
A full-featured, scalable online bookstore with user authentication, product management, and secure payment processing.

🔗 Live Demo
Live Site: bookshop-client-v2.vercel.app

API/Server: book-shop-backend-woad.vercel.app

✨ Features
🔐 User authentication (JWT-based login & registration)

📚 Book catalog with search, filters, and categories

🛒 Shopping cart and checkout functionality

📦 Order management system

🛠️ Admin dashboard for book inventory management

💳 Integrated payment gateways (SSLCommerz / Stripe)

💬 Book ratings and user reviews

📱 Fully responsive design for all screen sizes

🛠️ Tech Stack
Frontend
React.js (v18.2.0)

Redux Toolkit (v1.9.5)

Tailwind CSS (v3.3.3)

React Router DOM (v6.15.0)

SSLCOMMERZ (payment gateway)

Backend
Node.js (v18.16.0)

Express.js (v4.18.2)

MongoDB (v6.0.6)

Mongoose (v7.5.0)

JWT (v9.0.1) for authentication

Bcrypt.js (v2.4.3) for password hashing


GitHub Actions for CI/CD automation

🚀 Getting Started
Prerequisites
Node.js (v18.x or higher)

MongoDB (v6.x or higher)

Git

Installation Steps
Clone the repository:

bash
Copy
Edit
git clone https://github.com/MohammadTanvir881/book-shop-client.git
cd book-shop-client
Install Dependencies:

bash
Copy
Edit
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
Set Environment Variables:

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
CLOUDINARY_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
//ssl Commerzs
STORE_ID=
STORE_PASSWORD=
Run the Application:

bash
Copy
Edit
# Backend (in /backend)
npm run start:dev

# Frontend (in /frontend)
npm run dev
Access the App:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

⚠️ Challenges Faced
Payment Integration: Ensured secure and smooth Stripe payment processing.

Inventory Sync: Managed real-time stock updates using database transactions.

Performance Optimization: Applied pagination and query optimization to handle large datasets efficiently.

Responsive Design: Built a mobile-first layout using Tailwind and tested across devices.

🔮 Roadmap / Future Enhancements
🔍 Machine-learning-based book recommendation engine

🎧 Support for audiobooks and eBooks

📱 Native mobile apps using React Native

💳 Integration with additional payment gateways

🔗 Social sharing and referral features

🤝 Affiliate program system

📊 Advanced analytics dashboard for admins

🌐 Multilingual support
