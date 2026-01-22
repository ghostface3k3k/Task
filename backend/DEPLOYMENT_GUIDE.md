# HR Management System Backend - Deployment Guide

## 🎯 Production Deployment Checklist

### 1. Environment Configuration

Create a `.env` file in production with:

```bash
# Production Port
PORT=3000

# Production CORS (replace with your actual frontend domains)
CORS_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://app.yourdomain.com
```

### 2. Build the Application

```bash
npm install --production
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 3. Start Production Server

```bash
npm run start:prod
```

Or use a process manager like PM2:

```bash
npm install -g pm2
pm2 start dist/main.js --name hr-backend
pm2 save
pm2 startup
```

### 4. Security Best Practices

#### CORS Configuration
- ✅ Always set specific domains in `CORS_ORIGINS`
- ❌ Never use `origin: true` in production
- ✅ Use HTTPS domains only in production

#### Environment Variables
- ✅ Keep `.env` files out of version control
- ✅ Use secure secret management (AWS Secrets Manager, Azure Key Vault, etc.)
- ✅ Validate all environment variables at startup

#### GraphQL Security
- ✅ Disable playground in production (set `playground: false` in app.module.ts)
- ✅ Enable query complexity limits
- ✅ Implement rate limiting
- ✅ Add authentication/authorization middleware

### 5. Performance Optimization

#### Enable Production Mode
NestJS automatically optimizes for production when `NODE_ENV=production`

```bash
NODE_ENV=production npm run start:prod
```

#### Add Caching
Consider adding Redis for caching frequently accessed data:

```typescript
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 300, // 5 minutes
      max: 100,
    }),
    // ... other imports
  ],
})
```

#### Database Migration
For production, replace JSON file with a real database:
- PostgreSQL (recommended)
- MongoDB
- MySQL

### 6. Monitoring & Logging

#### Structured Logging
Replace `console.log` with proper logging:

```bash
npm install winston nest-winston
```

#### Health Checks
Add health check endpoints:

```bash
npm install @nestjs/terminus
```

### 7. Docker Deployment

Create `Dockerfile`:

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/src/data ./src/data
EXPOSE 3000
CMD ["node", "dist/main"]
```

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  hr-backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - PORT=3000
      - CORS_ORIGINS=https://yourdomain.com
      - NODE_ENV=production
    restart: unless-stopped
```

Run:
```bash
docker-compose up -d
```

### 8. Cloud Deployment Options

#### AWS
- **Elastic Beanstalk**: Easy deployment for Node.js apps
- **ECS/Fargate**: Container-based deployment
- **Lambda + API Gateway**: Serverless option

#### Azure
- **App Service**: Managed Node.js hosting
- **Container Instances**: Docker deployment
- **Functions**: Serverless deployment

#### Google Cloud
- **App Engine**: Managed platform
- **Cloud Run**: Container deployment
- **Kubernetes Engine**: Full orchestration

#### Heroku
Simple deployment:
```bash
heroku create hr-management-backend
git push heroku main
heroku config:set CORS_ORIGINS=https://yourdomain.com
```

### 9. SSL/TLS Configuration

Always use HTTPS in production. Options:
- Let's Encrypt (free SSL certificates)
- CloudFlare (proxy with SSL)
- AWS Certificate Manager
- Nginx reverse proxy with SSL

### 10. Testing Before Production

```bash
# Run all tests
npm test

# Load testing
npm install -g artillery
artillery quick --count 100 --num 10 http://localhost:3000/graphql
```

## 📊 Monitoring Recommendations

1. **Application Performance Monitoring (APM)**
   - New Relic
   - DataDog
   - Elastic APM

2. **Error Tracking**
   - Sentry
   - Rollbar
   - Bugsnag

3. **Infrastructure Monitoring**
   - Prometheus + Grafana
   - CloudWatch (AWS)
   - Azure Monitor

## 🔐 Security Summary

✅ **No vulnerabilities detected by CodeQL**
- All code passed security scanning
- CORS properly configured with environment variables
- Error handling implemented with detailed logging
- No sensitive data exposed in error messages

## 📝 Post-Deployment Checklist

- [ ] Verify CORS is working with frontend
- [ ] Test all GraphQL queries and mutations
- [ ] Monitor server logs for errors
- [ ] Set up automated backups (if using database)
- [ ] Configure monitoring and alerts
- [ ] Document API endpoints for frontend team
- [ ] Set up CI/CD pipeline
- [ ] Enable HTTPS/SSL
- [ ] Configure firewall rules
- [ ] Set up automated testing in CI

## 🆘 Troubleshooting

### Server won't start
- Check if port 3000 is available: `lsof -i :3000`
- Verify environment variables are set
- Check logs in `pm2 logs` or console output

### CORS errors
- Verify `CORS_ORIGINS` includes your frontend domain
- Ensure protocol (http/https) matches
- Check if credentials are needed

### GraphQL errors
- Enable playground temporarily: `playground: true`
- Check schema is valid
- Verify data file exists and is readable

## 📞 Support

For issues or questions:
1. Check application logs
2. Review this deployment guide
3. Consult NestJS documentation
4. Check GraphQL documentation

