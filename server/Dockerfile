FROM node:20-slim

WORKDIR /app

COPY package*.json ./

# Install git since simple-git requires it to clone repos
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

RUN npm install --production

COPY . .

EXPOSE 5000

CMD ["npm", "start"]
