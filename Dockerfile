# Stage 1: Build the Angular app
FROM node:18 as build

# Set the working directory inside the container
WORKDIR /app


# copy package
COPY package*.json ./

# Install all the dependencies
RUN npm install

# Copy all of the remaining files
COPY . .

# Build the Angular app
RUN npm run build


# Stage 2: Serve the Angular app using Nginx
FROM nginx:latest

# Copy the build output from the previous stage to the nginx html directory
COPY --from=build /app/dist/meal-mate /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80

# Command to start Nginx
# CMD ["nginx", "-g", "daemon off;"]
