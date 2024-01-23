const express = require('express');
const { Insert, Get, Update, Delete, Search } = require('../controller/test');
const router = express.Router();

router.post('/insert', Insert);
router.get('/getAll', Get);
router.patch('/update', Update);
router.delete('/delete/:Id', Delete);
router.get('/search/:name', Search);

module.exports = router;