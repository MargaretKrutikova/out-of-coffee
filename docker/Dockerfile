# Select reference image
FROM node:14-alpine

# This is optional. Sets the level of logging that you see
ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory

RUN mkdir -p /usr/src/app/node_modules
WORKDIR /usr/src/app

# Copy project files into the docker image
COPY . .

# 
EXPOSE 8008
EXPOSE 3000

RUN npm install -g pnpm

RUN cd /usr/src/app/packages/client && pnpm install && pnpm build --production && cd ../server && pnpm install
 
#ALL start
WORKDIR /usr/src/app/packages/client
CMD ["npm", "run", "start"]
WORKDIR /usr/src/app/packages/server
ENTRYPOINT ["npm", "run", "start"]
