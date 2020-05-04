const express = require('express');
const router = express.Router();

const devs = require('../util/testData').devs;

router.get('/project', (req, res) => {
    res.render('add-project', { devs });
});

router.post('/project', () => {
    console.log("POST project");
});

router.get('/developer', (req, res) => {
    res.render('add-developer');
});

router.post('/developer', () => {
    console.log("POST developer");
});

module.exports = router;