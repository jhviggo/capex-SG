'use strict';

class Project {
    constructor(name, startDate, endDate, estimatedHours) {
        this._name = name;
        this._startDate = startDate;
        this._endDate = endDate;
        this._estimatedHours = estimatedHours;
        this._developers = [];
    }

    activeDevs(weekNumber) {
        let result = [];

        this._developers.forEach((dev) => {
            dev.vacationDays.forEach((date) => {
                if (date.getWeek() != weekNumber) {
                    result.push(dev);
                }
            });
        });

        return result;
    }

    weeksEfficiency(weekNumber) {
        //Calculates percentage of effecient devs.
        let totalDevEfficiency;
        let activeDevs = this.activeDevs(weekNumber);

        activeDevs.forEach((dev) => {
            let overlappingProjectCount = 0;
            let individualDevEfficiency;

            dev.currentProjects.forEach((project) => {
                if (project.endDate().getWeek() < weekNumber) {
                    overlappingProjectCount++;
                }
            });

            individualDevEfficiency = 100 / overlappingProjectCount;
            totalDevEfficiency += individualDevEfficiency;
        });

        return totalDevEfficiency / this._developers; 
    }

    get weekColorCode(weekNumber) {
        let projectEfficiency = this.weeksEfficiency(weekNumber);

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
        return this._endDate();
    }
}

exports.module = Project;