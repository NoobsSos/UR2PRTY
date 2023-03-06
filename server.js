const express = require('express');
const morgan = require('morgan');
const connectDB = require('./config/db');
const colors = require('colors');

// route files
const bootcamps = require('./routes/bootcamps.js');
connectDB();
//LOAD VARS
const app = express();

// Body parser

app.use(express.json());


app.use(morgan('dev'));

// Mount routers
app.use('/api/v1/bootcamps', bootcamps);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`.red);

    server.close(() => process.exit(1));
})
