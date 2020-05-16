const express = require('express');
const router = express.Router();

const controller = require('../controllers/controller');

router.get('/:name', async (req, res) => {
    let project = await controller.getProject(req.params.name);

    res.render('project-details', { data: project });
});

module.exports = router;