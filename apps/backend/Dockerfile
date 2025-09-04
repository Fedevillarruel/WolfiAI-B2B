FROM node:18-alpine

# Install pnpm
RUN corepack enable

WORKDIR /usr/src/app

# Copy entire project to maintain workspace structure
COPY . .

# Install all dependencies in workspace root
RUN pnpm install --no-frozen-lockfile

# Generate Prisma client from backend directory
WORKDIR /usr/src/app/apps/backend
RUN pnpm prisma generate

EXPOSE 3001

CMD ["pnpm", "run", "start:dev"]
