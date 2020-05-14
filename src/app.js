const express = require('express');
const app = express();

const addRoute = require('./routes/add');

const controller = require('./controllers/controller');

const Holidays = require('date-holidays');
const hd = new Holidays();

hd.init('DK');

app.use(express.static('src/assets'));
app.use(express.json());
app.use(express.urlencoded());
app.set('views', 'src/views');
app.set('view engine', 'pug');

const port = process.env.PORT || 8080;

app.get('/', async (req, res) => {
    let projects = await controller.getAllProjects();

    res.render('project-overview', {projects: projects})
});

app.use('/add', addRoute);

app.get('/:project/:weeknumber', async (req, res) => {
    //TODO get project from database where req.params.name eqaul DB project name. (Function should be made in controller)
    let project = await controller.getProject(req.params.project);

    res.render('week-overview', {developers: project._developers, currentWeek: req.params.weeknumber});
});

app.listen(port, () => console.log(`Running on port ${port}...`));

//Used for testing purposes
module.exports = app;


