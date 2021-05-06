FROM node:14

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

# Use 8000 if you work without an .env-file, else change the value to the Port set in the .env-file
EXPOSE 8000

CMD ["npm", "run", "start"]
