
FROM node:16 AS backend

WORKDIR /app


COPY backend/package*.json ./


RUN npm install


COPY backend/ .


FROM node:16 AS frontend


WORKDIR /frontend


COPY frontend/package*.json ./


RUN npm install


COPY frontend/ .


RUN npm run build


FROM node:16

WORKDIR /app


COPY --from=backend /app /app


COPY --from=frontend /frontend/build /app/frontend/build

# Expose the backend port 
EXPOSE 5135

# Start the backend server (adjust to your backend entry point)
CMD ["npm", "start"]
