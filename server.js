require('dotenv').config();
const mongoose = require('mongoose');
const app = require('./src/app');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/catur-marga-lms';

// Start server immediately (don't wait for DB)
app.listen(PORT, () => {
  console.log(`\n🚀 Catur Marga Backend running on http://localhost:${PORT}`);
  console.log(`📚 Health check: GET http://localhost:${PORT}/api/health\n`);
});

// Connect to MongoDB in background (non-blocking)
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log('✓ MongoDB connected');
})
.catch(err => {
  console.warn('⚠ MongoDB connection warning (app will still run):', err.message);
  console.warn('💡 Make sure MONGODB_URI is set correctly in environment variables');
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n✓ Shutting down gracefully...');
  if (mongoose.connection.readyState > 0) {
    mongoose.connection.close(() => {
      console.log('✓ MongoDB disconnected');
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});
