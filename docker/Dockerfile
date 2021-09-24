# Select reference image
FROM node:14-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
WORKDIR /usr/src/app
RUN mkdir node_modules

# Copy project files into the docker image
COPY . .

# 
EXPOSE 8008

#bootstrap lerna
RUN npm set progress=false && npm install 
RUN npm set progress=false && npm run bootstrap 
RUN npm set progress=false && npm run build --production

#server start
WORKDIR /usr/src/app/packages/server
ENTRYPOINT ["npm", "run", "start"]
