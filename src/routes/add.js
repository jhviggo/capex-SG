const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');
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

router.post('/developer', (req, res) => {
    console.log(req.body);

    if (req.body.name !== undefined
        && req.body.status !== undefined
        && req.body.rank !== undefined) {
            controller.createDeveloper(req.body.name, req.body.status, req.body.rank);
            res.status(200)
                .send("Developer saved!")
        }
    else {
        res.status(400)
            .send("Invalid request")
    }
});

module.exports = router;