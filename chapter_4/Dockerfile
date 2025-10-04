FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

# Copy the rest of the app code, including prisma/schema.prisma
COPY . .

# Now that schema.prisma is in the container, generate the Prisma client
RUN npx prisma generate

EXPOSE 5000

CMD ["node", "./src/server.js"]
