#!/bin/bash

echo "Running Sequelize migrations..."
npx sequelize-cli db:migrate --config config/config.js
if [ $? -ne 0 ]; then
  echo "Migration failed!"
  exit 1
fi

echo "Running Sequelize seeders..."
npx sequelize-cli db:seed:all --config config/config.js
if [ $? -ne 0 ]; then
  echo "Seeding failed!"
  exit 1
fi

echo "Starting the application..."
npm start
