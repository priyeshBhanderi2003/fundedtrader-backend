const mongoose = require("mongoose");

const DB = process.env.DATABASE;


mongoose.connect(DB).then(() => {
    console.log('Connected to the database successfully');
}).catch((err) => console.log('Error connecting to the database:', err));