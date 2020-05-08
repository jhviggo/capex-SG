'use strict'

class Developer {

    constructor(name, status, rank){
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
        }
        return 'Project does not exist';
    }

    addVacationDay(vacationDay){
        this._vacationDays.push(vacationDay);
    }
    
    deleteVacationDay(vacationDay){
        var index = this._vacationDays.indexOf(vacationDay);
        if(index > -1){
            this._vacationDays.splice(index, 1);
        }
        return 'Vacationday does not exist';
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
}

module.exports.Developer = Developer;