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

const importData = async () => {
    await Bootcamp.create(bootcamps);

    console.log('data imported...'.green.inverse);
    process.exit();
}

// Delete data

const deleteData = async () => {
    await Bootcamp.deleteMany();

    console.log('data destroyed...'.red.inverse);
    process.exit();
}

if(process.argv[2] === '-i') {
    importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}

// I **** *o*
