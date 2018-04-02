var supertest = require("supertest");
var should = require("should");
var server = supertest.agent("http://localhost:3000");


describe("Test Driven development ka dealing",function(){

  // #1 should return home page /findrides

  it("should read OK for find rides when D1 and D2 are passed",function(done){

    //calling ADD api
    server
    .post('/findrides')
    .send("D1","D2")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      //should.(res.body);
      res.status.should.equal(200);

      //res.body.error.should.equal(false);
      //res.body.data.should.equal(30);
      done();
    });
  });

  it("should read OK for user creation",function(done){

    //calling ADD api
    server
    .post('/user')
    .send("123@gmail.com","123 singh","prof_IMG")
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      //should.(res.body);
      res.status.should.equal(200);

      //res.body.error.should.equal(false);
      //res.body.data.should.equal(30);
      done();
    });
  });


});
