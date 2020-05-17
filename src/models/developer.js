'use strict'

require('../util/dateUtil');

const Holidays = require('date-holidays');
const hd = new Holidays();
hd.init('DK');

class Developer {

    constructor(docId, name, status, rank){
        this._docId = docId;
        this._name = name;
        this._status = status;
        this._rank = rank;
        this._currentProjects = [];
        this._vacationDays = [];
    }

    addProject (project){
        if (!this._currentProjects.includes(project)) {
            this._currentProjects.push(project);
            project.addDeveloper(this);
        }
    }

    deleteProject(project){
        var index = this._currentProjects.indexOf(project);
        if(index > -1){
            this._currentProjects.splice(index, 1);
            return true;
        }
        return false;
    }

    addVacationDay(startDate, endDate){
        this._vacationDays.push(vacationDay);
    }
    
    deleteVacationDay(vacationDay){
        var index = this._vacationDays.indexOf(vacationDay);
        if(index > -1){
            this._vacationDays.splice(index, 1);
            return true;
        }
        return false;
    }

    efficiency(weekNumber) {
        const firstDayOfWeek = (1 + (weekNumber - 1) * 7);
        let effectiveDays = 5;

        // runs from 1-6 as american weeks start with sunday and we don't want saturday
        for (let i = 1; i < 6; i++) {
            if (hd.isHoliday(new Date(0, 0, firstDayOfWeek + i))) {
                effectiveDays -= 1;
            }
        }

        const isOnVacation = this._vacationDays.some(vacation => {
            if(vacation.startDate().getWeek() <= weekNumber
            && weekNumber <= vacation.endDate().getWeek()) {
                return true;
            }
            return false;
        });

        if (isOnVacation) {
            return 0;
        } else {
            return effectiveDays / 5
        }
    }

    get vacationDays() {
        return this._vacationDays;
    }

    get currentProjects() {
        return this._currentProjects;
    }

    get name() {
        return this._name;
    }

    get rank() {
        return this._rank;
    }

    get status() {
        return this._status;
    }

    get docId() {
        return this._docId;
    }
}

module.exports.Developer = Developer;