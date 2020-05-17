'use strict'

class Vacation {
    constructor(startDate, endDate){
        this._startDate = new Date(startDate);
        this._endDate = new Date(endDate);
    }

    get startDate() {
        return this._startDate;;
    }

    get endDate() {
        return this._endDate;
    }

    getStartWeek() {
        return this._startDate.getWeek();
    }

    getEndWeek() {
        return this._endDate.getWeek();
    }

    weekDifference() {
        return this.getEndWeek() - this.getStartWeek();
    }
}

module.exports = Vacation;