const express = require('express');
const router = express.Router();

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

router.get('/', (req, res) => {
    res.render('project-details', { data: data });
});

module.exports = router;