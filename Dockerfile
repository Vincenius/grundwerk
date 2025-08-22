# Stage 1: Build the Astro app
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install --frozen-lockfile

# Copy all project files
COPY . .

# Build the Astro app
RUN npm run build


# Stage 2: Serve with a lightweight web server
FROM node:22-alpine AS runner

WORKDIR /app

# Copy only the built files from builder
COPY --from=builder /app/dist ./dist

# Install a simple static file server
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
