FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3333

# CMD ["npm", "run", "migrate", ";", "npm", "run", "dev"]

CMD ["npm", "run", "dev"]