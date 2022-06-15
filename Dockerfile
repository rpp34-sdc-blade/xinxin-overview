FROM node
WORKDIR /app
COPY . /app
RUN npm install
RUN npm install nodemon
CMD ["npm", "start"]