# Setup Verification Guide

This guide helps verify that the Store Rating Platform is properly set up and running for interview evaluation.

## ✅ Pre-Setup Checklist

### System Requirements
- [ ] Node.js v16+ installed (`node --version`)
- [ ] MySQL v8.0+ installed and running
- [ ] npm or yarn package manager
- [ ] Git for cloning the repository

### Database Setup
- [ ] MySQL service is running
- [ ] Database `store_rating_db` created
- [ ] MySQL credentials are available

## 🚀 Quick Setup Steps

### 1. Clone and Install
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

**Create `server/.env`:**
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=interview_assignment_jwt_secret_key_2024
JWT_EXPIRE=7d

DB_HOST=localhost
DB_PORT=3306
DB_NAME=store_rating_db
DB_USER=root
DB_PASSWORD=your_mysql_password

CLIENT_URL=http://localhost:5173
```

**Create `client/.env`:**
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Database Setup
```sql
-- Connect to MySQL and run:
CREATE DATABASE store_rating_db;
```

### 4. Start Application
```bash
# Terminal 1: Backend
cd server
npm run dev

# Terminal 2: Frontend  
cd client
npm run dev
```

## 🧪 Verification Tests

### Backend Verification
1. **Server Start**: Backend should start on http://localhost:5000
2. **Database Connection**: Should see "MySQL connected successfully"
3. **API Health**: Visit http://localhost:5000/api/health (if implemented)

### Frontend Verification
1. **Client Start**: Frontend should start on http://localhost:5173
2. **Login Page**: Should display the login form
3. **Demo Mode**: Demo buttons should be visible and functional

### Full System Test
1. **Demo Login**: Click "Demo as Regular User"
2. **Store Display**: Should see 8 sample stores
3. **Search Function**: Search should filter stores
4. **Navigation**: All dashboard sections should load

## 🎯 Demo Mode Features

### Available Demo Accounts:
- **Regular User**: Browse stores, submit ratings
- **Admin User**: Manage users and stores, view analytics  
- **Store Owner**: View store analytics and ratings

### Demo Data Includes:
- **8 Sample Stores** with realistic information
- **User Profiles** with different roles
- **Rating Data** with various ratings and reviews
- **Analytics** with meaningful statistics

## 🔧 Troubleshooting

### Common Issues:

**Database Connection Error:**
- Verify MySQL is running
- Check database credentials in `.env`
- Ensure `store_rating_db` database exists

**Port Already in Use:**
- Change PORT in `server/.env` to different value
- Update VITE_API_URL in `client/.env` accordingly

**Module Not Found:**
- Run `npm install` in both server and client directories
- Clear node_modules and reinstall if needed

**CORS Errors:**
- Verify CLIENT_URL in server `.env` matches frontend URL
- Check that both servers are running

## 📋 Interview Evaluation Points

### Technical Features to Demonstrate:
1. **Authentication Flow**: Login/logout functionality
2. **Role-Based Access**: Different dashboards for different roles
3. **CRUD Operations**: User and store management (Admin)
4. **Search & Filter**: Store search functionality
5. **Rating System**: Submit and modify ratings
6. **Responsive Design**: Mobile and desktop compatibility
7. **Error Handling**: Form validation and error messages
8. **State Management**: Redux store and data flow

### Code Quality Points:
1. **Component Structure**: Reusable, well-organized components
2. **API Design**: RESTful endpoints with proper HTTP methods
3. **Database Schema**: Normalized tables with relationships
4. **Security**: JWT authentication, input validation
5. **Modern Practices**: Hooks, functional components, async/await

## 🎉 Success Indicators

✅ **Backend Running**: Console shows "Server running in development mode on port 5000"  
✅ **Database Connected**: Console shows "MySQL connected successfully"  
✅ **Frontend Running**: Browser opens http://localhost:5173  
✅ **Demo Mode Works**: Can login with demo accounts  
✅ **Data Displays**: Stores and users are visible  
✅ **Navigation Works**: Can switch between dashboard sections  
✅ **Search Functions**: Store search returns filtered results  

## 📞 Ready for Interview

Once all verification steps pass, the application is ready for technical evaluation and discussion during the interview process.

**Key Discussion Points:**
- Architecture decisions and trade-offs
- Technology choices and rationale  
- Scalability considerations
- Security implementations
- User experience design choices
- Code organization and maintainability

---

*This setup guide ensures a smooth evaluation experience for the interview process.*