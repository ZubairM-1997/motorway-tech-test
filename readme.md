Install requirements:
 - docker (https://docs.docker.com/get-docker/)

To initialize this project, run `docker compose up` from the root of this project. This will build and seed the database. By default the database runs on port `5432` and is also exposed on `5432`, if you want to change this you can update `docker-compose.yml`.

Setting up the Express Application
 
1) enter npm install to get the dependancies
2) create .env file at the root and enter the following variables

PORT=7000

DB_PORT=5432

HOST=localhost

DB_USER=user 

DB_PASSWORD=password

DB_NAME=motorway

3) enter the command npm run dev to start the development server

The server will then start on http://localhost:7000
