const { User } = require('../src/unit-testing.js');
const axios = require('axios');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const mock = require('./mock.json');

const expect = chai.expect; // Extract expect function from chai library
chai.use(sinonChai);

describe('the User Class', () => {
    const sandbox = sinon.createSandbox();
    let user;

    // Declare the user before starting the testings
    beforeEach(() => {
        user = new User('davepj007');
    });

    // Restorer the sandbox to be clean before the next test.
    afterEach(() => {
        sandbox.restore();
    });

    it('should get the user id', (done) => {
        const getStub = sandbox.stub(axios, 'get').resolves({ data: { id : 37641342} });

        user.getUserId() // Call getUserID function from the unit-testing.js file
            .then(result => {
                expect(result).to.be.a('number');
                expect(result).to.be.eq(37641342);
                expect(getStub).to.have.been.calledOnce; // Restric to be called just once
                expect(getStub).to.have.been.calledWith('https://api.github.com/users/davepj007');
                done();
            })
            .catch(done);
    });

    it('should return a repository if the user can view repos', (done) => {
        const getStub = sandbox.stub(axios, 'get').resolves({ data: ['repo1', 'repo2', 'repo3']});
        sandbox.stub(user, 'canViewRepos').value(true);
        user.getUserRepo(2)
            .then(response => {
                expect(response).to.be.eq('repo3');
                expect(getStub).to.have.been.calledOnceWith('https://api.github.com/users/davepj007/repos');
                done();
            })
            .catch(done);
    });

    it('should return an error if the user cannot view repos', (done) => {
        const getStub = sandbox.stub(axios, 'get');
        sandbox.stub(user, 'canViewRepos').value(false);

        user.getUserRepo(2)
            .catch(error => {
                expect(error).to.be.eq('Cannot view repos');
                expect(getStub).to.not.have.been.called;
                done();
            });
    });
});