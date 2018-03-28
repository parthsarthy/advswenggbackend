// using chai for GET
//source: http://mherman.org/blog/2015/09/10/testing-node-js-with-mocha-and-chai/#.WruLLYjwbIU

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./index');
let should = chai.should();
chai.use(chaiHttp);

describe('index', function() {
  it('should list ALL blobs on /blobs GET', function(done) {
  chai.request(server)
    .get('/')
    .end(function(err, res){
      res.should.have.status(200);
      //res.should.be.json;
      //res.body.should.be.a('array');
      done();
    });


  //using chai for post
  it('should add a SINGLE blob on /blobs POST', function(done) {
  chai.request(server)
    .post('/user')
    .send({'email': 'rhlsatya@gmail.com'})
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('SUCCESS');
      res.body.SUCCESS.should.be.a('object');
      
      res.body.SUCCESS.should.have.property('_id');
      res.body.SUCCESS.should.have.property('email');
      res.body.SUCCESS.should.have.property('name');
      res.body.SUCCESS.should.have.property('profileImg');
      
      res.body.SUCCESS.name.should.equal('5ab397033d76d25de8d9f716');
      res.body.SUCCESS.name.should.equal('rhlsatya@gmail.com');
      res.body.SUCCESS.name.should.equal('Rahul Satya');
      res.body.SUCCESS.lastName.should.equal('https://lh4.googleusercontent.com/-Ids8chWC4-U/AAAAAAAAAAI/AAAAAAAAABY/qxB7h9qIvSg/photo.jpg');
      done();
    });
});
});




/*describe("GET check", function() {
    var url = "http://localhost:3000/";

    it("returns status 200", function() {
      request(url, function(error, response, body) {
        expect(response.statusCode).to.equal(200);
        done();
      });
    })*/


// using by deafult assert

/*var assert = require('assert');
var calc = require('./index.js');
// Tests are hierarchical. Here we define a test suite for our calculator.
describe('testFunction', function() {
	// And then we describe our testcases.
	it('returns 1', function(done) {
		assert.equal(calc.testFunction(), 1);
		// Invoke done when the test is complete.
		done();
	});

});*/
   
// should.js
/*var myCode = require('./index.js')
var should = require('should');


describe('tests', function(){
    describe('testFunction', function(){
        it('should return 1', function(){
            // Call the exported function from the module
            myCode.testFunction().should.equal(1);
        })
    })
})*/



//using should.js
/*
var should = require('should');
var app = require('./index.js');
var request = require('superagent');

describe('GET /', function() {

  it('should respond with JSON array', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function(err, res) {
        if (err) return done(err);
        res.body.should.be.instanceof(Array);
        done();
      });
  });
  it('should respond with redirect on post', function(done) {
    // need help here
  });
});*/