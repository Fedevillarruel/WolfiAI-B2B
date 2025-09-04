FROM node:18-alpine

# Install pnpm
RUN corepack enable

WORKDIR /usr/src/app

# Copy entire project to maintain workspace structure
COPY . .

# Install all dependencies in workspace root
RUN pnpm install --no-frozen-lockfile

# Change to frontend directory
WORKDIR /usr/src/app/apps/frontend

EXPOSE 3000

CMD ["pnpm", "run", "dev"]
