const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');  
const { log } = require('console');
const cors = require('cors');
const { authenticateToken } = require('./middleware/authMiddleware');
require('dotenv').config();


const app = express();
app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));


app.use((req, res, next) => {
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  next();
});


fs.readdirSync('./routes/').forEach(file => {
  if (file.endsWith('.js')) {
    const routePath = '/api/' + file.split('.')[0];
    const routeModule = require('./routes/' + file);
    if (routePath === '/api/auth') {
      app.use(routePath, routeModule); 
    } else {
      // app.use(routePath, authenticateToken, routeModule);
      app.use(routePath, routeModule);

    }
    console.log(`API route loaded: ${routePath}`);
  }
});


app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => log(`Hi, this is the backend for the construction app, calling from port ${PORT}`));
