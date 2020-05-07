const devModel = require('../src/models/developer');
const projectModel = require('../src/models/project'); 
require('../src/util/dateUtil');

let devs = [
    new devModel.Developer('Kristian', 'Free', 'pleb'),
    new devModel.Developer('Kristoffer', 'Free', 'CSGO PRO'),
    new devModel.Developer('Kasper', 'Free', 'GUDEN'),
]

let projects = [
    new projectModel.Project('Tonse Project', new Date(), new Date(2020, 4, 2), 50),
    new projectModel.Project('Det lille project', new Date(), new Date(2020, 4, 11), 10)
]

devs[0].addProject(projects[0]);
devs[1].addProject(projects[0]);
devs[2].addProject(projects[0]);

devs[0].addProject(projects[1]);

console.log(projects[0].weeksEfficiency(18));
console.log(projects[0].weekColorCode());
console.log(projects[1].weeksEfficiency(20));





