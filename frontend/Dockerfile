FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
# Changed the command to use --host flag
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]