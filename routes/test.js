// assert

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
var myCode = require('./index.js')
var should = require('should');


describe('tests', function(){
    describe('testFunction', function(){
        it('should return 1', function(){
            // Call the exported function from the module
            myCode.testFunction().should.equal(1);
        })
    })
})




