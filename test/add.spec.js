/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = require('chai').assert;

const server = require('../src/app');

chai.use(chaiHttp);

describe('Then posting to add/project', () => {
    it('should add project to firestore', (done) => {
        chai.request(server)
        .post('/add/project')

        .send({name: 'TestProject', startDate: '2020-04-11', endDate: '2020-05-11', hours: 100})
        .end((err, res) => {
            assert.equal(res.status, 200);
            done();
        });
    });
});

*/