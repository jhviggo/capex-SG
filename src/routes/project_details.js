const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

// Dummy data
const data = {
    name: 'Bilka',
    estimated_hours: '150',
    workers: '6',
    duration: '6 weeks',
    red_weeks: '1',
    developers: [
        {name: 'Developer 1'},
        {name: 'Developer 2'},
        {name: 'Developer 3'},
        {name: 'Developer 4'},
        {name: 'Developer 5'},
        {name: 'Developer 6'},
    ]
}

router.get('/:name', async (req, res) => {
    let project = await controller.getProject(req.params.name);

    res.render('project-details', { data: project });
});

module.exports = router;