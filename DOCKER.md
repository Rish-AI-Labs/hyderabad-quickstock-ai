# Docker Deployment Guide

This guide explains how to run QuickStock AI in a Docker container.

## Prerequisites

- Docker installed (version 20.10 or higher)
- Docker Compose installed (version 2.0 or higher)

## Quick Start

### 1. Build and Run with Docker Compose

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

The application will be available at `http://localhost:3000`

### 2. Build and Run with Docker (without compose)

```bash
# Build the image
docker build -t quickstock-ai .

# Run the container
docker run -d \
  --name quickstock-ai \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -v $(pwd)/frontend/.env:/app/.env:ro \
  quickstock-ai

# View logs
docker logs -f quickstock-ai

# Stop the container
docker stop quickstock-ai
docker rm quickstock-ai
```

## Environment Configuration

### Option 1: Using .env file (Recommended)

Create or update `frontend/.env` with your credentials:

```env
# AWS Bedrock (Production AI)
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
BEDROCK_MODEL_ID=anthropic.claude-3-sonnet-20240229-v1:0

# Google Gemini (Fallback AI)
GEMINI_API_KEY=your_gemini_api_key

# Server Configuration
PORT=3000
NODE_ENV=production
```

The docker-compose.yml will automatically mount this file.

### Option 2: Using Environment Variables

Set environment variables in your shell:

```bash
export AWS_ACCESS_KEY_ID=your_aws_access_key
export AWS_SECRET_ACCESS_KEY=your_aws_secret_key
export AWS_REGION=us-east-1
export GEMINI_API_KEY=your_gemini_api_key

docker-compose up -d
```

## Docker Commands

### View Container Status
```bash
docker-compose ps
```

### View Logs
```bash
# All logs
docker-compose logs

# Follow logs in real-time
docker-compose logs -f

# Last 100 lines
docker-compose logs --tail=100
```

### Restart Container
```bash
docker-compose restart
```

### Rebuild After Code Changes
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

### Execute Commands Inside Container
```bash
# Open shell
docker-compose exec quickstock-ai sh

# Check health
docker-compose exec quickstock-ai wget -qO- http://localhost:3000/health
```

## Health Check

The container includes a health check that runs every 30 seconds:

```bash
# Check health status
docker inspect --format='{{.State.Health.Status}}' quickstock-ai
```

Status values:
- `starting` - Container is starting up
- `healthy` - Container is running properly
- `unhealthy` - Container has issues

## Troubleshooting

### Container won't start

1. Check logs:
```bash
docker-compose logs
```

2. Verify port 3000 is not in use:
```bash
lsof -i :3000
```

3. Check environment variables:
```bash
docker-compose exec quickstock-ai env
```

### AI features not working

1. Verify credentials are set:
```bash
docker-compose exec quickstock-ai sh -c 'echo $AWS_ACCESS_KEY_ID'
```

2. Check if .env file is mounted:
```bash
docker-compose exec quickstock-ai cat .env
```

### Build fails

1. Clear Docker cache:
```bash
docker system prune -a
```

2. Rebuild without cache:
```bash
docker-compose build --no-cache
```

## Production Deployment

For production deployment, consider:

1. **Use secrets management** instead of .env files
2. **Set up reverse proxy** (nginx) for SSL/TLS
3. **Configure resource limits** in docker-compose.yml:

```yaml
services:
  quickstock-ai:
    # ... other config
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
        reservations:
          cpus: '1'
          memory: 1G
```

4. **Enable logging driver**:

```yaml
services:
  quickstock-ai:
    # ... other config
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Stopping and Cleanup

```bash
# Stop containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Remove images
docker rmi quickstock-ai

# Complete cleanup
docker system prune -a
```

## Support

For issues or questions:
1. Check logs: `docker-compose logs -f`
2. Verify health: `docker inspect quickstock-ai`
3. Review environment variables
4. Check network connectivity
