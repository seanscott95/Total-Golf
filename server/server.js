const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./utils/errorMiddleware');
const connectDB = require('./config/db');
const routes = require('./routes')

const PORT = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () =>  console.log(`API server running on port ${PORT}!`));