const assert = require('chai').assert;
const devModel = require('../src/models/developer');
const projectModel = require('../src/models/project');

let dev = new devModel.Developer('Kristian', 'Free', 'pleb');
let project = new projectModel.Project('Tonse Project', new Date(), new Date(2020, 4, 2), 50);
let TTT = new projectModel.Project('Det lille project', new Date(), new Date(2020, 4, 11), 10);


let vac1 = 'Vacation1';
let vac2 = 'Vacation2';

describe('developer', function(){
    it('addProject should add the project to the developers list of current projects', function(){
        dev.addProject(project);
        assert.isTrue(dev._currentProjects.includes(project));
    });
    it('deleteProject should delete the project from the list', function(){
        dev.deleteProject(project);
        assert.isFalse(dev._currentProjects.includes(project));
    });
    it('The developers list of projects should contain two projects', function(){
        dev.addProject(project);
        dev.addProject(TTT);
        assert.isTrue(dev._currentProjects.length === 2);
        assert.isTrue(dev._currentProjects.includes(project));
        assert.isTrue(dev._currentProjects.includes(TTT));
    });
    it('project will be deleted and TTT should remain in the list', function(){
        dev.deleteProject(project);
        assert.isFalse(dev._currentProjects.includes(project));
        assert.isTrue(dev._currentProjects.includes(TTT));
        assert.isTrue(dev._currentProjects.length === 1);
    });
    it('addVacationDay should add the vacation to the list of vacation days', function(){
        dev.addVacationDay(vac1);
        assert.isTrue(dev._vacationDays.includes(vac1));
    });
    it('deleteVacationDay should remove the vacation from the list', function(){
        dev.deleteVacationDay(vac1);
        assert.isFalse(dev._vacationDays.includes(vac1));
    });
    it('The list of vacation days should contain two vacations', function(){
        dev.addVacationDay(vac1);
        dev.addVacationDay(vac2);
        assert.isTrue(dev._vacationDays.length === 2);
        assert.isTrue(dev._vacationDays.includes(vac1));
        assert.isTrue(dev._vacationDays.includes(vac2));
    });
    it('vac1 will be deleted and vac2 should remain in the list', function(){
        dev.deleteVacationDay(vac1);
        assert.isFalse(dev._vacationDays.includes(vac1));
        assert.isTrue(dev._vacationDays.includes(vac2));
        assert.isTrue(dev._vacationDays.length === 1);
    });
})