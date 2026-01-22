# Deployment Guide

This guide covers deploying the HR Management System to production.

## Prerequisites

- Git repository access
- PostgreSQL database (Cloud provider: Heroku, Railway, Supabase, etc.)
- Node.js hosting (Heroku, Railway, Render, DigitalOcean, etc.)
- Static hosting for frontend (Vercel, Netlify, Cloudflare Pages, etc.)

---

## Backend Deployment

### Option 1: Railway (Recommended)

Railway provides easy deployment with PostgreSQL included.

#### Steps:

1. **Create Railway Account**
   - Go to https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   ```bash
   # Install Railway CLI
   npm i -g @railway/cli
   
   # Login
   railway login
   
   # Initialize project
   cd backend
   railway init
   ```

3. **Add PostgreSQL**
   - In Railway dashboard, click "New"
   - Select "Database" → "PostgreSQL"
   - Copy connection details

4. **Set Environment Variables**
   ```bash
   railway variables set NODE_ENV=production
   railway variables set PORT=4000
   railway variables set JWT_SECRET=your-production-secret-key
   railway variables set CORS_ORIGIN=https://your-frontend-domain.com
   
   # PostgreSQL variables (Railway provides these automatically)
   # DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE
   ```

5. **Deploy**
   ```bash
   railway up
   ```

6. **Get Deployment URL**
   ```bash
   railway domain
   ```

### Option 2: Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login and Create App**
   ```bash
   heroku login
   cd backend
   heroku create your-app-name
   ```

3. **Add PostgreSQL**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set JWT_SECRET=your-production-secret-key
   heroku config:set CORS_ORIGIN=https://your-frontend-domain.com
   ```

5. **Create Procfile**
   ```bash
   echo "web: npm run start:prod" > Procfile
   ```

6. **Deploy**
   ```bash
   git push heroku main
   ```

### Option 3: Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   # backend/Dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm ci --only=production
   
   COPY . .
   RUN npm run build
   
   EXPOSE 4000
   
   CMD ["npm", "run", "start:prod"]
   ```

2. **Create docker-compose.yml**
   ```yaml
   version: '3.8'
   
   services:
     postgres:
       image: postgres:15
       environment:
         POSTGRES_DB: hr_management
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: ${DB_PASSWORD}
       volumes:
         - postgres_data:/var/lib/postgresql/data
       ports:
         - "5432:5432"
     
     backend:
       build: ./backend
       ports:
         - "4000:4000"
       environment:
         NODE_ENV: production
         DB_HOST: postgres
         DB_PORT: 5432
         DB_USERNAME: postgres
         DB_PASSWORD: ${DB_PASSWORD}
         DB_DATABASE: hr_management
         JWT_SECRET: ${JWT_SECRET}
         CORS_ORIGIN: ${CORS_ORIGIN}
       depends_on:
         - postgres
   
   volumes:
     postgres_data:
   ```

3. **Deploy**
   ```bash
   docker-compose up -d
   ```

---

## Frontend Deployment

### Option 1: Vercel (Recommended)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Configure Build**
   Create `vercel.json`:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "framework": "vite"
   }
   ```

3. **Set Environment Variable**
   Create `.env.production`:
   ```env
   VITE_API_URL=https://your-backend-url.railway.app/graphql
   ```

4. **Deploy**
   ```bash
   cd frontend
   vercel --prod
   ```

### Option 2: Netlify

1. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

2. **Create netlify.toml**
   ```toml
   [build]
     command = "npm run build"
     publish = "dist"
   
   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

3. **Deploy**
   ```bash
   cd frontend
   netlify deploy --prod
   ```

### Option 3: Cloudflare Pages

1. **Connect GitHub Repository**
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository

2. **Configure Build Settings**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `frontend`

3. **Set Environment Variables**
   - VITE_API_URL: Your backend GraphQL endpoint

4. **Deploy**
   - Click "Save and Deploy"

---

## Database Migration for Production

### Using TypeORM Migrations

1. **Generate Migration**
   ```bash
   cd backend
   npm run typeorm migration:generate -- -n InitialSchema
   ```

2. **Run Migration**
   ```bash
   npm run typeorm migration:run
   ```

3. **Revert if Needed**
   ```bash
   npm run typeorm migration:revert
   ```

### Manual Database Setup

```sql
-- Create database
CREATE DATABASE hr_management;

-- Connect to database
\c hr_management;

-- Tables will be created automatically by TypeORM synchronize
-- In production, set synchronize: false and use migrations
```

