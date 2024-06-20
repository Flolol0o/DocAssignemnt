# Use the Node.js 22 image based on Alpine Linux as the base image
FROM node:22-alpine

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json and package-lock.json (if exists) from the host to the working directory in the container
COPY package*.json ./

# Run npm install to install dependencies specified in package.json
RUN npm install

# Copy all files from the current directory on the host to the working directory in the container
COPY . .

# Expose port 3000 to allow communication to/from the container
EXPOSE 3000

# Define the command to start the application when the container starts
CMD [ "npm", "start" ]
