const exprees = require('express');
const bcrypt = require('bcryptjs');

const router = exprees.Router();

require('../db/conn');


router.get('/', (req, res) => {
    res.send("The Funded Trader");
});


module.exports = router;