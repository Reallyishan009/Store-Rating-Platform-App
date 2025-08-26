const app = require('./app');
const { connectDB } = require('./config/db');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Start server
    const server = app.listen(PORT, () => {
      console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
    });

    // Handle unhandled promise rejections
    process.on('unhandledRejection', (err) => {
      console.log('Unhandled Rejection:', err.message);
      server.close(() => {
        process.exit(1);
      });
    });

    // Handle SIGTERM
    process.on('SIGTERM', () => {
      console.log('SIGTERM received');
      server.close(() => {
        console.log('Process terminated');
      });
    });

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();