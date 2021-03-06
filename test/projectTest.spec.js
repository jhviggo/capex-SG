const assert = require('chai').assert;
const devModel = require('../src/models/developer');
const projectModel = require('../src/models/project');
const dateUtil = require('../src/util/dateUtil');

let dev1, dev2, dev3, proj1, proj2, vac1;

describe('developer', () => {
    beforeEach(function(){
        dev1 = new devModel.Developer('1', 'Kristian', 'Free', 'pleb');
        dev2 = new devModel.Developer('2', 'Kristoffer', 'Free', 'CSGO PRO');
        dev3 = new devModel.Developer('3', 'Kasper', 'Free', 'GUDEN');
        proj1 = new projectModel.Project('1', 'Tonse Project', new Date(2020, 3, 20), new Date(2020, 4, 20), 50);
        proj2 = new projectModel.Project('2', 'Det lille project', new Date(2020, 3, 20), new Date(2020, 4, 28), 10);
        vac1 = new Date(2020, 4, 13);
    });

    it('addDeveloper should add the developer to the list of developers', function(){
        proj1.addDeveloper(dev1);
        assert.isTrue(proj1._developers.includes(dev1));
    });
    it('deleteDeveloper should remove the developer from the list', function(){
        proj1.addDeveloper(dev1);
        proj1.deleteDeveloper(dev1);
        assert.isFalse(proj1._developers.includes(dev1));
        assert.isTrue(proj1._developers.length === 0);
    });
    it('activeDevs should return an array containing the active devs', function(){
        // no devs on vacation
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        let result = proj1.activeDevs(20);
        assert.isTrue(result.length === 3);
    });
    it('activeDevs should return an array containing the active devs', function(){
        // dev1 and dev2 on vaction during week 20
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        dev1.addVacationDay(vac1);
        dev2.addVacationDay(vac1);
        let result = proj1.activeDevs(20);
        assert.isTrue(result.length === 1);
        assert.isTrue(result.includes(dev3));
    });
    it('activeDevs should return an array containing the active devs', function(){
        // Every dev is on vaction during week 20
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        dev1.addVacationDay(vac1);
        dev2.addVacationDay(vac1);
        dev3.addVacationDay(vac1);
        let result = proj1.activeDevs(20);
        assert.isTrue(result.length === 0);
    });
    it('weeksEfficiency no overlap', function(){
        // No overlapping projects and no devs on vacation
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        assert.equal(100, proj1.weeksEfficiency(20));
    });
    it('weeksEfficiency 1 overlap', function(){
        // 1 dev with overlapping projects
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        proj2.addDeveloper(dev1);
        assert.equal(proj1.weeksEfficiency(20).toFixed(2), (83.33).toFixed(2))
    });
    it('weeksEfficiency 2 overlap', function(){
        // 2 devs with overlapping projects
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        proj2.addDeveloper(dev1);
        proj2.addDeveloper(dev2);
        assert.equal(proj1.weeksEfficiency(20).toFixed(2), (66.66666666666667).toFixed(2));
    });
    it('weeksEfficiency 3 overlap', function(){
        // 3 devs with overlapping projects
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        proj2.addDeveloper(dev1);
        proj2.addDeveloper(dev2);
        proj2.addDeveloper(dev3);
        assert.equal(50, proj1.weeksEfficiency(20))
    });
    it('weeksEfficiency 1 vacation', function(){
        // No overlapping projects but 1 dev on vacation
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        dev1.addVacationDay(vac1);
        assert.equal(proj1.weeksEfficiency(20).toFixed(2), (66.66666666666667).toFixed(2))
    });
    it('weeksEfficiency 1 overlap 1 vacation', function(){
        // 1 dev with overlapping projects and 1 dev on vacation
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        dev1.addVacationDay(vac1);
        proj2.addDeveloper(dev2);
        assert.equal(50, proj1.weeksEfficiency(20));
    });
    it('weekColorCode should return a color matching the efficiency percentage', function(){
        // No overlapping projects or devs on vacation
        // Should be green
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        assert.isTrue(proj1.weekColorCode(20) === 'week-green');
    });
    it('weekColorCode should return a color matching the efficiency percentage', function(){
        // 1 dev with overlapping projects
        // Should be yellow
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        proj2.addDeveloper(dev1);
        assert.isTrue(proj1.weekColorCode(20) === 'week-yellow');
    });
    it('weekColorCode should return a color matching the efficiency percentage', function(){
        // 3 devs on vacation
        // Should be red
        proj1.addDeveloper(dev1);
        proj1.addDeveloper(dev2);
        proj1.addDeveloper(dev3);
        dev1.addVacationDay(vac1);
        dev2.addVacationDay(vac1);
        dev3.addVacationDay(vac1);
        assert.isTrue(proj1.weekColorCode(20) === 'week-red');
    });
})