# Store Rating Platform

> **Interview Assignment Submission**  
> A comprehensive full-stack web application for store rating and management system

## 🎯 Project Overview

This is a complete store rating platform that enables users to discover, rate, and manage stores. The application features role-based access control with three distinct user types: System Administrators, Store Owners, and Regular Users. Built with modern web technologies and best practices.

## ✨ Key Features

### 🔐 Authentication & Authorization
- **JWT-based authentication** with secure password hashing
- **Role-based access control** (Admin, Store Owner, User)
- **Password validation** with complexity requirements
- **Demo mode** for easy testing without registration

### 👤 User Management (Admin)
- Complete CRUD operations for users
- Advanced search and filtering capabilities
- Role assignment and management
- Real-time dashboard analytics

### 🏪 Store Management
- Store registration and profile management
- Search functionality by name and location
- Rating aggregation and analytics
- Store owner assignment

### ⭐ Rating System
- 1-5 star rating system
- Real-time rating updates
- Rating modification capabilities
- Comprehensive rating analytics

### 📊 Analytics Dashboard
- **Admin Dashboard**: Platform-wide statistics and user management
- **Store Owner Dashboard**: Store-specific analytics and customer feedback
- **User Dashboard**: Personal rating history and store discovery

## 🛠 Technology Stack

### Backend
- **Node.js** with **Express.js** framework
- **MySQL** database with **Sequelize ORM**
- **JWT** for authentication
- **Joi** for input validation
- **bcryptjs** for password security

### Frontend
- **React 19** with **Vite** build tool
- **Redux Toolkit** for state management
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Axios** for API communication

### Development Tools
- **ESLint** for code quality
- **Nodemon** for development server
- **Jest** for testing
- **Morgan** for request logging

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MySQL (v8.0+)
- npm or yarn

### 1. Installation
```bash
# Clone the repository
git clone <repository-url>
cd store-rating-platform

# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

### 2. Environment Configuration

**Backend (.env in server directory):**
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=your_super_secure_jwt_secret_key_here
JWT_EXPIRE=7d

# Database Configuration
DB_HOST=localhost
DB_PORT=3306
DB_NAME=store_rating_db
DB_USER=root
DB_PASSWORD=your_mysql_password

# CORS
CLIENT_URL=http://localhost:5173
```

**Frontend (.env in client directory):**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup
```sql
-- Create MySQL database
CREATE DATABASE store_rating_db;
```

### 4. Start the Application
```bash
# Terminal 1: Start backend server
cd server
npm run dev

# Terminal 2: Start frontend server
cd client
npm run dev
```

**Access the application at:** http://localhost:5173

## 🎮 Demo Mode

The application includes a comprehensive demo mode for easy evaluation:

### Demo Accounts Available:
- **Regular User**: Full store browsing and rating capabilities
- **Admin User**: Complete platform management access
- **Store Owner**: Store analytics and customer feedback management

### Demo Features:
- **8 Sample Stores** with realistic data and ratings
- **Complete User Profiles** with varied roles and information
- **Realistic Analytics** with meaningful statistics
- **Functional Search** and filtering capabilities

**No registration required** - click any demo button on the login page!

## 📋 Core Functionalities

### System Administrator
- ✅ User management (Create, Read, Update, Delete)
- ✅ Store management and owner assignment
- ✅ Platform analytics and reporting
- ✅ Advanced search and filtering
- ✅ Role-based access control

### Store Owner
- ✅ Store analytics dashboard
- ✅ Customer rating management
- ✅ Rating distribution analysis
- ✅ Customer feedback overview
- ✅ Store performance metrics

### Regular User
- ✅ Store discovery and search
- ✅ Rating submission (1-5 stars)
- ✅ Rating modification
- ✅ Store details and reviews
- ✅ Personal rating history

## 🔒 Security Features

- **Password Requirements**: 8-16 characters, uppercase, special character
- **JWT Authentication** with secure token management
- **Input Validation** on both client and server
- **SQL Injection Protection** via Sequelize ORM
- **CORS Configuration** for secure cross-origin requests
- **Password Hashing** with bcryptjs

## 📱 User Experience

### Design Principles
- **Responsive Design**: Works seamlessly on all devices
- **Modern UI**: Clean, professional interface with Tailwind CSS
- **Intuitive Navigation**: Clear user flows and navigation patterns
- **Real-time Updates**: Instant feedback and data updates
- **Error Handling**: Comprehensive error messages and validation

### Accessibility
- **Material Icons** for clear visual communication
- **Consistent Color Coding** for different user roles
- **Readable Typography** with proper contrast ratios
- **Keyboard Navigation** support

## 🏗 Architecture

### Project Structure
```
store-rating-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── redux/         # State management
│   │   ├── services/      # API services
│   │   ├── hooks/         # Custom React hooks
│   │   └── utils/         # Utility functions
│   └── public/            # Static assets
├── server/                # Express backend
│   ├── src/
│   │   ├── controllers/   # Route handlers
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── middlewares/   # Custom middleware
│   │   └── config/        # Configuration files
│   └── tests/             # Backend tests
└── README.md
```

### Database Schema
- **Users**: Authentication, profiles, and role management
- **Stores**: Store information and metadata
- **Ratings**: User ratings with timestamps and relationships

## 🧪 Testing & Quality

### Available Scripts
```bash
# Backend
npm run dev      # Development server with auto-reload
npm start        # Production server
npm test         # Run test suite

# Frontend  
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
npm run lint     # Code quality check
```

### Code Quality
- **ESLint** configuration for consistent code style
- **Input validation** on all forms and API endpoints
- **Error boundaries** for graceful error handling
- **Type checking** with PropTypes where applicable

## 🎯 Interview Highlights

### Technical Competencies Demonstrated
1. **Full-Stack Development**: Complete MERN-like stack implementation
2. **Database Design**: Normalized schema with proper relationships
3. **Authentication & Security**: JWT implementation with role-based access
4. **State Management**: Redux Toolkit for complex state handling
5. **API Design**: RESTful API with proper HTTP methods and status codes
6. **Modern React**: Hooks, functional components, and modern patterns
7. **Responsive Design**: Mobile-first approach with Tailwind CSS
8. **Error Handling**: Comprehensive error management throughout the stack

### Best Practices Implemented
- **Separation of Concerns**: Clear separation between frontend and backend
- **Component Reusability**: Modular, reusable React components
- **Security First**: Input validation, authentication, and authorization
- **User Experience**: Intuitive design with loading states and feedback
- **Code Organization**: Clean, maintainable code structure
- **Environment Configuration**: Proper environment variable management

## 📞 Contact & Evaluation

This project demonstrates proficiency in:
- Modern JavaScript (ES6+)
- React.js ecosystem and best practices
- Node.js and Express.js backend development
- Database design and ORM usage
- Authentication and authorization
- State management with Redux
- Responsive web design
- API development and integration



---

*Built by Ishan Tripathi*