'use strict';

class Project {
    constructor(name, startDate, endDate, estimatedHours) {
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
        this._estimatedHours = estimatedHours;
        this._developers = [];
    }

    addDeveloper(developer) {
        if (!this._developers.includes(developer)) {
            this._developers.push(developer);
            developer.addProject(this);
        }
    }

    deleteDeveloper(developer){
        var index = this._developers.indexOf(developer);
        if(index > -1){
            this._developers.splice(index, 1);
        }
        return 'Developer is not part of this project';
    }

    activeDevs(weekNumber) {
        let result = [];

        this._developers.forEach((dev) => {
            if (dev.vacationDays.length > 0) {
                if(!dev.vacationDays.some(date => date.getWeek() == weekNumber)) {
                    result.push(dev);
                }
            }
            else {
                result.push(dev);
            }
        });
        
        return result;
    }

    weeksEfficiency(weekNumber) {
        //Calculates percentage of effecient devs.
        let totalDevEfficiency = 0;
        const activeDevs = this.activeDevs(weekNumber);

        activeDevs.forEach((dev) => {
            let overlappingProjectCount = 0;
            let individualDevEfficiency = 100;

            dev.currentProjects.forEach((project) => {
                if (project.endDate.getWeek() >= weekNumber && project.startDate.getWeek() <= weekNumber) {
                    overlappingProjectCount++;
                }
            });

            if (overlappingProjectCount > 1) {
                individualDevEfficiency = individualDevEfficiency / overlappingProjectCount;
            }

            totalDevEfficiency += individualDevEfficiency;
        });

        return totalDevEfficiency / this._developers.length; 
    }

    weekColorCode(weekNumber) {
        const projectEfficiency = this.weeksEfficiency(weekNumber);

        if (projectEfficiency >= 90) {
            return 'GREEN';
        }
        else if (projectEfficiency < 90 && projectEfficiency > 50) {
            return 'YELLOW';
        }
        else {
            return 'RED';
        }
    }

    get endDate() {
        return this._endDate;
    }

    get startDate() {
        return this._startDate;
    }

    get developers() {
        return this._developers;
    }
}

module.exports.Project = Project;