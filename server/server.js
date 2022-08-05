const express = require('express');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/scores', require('./routes/scorecardRoutes'));

app.use(errorHandler);

app.listen(PORT, () =>  console.log(`API server running on port ${PORT}!`));