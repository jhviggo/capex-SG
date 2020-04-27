const express = require('express');

const app = express();

app.use(express.static('assets'));

app.set('view engine', 'pug');

// Example data
const projects = [
    {
        name: 'bilka',
        weeks: [{}, {}, {}]
    },
    {
        name: 'BR',
        weeks: [{}, {}]
    }
] // ------

app.get('/', (req, res) => {
    res.render('project-overview', {projects: projects})
});

app.listen(8080, () => console.log('Running on port 8080...'));