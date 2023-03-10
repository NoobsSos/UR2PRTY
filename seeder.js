const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');

// LOAD MODELS

const Bootcamp = require('./models/Bootcamp');

// CONNECT DB

mongoose
.connect('mongodb+srv://nazarmraka:qasd1234f.@traversymedia.yfxrq8i.mongodb.net/devcamper?retryWrites=true&w=majority');

// READ JSON

const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

// IMPORT INTO DB

// I **** *o*