---

## Environment Variables

### Backend (.env.production)
```env
NODE_ENV=production
PORT=4000

# Database
DB_TYPE=postgres
DB_HOST=your-db-host.com
DB_PORT=5432
DB_USERNAME=your-db-user
DB_PASSWORD=your-secure-password
DB_DATABASE=hr_management

# JWT - Use strong secret!
JWT_SECRET=very-secure-random-string-min-32-characters
JWT_EXPIRATION=1d

# CORS
CORS_ORIGIN=https://your-frontend-domain.com
```

### Frontend (.env.production)
```env
VITE_API_URL=https://your-backend-domain.com/graphql
```

---

## SSL/HTTPS Setup

### Backend
Most cloud providers (Railway, Heroku) provide SSL automatically.

For custom domains:
```bash
# Railway
railway domain add your-custom-domain.com

# Heroku
heroku domains:add your-custom-domain.com
heroku certs:auto:enable
```

### Frontend
Vercel and Netlify provide SSL automatically.

---

## Monitoring & Logging

### Backend Logging

Add production logger:
```bash
npm install winston
```

```typescript
// src/logger.ts
import * as winston from 'winston';

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}
```

### Error Tracking

Consider integrating:
- **Sentry**: https://sentry.io
- **LogRocket**: https://logrocket.com
- **DataDog**: https://www.datadoghq.com

---

## Performance Optimization

### Backend
1. **Enable compression**
   ```bash
   npm install compression
   ```
   
   ```typescript
   // main.ts
   import * as compression from 'compression';
   app.use(compression());
   ```

2. **Add caching**
   ```bash
   npm install @nestjs/cache-manager cache-manager
   ```

3. **Database connection pooling**
   Already configured in TypeORM

### Frontend
1. **Code splitting** - Already handled by Vite
2. **Lazy loading routes**
   ```typescript
   const Dashboard = lazy(() => import('./pages/Dashboard'));
   ```

3. **Optimize images** - Use WebP format
4. **Enable CDN** - Cloudflare, Fastly

---

## Security Checklist

- [ ] Change JWT_SECRET to strong random string
- [ ] Enable HTTPS/SSL on all endpoints
- [ ] Set secure CORS origins
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Implement refresh tokens
- [ ] Add input validation
- [ ] Enable helmet.js for security headers
- [ ] Use httpOnly cookies for tokens
- [ ] Implement CSRF protection
- [ ] Regular security audits
- [ ] Keep dependencies updated

---

## Health Checks

### Backend Health Endpoint

```typescript
// src/health/health.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class HealthController {
  @Get()
  check() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
```

---

## Backup Strategy

### Database Backups

**Automated (Railway/Heroku):**
- Enable automatic backups in dashboard
- Retention: 7-30 days

**Manual Backup:**
```bash
pg_dump -h hostname -U username -d hr_management > backup.sql
```

**Restore:**
```bash
psql -h hostname -U username -d hr_management < backup.sql
```

---

## Rollback Procedure

### Backend
```bash
# Railway
railway rollback

# Heroku
heroku releases
heroku rollback v123
```

### Frontend
```bash
# Vercel
vercel rollback

# Netlify - Use dashboard
```

---

## Scaling

### Horizontal Scaling
- Add more backend instances (load balancer)
- Database read replicas
- CDN for static assets

### Vertical Scaling
- Increase server resources
- Upgrade database plan
- Optimize queries

---

## Cost Estimation

### Free Tier Options
- **Backend**: Railway ($5/month), Render (Free)
- **Database**: Railway (Free with limits), Supabase (Free)
- **Frontend**: Vercel (Free), Netlify (Free)

### Paid Tier (Small App)
- **Backend**: Railway Starter ($5-20/month)
- **Database**: Managed PostgreSQL ($10-50/month)
- **Frontend**: Vercel Pro ($20/month)
- **Total**: $35-90/month

---

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Railway
        run: |
          npm i -g @railway/cli
          railway up
        env:
          RAILWAY_TOKEN: ${{ secrets.RAILWAY_TOKEN }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        run: |
          npm i -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}
```

---

## Support & Maintenance

- Monitor error rates daily
- Review logs weekly
- Update dependencies monthly
- Security patches immediately
- Performance review quarterly
- Backup verification monthly

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [Railway Docs](https://docs.railway.app)
- [Vercel Docs](https://vercel.com/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
