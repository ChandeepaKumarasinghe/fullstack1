FROM node:22

WORKDIR /usr/src/app
COPY backend/package.json backend/package-lock.json ./
RUN npm ci

COPY backend .
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci

COPY frontend .

EXPOSE 5135

CMD ["npm", "start"]
