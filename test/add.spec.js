const chai = require('chai');
const assert = require('chai').assert;
const chaiHttp = require('chai-http');
const server = require('../src/app');

chai.use(chaiHttp);

describe('Then posting to add/project', () => {
    it('should add project to firestore', (done) => {
        chai.request(server)
        .post('/add/project')
        .send({name: 'TestProject', startDate: '2020-04-11', endDate: '2020-05-11', estimatedHours: 100})
        end((err, res) => {
            assert.equal(res.status, 400);
            //assert.equal(res.body.property, 'name');

            done();
        });
    });
});