'use strict'

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

    addVacationDay(vacationDay){
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