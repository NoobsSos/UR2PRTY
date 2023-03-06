const mongoose = require('mongoose');

const connectDB = async () => {
    const conn = await mongoose.connect('mongodb+srv://nazarmraka:qasd1234f.@traversymedia.yfxrq8i.mongodb.net/devcamper?retryWrites=true&w=majority');

    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.underline.bold);
}

module.exports = connectDB;
