# define node version
ARG BUILD_VERSION=14-alpine

FROM node:${BUILD_VERSION}

# update npm version
RUN npm install -g npm@7.24.1

# create work context container
RUN mkdir -p /var/www/api

WORKDIR /var/www/api

# copy files into to container
ADD . /var/www/api

# install dependencies
RUN npm install 
RUN npm run build

# run server
CMD npm run start:prod