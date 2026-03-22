# Publishing to GitHub

## Prerequisites
- GitHub account
- Git installed locally
- SSH keys set up (recommended) or Personal Access Token

## Steps to Publish

### 1. Create Repository on GitHub

```bash
# Go to https://github.com/new
# Repository name: catur-marga-backend
# Description: Catur Marga Grading System Backend for LMS
# Visibility: Public
# Initialize with README: No (we already have one)
# License: MIT
# Click "Create repository"
```

### 2. Add Remote and Push

```bash
# Copy the HTTPS or SSH URL from your new repository

# In the catur-marga-backend directory:

# Initialize git if not already done
git init

# Add all files
git add .

# Initial commit
git commit -m "Initial commit: Backend infrastructure for Catur Marga grading system"

# Add remote (replace with your actual repo URL)
git remote add origin https://github.com/YOUR_USERNAME/catur-marga-backend.git

# Create main branch and push
git branch -M main
git push -u origin main
```

### 3. Verify

```bash
# Check remote
git remote -v

# Should show:
# origin  https://github.com/YOUR_USERNAME/catur-marga-backend.git (fetch)
# origin  https://github.com/YOUR_USERNAME/catur-marga-backend.git (push)
```

## GitHub Pages Documentation

```bash
# Create docs directory
mkdir docs

# Add documentation files
echo "# API Documentation" > docs/API.md

# Push to GitHub
git add docs/
git commit -m "Add documentation"
git push

# Enable GitHub Pages:
# 1. Go to Settings → Pages
# 2. Source: main branch, /docs folder
# 3. Save
# Docs available at: https://YOUR_USERNAME.github.io/catur-marga-backend/
```

## GitHub Secrets (for Actions)

```bash
# Go to Settings → Secrets and variables → Actions
# Add the following:

# MONGODB_ATLAS_URI
mongodb+srv://username:password@cluster.mongodb.net/catur-marga-lms

# JWT_SECRET
your-super-secret-key

# DOCKER_REGISTRY_USERNAME
your-docker-username

# DOCKER_REGISTRY_PASSWORD
your-docker-password
```

## GitHub Actions CI/CD

After pushing, CI/CD will automatically:
1. Run lint checks
2. Run tests with MongoDB
3. Upload coverage reports
4. Deploy on main branch push

Monitor at: `https://github.com/YOUR_USERNAME/catur-marga-backend/actions`

## Branch Strategy

```bash
# Main development
git checkout -b develop
git push -u origin develop

# Feature branches
git checkout -b feature/your-feature-name

# After development
git push -u origin feature/your-feature-name
# Create Pull Request on GitHub
# After merge, delete branch
```

## Releases

```bash
# Create a release
git tag -a v1.0.0 -m "Initial release"
git push origin v1.0.0

# On GitHub: Releases tab, create from tag
# Add release notes
```

## README Badge

Add to README.md:

```markdown
[![CI/CD](https://github.com/YOUR_USERNAME/catur-marga-backend/workflows/CI%2FCD/badge.svg)](https://github.com/YOUR_USERNAME/catur-marga-backend/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js Version](https://img.shields.io/badge/Node.js-18+-brightgreen)](https://nodejs.org/)
```

## Contributing

Create CONTRIBUTING.md:

```markdown
# Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request
6. Wait for CI/CD to pass
7. Reviewers will merge
```

## Useful Links

- Repository: `https://github.com/YOUR_USERNAME/catur-marga-backend`
- Issues: `https://github.com/YOUR_USERNAME/catur-marga-backend/issues`
- Pull Requests: `https://github.com/YOUR_USERNAME/catur-marga-backend/pulls`
- Actions: `https://github.com/YOUR_USERNAME/catur-marga-backend/actions`
- GitHub Pages (if enabled): `https://YOUR_USERNAME.github.io/catur-marga-backend/`

