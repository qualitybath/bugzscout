var request = require('request'),
sinon       = require('sinon'),
expect      = require('chai').expect,
BugzScout = require('../lib/bugzscout');

describe("bugzscout", function(){
	var sandbox;
	beforeEach(function(){
		sandbox = sinon.sandbox.create();
		sandbox.stub(request, "post");
	});

	afterEach(function(){
		sandbox.restore();
	});

	describe("constructor", function(){
		it("should fail without a user", function(){
			expect(function(){
				new BugzScout({
					project: "my project",
					area: "my area"
				});
			}).to.throw(BugzScoutError);

		});

		it("should fail without a project", function(){
			expect(function(){
				new BugzScout({
					user: "my user",
					area: "my area"
				});
			}).to.throw(BugzScoutError);
		});

		it("should fail without a area", function(){
			expect(function(){
				new BugzScout({
					project: "my project",
					user: "my user"
				});
			}).to.throw(BugzScoutError);
		});
	});

	describe("submit", function(){

	});

});