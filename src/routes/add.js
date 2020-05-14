const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

const devs = require('../util/testData').devs;

router.get('/project', (req, res) => {
    res.render('add-project', { devs });
});

router.post('/project', (req, res) => {
    let name = req.body.name;
    let startDate = req.body.startDate;
    let endDate = req.body.endDate;
    let estimatedHours = req.body.hours;

    if( name != undefined && 
        startDate != undefined && 
        endDate != undefined && 
        estimatedHours != undefined) {

        //Dates take an ISO formated string to convert it into a Date object
        startDate = new Date(startDate);
        endDate = new Date(endDate);
        
        if (startDate < endDate) {
            controller.createProject(name, startDate, endDate, estimatedHours);
            res.sendStatus(200);
        }
        else {
            throw new Error("Start Date must be lesser than End Date");
        }
    }
    else {
        res.status(400).send("All fields must be filled");
    }
    
    res.end();
});

router.get('/developer', (req, res) => {
    res.render('add-developer');
});

router.post('/developer', (req, res) => {
    console.log(req.body);

    if (req.body.name !== undefined
        && req.body.status !== undefined
        && req.body.rank !== undefined) {
            controller.createDeveloper(req.body.name, req.body.status, req.body.rank, req.body.vacationDays);
            res.status(200)
                .send("Developer saved!")
        }
    else {
        res.status(400)
            .send("Invalid request")
    }
});

module.exports = router;