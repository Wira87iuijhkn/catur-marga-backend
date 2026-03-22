# Catur Marga Grading System Backend

**LMS Platform Integration**: Complete backend for Catur Marga (Four Paths) grading system with pertemuan-specific roles, activities, assessment instruments, and automated scoring.

## Quick Start

```bash
# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with MongoDB URI, JWT secret, etc.

# Start server
npm start          # Production
npm run dev        # Development with nodemon

# Run tests
npm test
```

## Architecture

- **Framework**: Express.js
- **Database**: MongoDB
- **Authentication**: JWT + Role-based access
- **Validation**: Joi schemas
- **Scoring**: Automatic + rubric-based grading

## Project Structure

```
catur-marga-backend/
├── src/
│   ├── models/                 # MongoDB schemas
│   │   ├── PertemuanMargaConfig.js
│   │   ├── StudentAktivitas.js
│   │   ├── MargaScores.js
│   │   └── RubricSubmission.js
│   ├── routes/                 # API endpoints
│   │   ├── config.routes.js    # Pertemuan-marga config
│   │   ├── aktivitas.routes.js # Student submissions
│   │   ├── scoring.routes.js   # Grading & scoring
│   │   └── progress.routes.js  # Reports & progress
│   ├── controllers/            # Business logic
│   │   ├── configController.js
│   │   ├── aktivitasController.js
│   │   ├── scoringController.js
│   │   └── progressController.js
│   ├── services/               # Core services
│   │   ├── ScoringService.js   # Auto & rubric scoring
│   │   └── ProgressService.js  # Report generation
│   ├── middleware/             # Auth, validation, errors
│   ├── cron/                   # Scheduled jobs
│   └── app.js                  # Express setup
├── tests/
├── .env.example
├── package.json
└── server.js
```

## Key Features

### 1. Pertemuan-Marga Configuration
Define which margas are active per pertemuan, with roles and weighted activities

### 2. Student Activity Submission
Students submit aktivitas (quizzes, essays, forum posts, reflections)

### 3. Automatic Scoring
- MCQ quizzes: Auto-calculated
- Forum posts: Counted + quality rated
- Exit tickets: Collected for manual review

### 4. Rubric-Based Grading
Dosen grades essays/reflections against customizable rubrics with point allocation per criteria

### 5. Score Aggregation
- Per-aktivitas scores
- Per-marga totals with weightings
- Per-pertemuan final scores
- Cross-pertemuan progress tracking

### 6. Reports & Progress
- Student marga progress across all pertemuan
- Class-wide summary for pertemuan
- Detailed reports with rubric breakdowns

## API Overview

### Configuration
- `GET /api/pertemuan/:id/marga-config` — Get pertemuan marga setup
- `POST /api/pertemuan/:id/marga-config` — Create/update config
- `GET /api/pertemuan/:id/rubrics/:rubric_id` — Get rubric details

### Submissions
- `GET /api/student/:user_id/pertemuan/:p_id/aktivitas` — List aktivitas
- `POST /api/student/:user_id/pertemuan/:p_id/aktivitas/:a_id/submit` — Submit
- `GET /api/aktivitas/:a_id/submissions` — All submissions (dosen)

### Scoring
- `POST /api/score/auto/:submission_id` — Auto-score submission
- `POST /api/rubric/:submission_id/grade` — Submit rubric grading
- `GET /api/marga-scores/:user_id/:pertemuan_id` — Get marga scores

### Progress
- `GET /api/student/:user_id/marga-progress` — Overall marga progress
- `GET /api/pertemuan/:p_id/marga-summary` — Class summary
- `GET /api/student/:user_id/pertemuan/:p_id/report` — Detailed report

## Data Models

### Pertemuan Marga Config
```javascript
{
  pertemuan_id: "p01",
  marga_active: ["jnana", "karma", "raja"],
  marga_details: {
    jnana: {
      role: "Inquiry Kritis — Pemahaman Analitis",
      weight: 50,
      aktivitas: [
        { id: "akt-jnana-1", desc: "...", type: "quiz", points: 25 },
        { id: "akt-jnana-2", desc: "...", type: "essay", points: 25 }
      ]
    }
  }
}
```

### Student Aktivitas Submission
```javascript
{
  user_id: "user123",
  pertemuan_id: "p01",
  aktivitas_id: "akt-jnana-1",
  status: "submitted", // pending, graded
  submission: {
    content: "Student's quiz answers / essay / reflection",
    submitted_at: timestamp
  },
  score: {
    raw_points: 22,
    max_points: 25,
    graded_by: "dosen123",
    rubric_scores: { c1: 10, c2: 12 }
  }
}
```

### Marga Scores (Per Pertemuan)
```javascript
{
  user_id: "user123",
  pertemuan_id: "p01",
  marga_scores: {
    jnana: {
      total_points: 85,
      max_points: 100,
      weighted_score: 42.5 // 85 * 0.5
    },
    karma: { ... },
    raja: { ... }
  },
  final_score: 87.5 // sum of weighted scores
}
```

## Deployment

### Docker
```bash
docker build -t catur-marga-backend .
docker run -p 3000:3000 --env-file .env catur-marga-backend
```

### Heroku / Cloud
```bash
heroku create catur-marga-api
git push heroku main
heroku config:set MONGODB_URI=...
```

## Environment Variables

```env
PORT=3000
NODE_ENV=development
MONGODB_URI=mongodb://...
JWT_SECRET=your-secret-key
DOSEN_FRONTEND_URL=http://localhost:3001
MAHASISWA_FRONTEND_URL=http://localhost:3002
```

## Testing

```bash
npm test                       # Run all tests
npm run test:watch            # Watch mode
npm run test:coverage         # Coverage report
```

## Integration with Frontend

The LMS frontend (`mahasiswa/`, `dosen/kelola-pertemuan.html`) communicates with this backend via REST API:

- **Dosen**: Set pertemuan-marga config, view submissions, grade rubrics
- **Mahasiswa**: Submit aktivitas, view own progress & scores
- **Admin**: Manage rubrics, view reports, recalculate scores

## License

MIT
