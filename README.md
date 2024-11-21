# Node JS sequelize-cli


# Installation

# used to install
npm install express

npm install sequelize sequelize-cli mysql2   

 # The command npx sequelize-cli init initializes a Sequelize project by creating the necessary folder structure and configuration files.
npx sequelize-cli init

# INstall env
npm install dotenv

# install  for logger
npm install winston

# For Creating a Model
npx sequelize-cli model:generate --name Product --attributes name:string,price:float,categoryId:integer
npx sequelize-cli model:generate --name Category --attributes name:string



# For Migration 
npx sequelize-cli migration:generate --name
npx sequelize-cli db:migrate --config config/config.js
npx sequelize-cli db:migrate

# For Creating Seeder For all

npx sequelize-cli db:seed:all --config config/config.js
npx sequelize-cli db:seed --seed 20241120113621-create-role.js --config config/config.js


# For Creating Seeder For Each table

npx sequelize-cli seed:generate --name demo-categories
npx sequelize-cli seed:generate --name seed-roles


# For creating secret token
require('crypto').randomBytes(32).toString('hex')