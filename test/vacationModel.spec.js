const assert = require('chai').assert;
const Vacation = require('../src/models/vacation');

// Initialize Date prototyping
require('../src/util/dateUtil');

describe('Vacation class', () => {
    it('should initialize correctly with strings', () => {
        const vacation = new Vacation('2020-03-01', '2020-03-15');
        assert.isTrue(vacation.startDate instanceof Date);
        assert.isTrue(true, vacation.endDate instanceof Date);
    });

    it('should return correct weeks', () => {
        const vacation = new Vacation('2020-05-06', '2020-05-13');
        assert.equal(19, vacation.getStartWeek());
        assert.equal(20, vacation.getEndWeek());
    });

    it('should return correct date difference', () => {
        const vacation1 = new Vacation('2020-05-06', '2020-05-13');
        const vacation2 = new Vacation('2020-05-06', '2020-05-27');
        assert.equal(1, vacation1.weekDifference());
        assert.equal(3, vacation2.weekDifference());
    });
});
