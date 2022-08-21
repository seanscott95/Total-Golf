const express = require('express');
require('dotenv').config({ path: '../.env'});
const { errorHandler } = require('./utils/errorMiddleware');
const connectDB = require('./config/db');
const routes = require('./routes');
const path = require('path');

const PORT = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`API server running on port ${PORT}!`));