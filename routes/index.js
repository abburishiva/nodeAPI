var express = require('express');
    router = express.Router();


router.use('/authenticate',require('./users'));







module.exports = router;
