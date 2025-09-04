FROM node:18-alpine

WORKDIR /usr/src/app

# Copy package files
COPY apps/frontend/package*.json ./
COPY package*.json ../

# Install dependencies
RUN npm install

# Copy source code
COPY apps/frontend .

EXPOSE 3000

CMD ["npm", "run", "dev"]
