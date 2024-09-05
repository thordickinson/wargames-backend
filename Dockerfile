FROM node:20.10.0-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code to the working directory
COPY . .

# Step 6: Compile TypeScript sources
RUN npm run build

# Step 7: Expose the port your app runs on
EXPOSE 3000

# Step 8: Define the command to run the application
CMD ["node", "dist/server.js"]



