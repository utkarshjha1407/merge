require('dotenv').config();
const app = require('./app');
const { testConnection } = require('./utils/prisma');

const PORT = process.env.PORT || 8080;

const startServer = async () => {
  // Test database connection
  const isConnected = await testConnection();
  
  if (!isConnected) {
    console.error('Failed to connect to database. Please check your DATABASE_URL in .env file');
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
