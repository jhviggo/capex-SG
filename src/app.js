const express = require('express');
const app = express();
const addRoute = require('./routes/add');
const Holidays = require('date-holidays');
const hd = new Holidays();

hd.init('DK');

app.use(express.static('src/assets'));

app.set('views', 'src/views');
app.set('view engine', 'pug');

const port = process.env.PORT || 8080;

// Example data
const projects = [
    {
        name: 'Bilka',
        weeks: [{class: 'week-green'}, {class: 'week-yellow'}, {class: 'week-red'}, {}, {}, {}]
    },
    {
        name: 'BR',
        weeks: [{}, {}]
    }
] // ------

app.get('/', (req, res) => {
    res.render('project-overview', {projects: projects})
});

app.use('/add', addRoute);

app.listen(port, () => console.log(`Running on port ${port}...`));



