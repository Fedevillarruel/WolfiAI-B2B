FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY apps/backend/package*.json ./
COPY package*.json ../

# Install dependencies
RUN npm install

# Copy source code
COPY apps/backend .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 3001

CMD ["npm", "run", "start:dev"]
