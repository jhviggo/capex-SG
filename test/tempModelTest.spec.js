const devModel = require('../src/models/developer');
const projectModel = require('../src/models/project'); 
require('../src/util/dateUtil');

let devs = [
    new devModel.Developer('123', 'Kristian', 'Free', 'pleb'),
    new devModel.Developer('111', 'Kristoffer', 'Free', 'CSGO PRO'),
    new devModel.Developer('222', 'Kasper', 'Free', 'GUDEN'),
]

let projects = [
    new projectModel.Project('1', 'Tonse Project', new Date(), new Date(2020, 4, 2), 50),
    new projectModel.Project('2', 'Det lille project', new Date(), new Date(2020, 4, 11), 10)
]

devs[0].addProject(projects[0]);
devs[1].addProject(projects[0]);
devs[2].addProject(projects[0]);

devs[0].addProject(projects[1]);

console.log(projects[0].weeksEfficiency(18));
console.log(projects[0].weekColorCode());
console.log(projects[1].weeksEfficiency(20));