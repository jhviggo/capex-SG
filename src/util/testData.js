const devModel = require('../models/developer');
const projectModel = require('../models/project'); 

let devs = [
    new devModel.Developer('Kristian', 'Free', 'pleb'),
    new devModel.Developer('Kristoffer', 'Free', 'CSGO PRO'),
    new devModel.Developer('Kasper', 'Free', 'GUDEN'),
]

let projects = [
    new projectModel.Project('Tonse Project', new Date(), new Date(2020, 4, 2), 50),
    new projectModel.Project('Det lille project', new Date(), new Date(2020, 4, 11), 10)
]

module.exports = {
    devs,
    projects
}