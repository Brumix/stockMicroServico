FROM node:14-alpine

# Use /app as CWD
WORKDIR /app

ENV PORT=3000

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm i --only=production

# Copy transpiled js from builder stage into the final image
COPY . .

#create the prisma client
RUN npx prisma generate

# Open desired port
EXPOSE $PORT

#run the migrations
CMD ["npx","prisma","migrate","dev","--name","init"]

# Use js files to run the application
ENTRYPOINT ["node", "server.js"]
