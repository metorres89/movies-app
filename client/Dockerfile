#Node JS - React JS - Building
FROM node:16-alpine as reactjs_build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json package.json
COPY package-lock.json package-lock.json

# If you are building your code for production
RUN npm ci --only=production

# Bundle app source
COPY . .

RUN npm run build

#NGINX Web Server (to serve React JS release files)
FROM nginx:1.21.5-alpine as prod_server

#This configuration solves some 'React Route' issues
COPY ./config/nginx/nginx.conf /etc/nginx/conf.d/default.conf

#--from indicates to look on the other stage named as 'reactjs_build'
COPY --from=reactjs_build /usr/src/app/build /usr/share/nginx/html

#Just documentation about which port are we intending to expose
EXPOSE 80

CMD  ["nginx", "-g", "daemon off;"]