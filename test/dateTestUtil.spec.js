const assert = require('assert');
const dateUtil = require('../src/util/dateUtil');

describe('DateTest util', () => {
    it('should return the correct week for the beginning of the year', () => {
        const date = new Date(2020, 0, 0);
        const week = date.getWeek();

        assert.equal(1, week);
    });

    it('should return the correct date for all days for the week', () => {
        // Weeks start from sunday
        // Jan 5th-11th 2020
        const weekDays = [
            sun = new Date(2020, 0, 5),
            mon = new Date(2020, 0, 6),
            tue = new Date(2020, 0, 7),
            wed = new Date(2020, 0, 8),
            thur = new Date(2020, 0, 9),
            fri = new Date(2020, 0, 10),
            sat = new Date(2020, 0, 11)
        ]

        for(week of weekDays) {
            assert.equal(2, week.getWeek());
        }
    });

    it('should return the correct week for the end of the year', () => {
        const date = new Date(2020, 11, 31);
        const week = date.getWeek();

        assert.equal(53, week);
    });


})