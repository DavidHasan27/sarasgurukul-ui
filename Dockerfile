# FROM node:lts-alpine as build 

# WORKDIR /app

# COPY package*.json .
# RUN npm install 
# COPY . .
# RUN npm run build

# FROM nginx
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf 

# COPY --from=build /app/build /usr/share/nginx/html 
# CMD ["nginx", "-g", "daemon off;"]

# Use an official Node runtime as a parent image
FROM node:19-alpine as build
# Set the working directory to /app
WORKDIR /app
# Copy the package.json and package-lock.json to the container
COPY package*.json ./
# Install dependencies
RUN npm install
# Copy the rest of the application code to the container
COPY . .
# Build the React app
RUN npm run build
# Use an official Nginx runtime as a parent image
FROM nginx:1.21.0-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
# Copy the ngnix.conf to the container
# COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
# Copy the React app build files to the container
COPY --from=build /app/build .
# Expose port 80 for Nginx
EXPOSE 80
# Start Nginx when the container starts
CMD ["nginx", "-g", "daemon off;"]