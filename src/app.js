const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: (process.env.CORS_ORIGIN || 'http://localhost:3001').split(',')
}));
app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// TODO: Import and register actual routes
// const configRoutes = require('./routes/config.routes');
// const aktivitasRoutes = require('./routes/aktivitas.routes');
// const scoringRoutes = require('./routes/scoring.routes');
// const progressRoutes = require('./routes/progress.routes');

// app.use('/api', configRoutes);
// app.use('/api', aktivitasRoutes);
// app.use('/api', scoringRoutes);
// app.use('/api', progressRoutes);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message,
    status: err.status || 500
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

module.exports = app;
