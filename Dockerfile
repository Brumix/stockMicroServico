FROM node:14-alpine

# Use /app as CWD
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm i --only=production

# Copy transpiled js from builder stage into the final image
COPY . .

#create the prisma client
RUN npx prisma generate

RUN chmod +x /app/start.sh

# Open desired port
EXPOSE $PORT

#Run setup and iniciate the app
ENTRYPOINT ["/app/start.sh"]



