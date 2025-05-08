Book Shop Website
A full-featured online book store with user authentication, product management, and payment processing.

🔗 Live Links
Live Site: https://bookshop-client-v2.vercel.app/

API/Server: https://book-shop-backend-woad.vercel.app/

✨ Core Features
User authentication (login/registration with JWT)

Book catalog with search and filtering

Shopping cart functionality

Order management system

Admin dashboard for inventory management

Payment integration (Stripe/PayPal)

Responsive design for all devices

Book rating and review system

🛠️ Technologies Used
Frontend
React.js (v18.2.0)

Redux Toolkit (v1.9.5)


Tailwind CSS (v3.3.3)

React Router (v6.15.0)

SSLCOMMERZS

Backend
Node.js (v18.16.0)

Express.js (v4.18.2)

MongoDB (v6.0.6)

Mongoose (v7.5.0)

JSON Web Tokens (v9.0.1)

Bcrypt.js (v2.4.3)

DevOps
AWS EC2 (Ubuntu 20.04)

Nginx (v1.25.2)

PM2 (v5.3.0)

GitHub Actions (for CI/CD)

🚀 Installation Guide
Follow these steps to run the project locally:

Prerequisites
Node.js (v18.x or higher)

MongoDB (v6.x or higher)

Git

Setup Instructions
Clone the repository:

bash
git clone https://github.com/MohammadTanvir881/book-shop-client.git
cd book-shop-website
Install dependencies for both frontend and backend:

bash
# Frontend
cd frontend
npm install

# Backend
cd ../backend
npm install
Set up environment variables:
Create a .env file in the backend directory with:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
STRIPE_SECRET_KEY=your_stripe_test_key
PORT=5000
Start the development servers:

bash
# In backend directory
npm run start:dev

# In frontend directory (new terminal)
npm run dev
Access the application:

Frontend: http://localhost:3000

Backend API: http://localhost:5000

🧗 Major Challenges
Payment Integration: Implementing Stripe payment processing required handling sensitive data securely while maintaining a smooth user experience.

Inventory Synchronization: Ensuring real-time stock updates across multiple concurrent users was challenging, solved with database transactions.

Performance Optimization: Large book catalog required implementing pagination and efficient database queries to maintain fast load times.

Responsive Design: Creating a consistent experience across all devices required careful CSS planning and extensive testing.

🔮 Future Plans
Implement book recommendation engine using machine learning

Add audiobook and eBook support

Develop mobile applications (React Native)

Integrate with more payment gateways

Add social sharing features

Implement affiliate program functionality

Develop advanced analytics dashboard for admin

Add multilingual support
