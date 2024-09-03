const dotenv = require("dotenv");

const express = require('express');
const cors = require('cors');
const app = express();

dotenv.config({ path: './config.env' });

require('./db/conn');
// const User = require('./models/userSchema');

app.use(cors({
  origin: '*', // Allow requests from this origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  allowedHeaders: ['Content-Type'], // Allow these headers
}));

app.use(express.json());


const index = require('./routers/index');
const home = require('./routers/home');

app.use('/', index);

app.use('/home', home);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log("runing", PORT);
})

// console.log("hhelo")