@echo off
setlocal

echo Running Db Creation...
call npx sequelize-cli db:create --env development --config config/config.js
if %errorlevel% neq 0 (
    echo Database creation failed. Exiting...
    pause
    exit /b
)

echo Running Sequelize migrations...
call npx sequelize-cli db:migrate --config config/config.js
if %errorlevel% neq 0 (
    echo Migrations failed. Exiting...
    pause
    exit /b
)

echo Running Sequelize seeders...
call npx sequelize-cli db:seed:all --config config/config.js
if %errorlevel% neq 0 (
    echo Seeders failed. Exiting...
    pause
    exit /b
)

echo Starting the application...
call npm start
if %errorlevel% neq 0 (
    echo Application failed to start. Exiting...
    pause
    exit /b
)

echo All steps completed successfully!
pause
