#Node JS - Building
FROM node:16-alpine as expressjs_build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

#Sets node environment for production
ENV NODE_ENV production

EXPOSE 3000

CMD [ "node", "index.js" ]