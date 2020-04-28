'use strict'

let developer = new Developer('Kristian', 'pleb', 'noob');
developer.addProject()
class Developer {

    constructor(name, status, rank){
        this._name = name;
        this._status = status;
        this._rank = rank;
        this._currentProjects = [];
        this._vacationDays = [];

    }

    addProject (project){
        this._currentProjects.push(project);
    }

    deleteProject(project){
        let result = this._currentProjects.filter((element)=>{
            return element.name != project.name;
        });
        this._currentProjects = result;
        console.log(this._currentProjects);
        

        // this.currentProjects.forEach((item, index)=>{
        //     if(item.name === oldProject.name){

        //     }
        // })
    }

    addVacationDay(vacationDay){
        this._vacationDays.push(vacationDay);
    }
    
    deleteVacationDay(vacationDay){
        let result = this._vacationDays.filter((element)=>{
            return element.name != vacationDay.name;
        });
        this._vacationDays = result;
        console.log(this._vacationDays);
        

    }

}