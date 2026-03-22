require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catur-marga-lms';

// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✓ MongoDB connected');
  
  // Start server
  app.listen(PORT, () => {
    console.log(`\n🚀 Catur Marga Backend running on http://localhost:${PORT}`);
    console.log(`📚 Health check: GET http://localhost:${PORT}/api/health\n`);
  });
})
.catch(err => {
  console.error('✗ MongoDB connection failed:', err);
  process.exit(1);
});

// Graceful shutdown
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('\n✓ MongoDB disconnected');
    process.exit(0);
  });
});
