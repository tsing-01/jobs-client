# node:14 is the base
FROM node:14

# set working directory
WORKDIR /

# copy package.json and package-lock.json to the current working directory (i.e. 'app' folder)
COPY package*.json ./

# install dependencies
RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY . .

# expose port
EXPOSE 3000

# run app
CMD ["npm", "build"]
