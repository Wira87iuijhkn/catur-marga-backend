# Deployment Guide

## Local Development

### Prerequisites
- Node.js 14+
- MongoDB 4.4+
- npm or yarn

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
cp .env.example .env

# 3. Edit .env with your MongoDB URI and JWT secret
nano .env

# 4. Start MongoDB (if not running)
# Option A: Docker
docker run -d -p 27017:27017 --name mongo mongo:5.0

# Option B: Local MongoDB
mongod --dbpath /path/to/data

# 5. Start development server
npm run dev

# Server running at http://localhost:3000
```

### Running Tests
```bash
npm test
npm run test:watch    # Auto-rerun on file changes
```

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# Start backend + MongoDB
docker-compose up

# Or in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up --build
```

### Manual Docker Build

```bash
# Build image
docker build -t catur-marga-backend:latest .

# Run container
docker run -p 3000:3000 \
  -e MONGODB_URI=mongodb://mongo:27017/catur-marga-lms \
  -e JWT_SECRET=your-secret \
  catur-marga-backend:latest
```

## Cloud Deployment

### Heroku

```bash
# 1. Create app
heroku create catur-marga-api

# 2. Set environment variables
heroku config:set MONGODB_URI=mongodb+srv://...
heroku config:set JWT_SECRET=your-secret

# 3. Deploy
git push heroku main

# View logs
heroku logs --tail
```

### Google Cloud Run

```bash
# 1. Build and push image to Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/catur-marga-backend

# 2. Deploy
gcloud run deploy catur-marga-backend \
  --image gcr.io/PROJECT_ID/catur-marga-backend \
  --platform managed \
  --region us-central1 \
  --set-env-vars MONGODB_URI=...,JWT_SECRET=...

# Get service URL
gcloud run services describe catur-marga-backend --region us-central1
```

### AWS (Elastic Beanstalk)

```bash
# 1. Initialize EB app
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" catur-marga-backend

# 2. Create environment
eb create catur-marga-prod

# 3. Set environment variables
eb setenv MONGODB_URI=... JWT_SECRET=...

# 4. Deploy
git push && eb deploy

# View logs
eb logs
```

## MongoDB Atlas (Cloud Database)

### Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free account
3. Create cluster (M0 free tier)
4. Add IP whitelist (0.0.0.0/0 for dev, specific IPs for production)
5. Create database user
6. Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/catur-marga-lms?retryWrites=true&w=majority`

### Update .env

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/catur-marga-lms?retryWrites=true&w=majority
```

## Monitoring

### Application Monitoring

```bash
# PM2 (Process Manager)
npm install -g pm2

# Start with PM2
pm2 start server.js --name "catur-marga-backend"

# Monitor
pm2 monit
pm2 logs

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Health Checks

```bash
# Health endpoint
curl http://localhost:3000/api/health

# Response
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

## Database Backups

### Manual Backup

```bash
# MongoDB
mongodump --uri "mongodb://localhost:27017/catur-marga-lms" --out ./backups/

# Restore
mongorestore ./backups/catur-marga-lms/
```

### Automated Backups (MongoDB Atlas)

- Automatic daily backups enabled
- 30-day retention
- Access via Atlas dashboard

## Performance Optimization

1. **Enable compression**: Already set in Express middleware
2. **Enable caching**: Add Redis for session/score caching
3. **Database indexes**: Verify all indexes are created (see models)
4. **Load balancing**: Use nginx/HAProxy in front of multiple instances
5. **CDN**: Use CloudFront/CloudFlare for static assets

## Security Checklist

- [ ] Change JWT_SECRET in production
- [ ] Enable HTTPS (SSL/TLS certificate)
- [ ] Set CORS_ORIGIN to specific domains
- [ ] Use strong MongoDB password
- [ ] Enable MongoDB IP whitelist
- [ ] Use environment variables for secrets
- [ ] Keep dependencies updated: `npm audit`, `npm update`
- [ ] Enable database encryption (MongoDB Enterprise)
- [ ] Set up regular backups
- [ ] Monitor logs for suspicious activity

## Troubleshooting

### MongoDB Connection Timeout
```
Error: connect ECONNREFUSED 127.0.0.1:27017
```
- Check MongoDB is running
- Verify MONGODB_URI is correct
- Check firewall/network access

### JWT Secret Error
```
Error: ENOENT: no such file or directory, open '.env'
```
- Run `cp .env.example .env`
- Set valid JWT_SECRET

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
- Change PORT in .env
- Or kill process: `lsof -ti:3000 | xargs kill`

## Logging

All logs are written to `logs/` directory (create if needed):

```
logs/
├── error.log      # Error level
├── combined.log   # All levels
└── access.log     # HTTP requests
```

## Support

For issues or questions:
- Check documentation in README.md
- Review API endpoints in backend/src/routes
- Check test files for usage examples
- File issue on GitHub

