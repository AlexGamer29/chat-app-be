const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app'); // Replace with the path to your API app file
const expect = chai.expect;

chai.use(chaiHttp);

describe('User API', () => {

  describe('DELETE /api/user/delete-users', () => {
    it('should delete all users', (done) => {
      // Make a DELETE request to delete all users
      chai
        .request(app)
        .delete('/api/user/delete-users')
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          expect(res).to.have.status(200); // Replace with the appropriate status code
          expect(res.body.response).to.have.property('acknowledged').equal(true);
          done();
        });
    });
  });

  describe('POST /api/user/add-user', () => {
    it('should add a new user', (done) => {
      const newUser = {
        first_name: 'A',
        last_name: 'Nguyen Van',
        username: 'sun123vet',
        email: 'hehe123@gmail.com',
        password: '12345678',
      };

      chai
        .request(app)
        .post('/api/user/add-user')
        .send(newUser)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200); // Assuming you return a 201 status code for successful creation
          expect(res).to.be.json;
          expect(res.body).to.have.property('status').equal(200);
          // Add more assertions as needed to validate the response or the database state
          done();
        });
    });
  });

  describe('GET /api/user/get-users', () => {
    it('should return a list of users', (done) => {
      chai
        .request(app)
        .get('/api/user/get-users')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.be.json;
          expect(res.body.response).to.be.an('array');
          // Add more assertions as needed to validate the response
          done();
        });
    });
  });
});
