const assert = require('assert');
const request = require('supertest');
const app = require('../index.js'); // Your Express.js application code

describe('GET /hello', function() {
  it('should return 200 OK', function(done) {
    request(app)
      .get('/api/v1/hello')
      .expect(200, done);
    // console.log(done)
    // done()
  });
  
  it('should return "Hello User! How are you? Welcome to Disastro!"', function(done) {
    request(app)
      .get('/api/v1/hello')
      .expect("Hello User! How are you? Welcome to Disastro!",done.message)
      done()
  });
});

describe('POST /getDisasterResponse', () => {
  it('returns a JSON object when a valid string is provided', (done) => {
    const inputString = 'fire in the building many people impacted';
    const expectedOutput = {
      "disasterType": [
          "fire"
      ],
      "disasterLocation": [
          "building"
      ],
      "disasterRadius": 500,
      "disasterImpactedPeopleCount": 50
  };

    request(app)
      .post('/api/v1/getDisasterResponse')
      .send(inputString)
      .expect(200)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toEqual(expectedOutput);
        done();
      });
      done();
  });

  it('returns an error message when an empty string is provided', (done) => {
    const inputString = '';

    request(app)
      .post('/api/v1/getDisasterResponse')
      .send(inputString)
      .expect(400)
      .expect('Content-Type', /json/)
      .end((err, res) => {
        if (err) return done(err);

        expect(res.body).toHaveProperty('error');
        expect(res.body.error).toBe('Input string is empty');
        done();
      });
      done();
  });
});
