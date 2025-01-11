# Step 1: Set up the backend (Node.js/Express)
FROM node:16 AS backend

WORKDIR /app

COPY backend/package*.json ./
RUN npm install
COPY backend/ .

# Step 2: Set up the frontend (React)
FROM node:16 AS frontend

WORKDIR /frontend

COPY frontend/package*.json ./
RUN npm install

# Debugging: Check if dependencies installed properly
RUN npm list --depth=0

COPY frontend/ .

# Run the build
RUN npm run build

# Step 3: Set up the final image with both frontend and backend
FROM node:16

WORKDIR /app

COPY --from=backend /app /app
COPY --from=frontend /frontend/build /app/frontend/build

EXPOSE 5135

CMD ["npm", "start"]
