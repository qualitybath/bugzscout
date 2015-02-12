var request = require('request'),
sinon       = require('sinon'),
expect      = require('chai').expect,
BugzScout   = require('../lib/bugzscout');

describe("bugzscout", function() {

	describe("constructor", function() {

		it("should fail without a domain", function() {
			expect(function() {
				new BugzScout({
					user: "my user",
					project: "my project",
					area: "my area",
				});
			}).to.throw(/You have to provide a domain/);

		});

		it("should fail without a user", function() {
			expect(function() {
				new BugzScout({
					domain: "http://your.fogbugz.url/scoutSubmit.asp",
					project: "my project",
					area: "my area",
				});
			}).to.throw(/You have to provide a user name/);

		});

		it("should fail without a project", function() {
			expect(function() {
				new BugzScout({
					domain: "http://your.fogbugz.url/scoutSubmit.asp",
					user: "my user",
					area: "my area",
				});
			}).to.throw(/You must provide a FogBugz project/);
		});

		it("should fail without a area", function() {
			expect(function() {
				new BugzScout({
					domain: "http://your.fogbugz.url",
					project: "my project",
					user: "my user",
				});
			}).to.throw(/You have to provide an area/);
		});
	});

	describe("submit", function() {
		var sandbox;
		beforeEach(function() {
			sandbox = sinon.sandbox.create();
			sandbox.stub(request, "post");
		});

		afterEach(function() {
			sandbox.restore();
		});

		it("should pass info to request", function() {
			var bugzscout = new BugzScout({
				domain: "http://your.fogbugz.url",
				project: "my project",
				user: "my user",
				area: "my area"
			});

			var expectedResponse = {
				form: {
					Description: "testing 123",
					Email: undefined,
					Extra: undefined,
					ForceNewBug: 0,
					FriendlyResponse: 0,
					ScoutArea: "my area",
					ScoutDefaultMessage: undefined,
					ScoutProject: "my project",
					ScoutUserName: "my user"
				},
				url: "http://your.fogbugz.url/scoutSubmit.asp"
			};

			bugzscout.submit({
				description: "testing 123"
			});

			sinon.assert.calledWith(request.post, expectedResponse);
		});

		it("should fail without a description", function() {
			var bugzscout = new BugzScout({
				domain: "http://your.fogbugz.url",
				project: "my project",
				user: "my user",
				area: "my area",
			});

			bugzscout.submit({}, function(e, r){
				expect(e).to.match(/You have to provide a description/);
			});

		});

		it('should not blow up if a callback is not passed in', function(){
			var bugzscout = new BugzScout({
				domain: "http://your.fogbugz.url",
				project: "my project",
				user: "my user",
				area: "my area",
			});
			
			sinon.assert.notCalled(request.post);

			expect(function() {
				bugzscout.submit({});
			}).to.not.throw();
		});

	});

});