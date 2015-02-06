var request = require('request'),
sinon       = require('sinon'),
expect      = require('chai').expect,
BugzScout = require('../lib/bugzscout');

describe("bugzscout", function() {

	describe("constructor", function() {

		it("should fail without a url", function() {
			expect(function() {
				new BugzScout({
					user: "my user",
					project: "my project",
					area: "my area",
					description: "testing 123"
				});
			}).to.throw(Error);

		});

		it("should fail without a description", function() {
			expect(function() {
				new BugzScout({
					user: "my user",
					project: "my project",
					area: "my area"
				});
			}).to.throw(Error);

		});

		it("should fail without a user", function() {
			expect(function() {
				new BugzScout({
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					project: "my project",
					area: "my area",
					description: "testing 123"
				});
			}).to.throw(Error);

		});

		it("should fail without a project", function() {
			expect(function() {
				new BugzScout({
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					user: "my user",
					area: "my area",
					description: "testing 123"
				});
			}).to.throw(Error);
		});

		it("should fail without a area", function() {
			expect(function() {
				new BugzScout({
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					project: "my project",
					user: "my user",
					description: "testing 123"
				});
			}).to.throw(Error);
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
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					project: "my project",
					user: "my user",
					area: "my area",
					description: "testing 123"
				});

			var expectedResponse = {
				body: JSON.stringify({
					ScoutUserName: "my user",
					ScoutProject: "my project",
					ScoutArea: "my area",
					Description: "testing 123",
					ForceNewBug: false,
					FriendlyResponse: 0
				}),
				url: "http://your.fogbugz.url/scoutSubmit.asp"
			};

			bugzscout.submit();
			sinon.assert.calledWith(request.post, expectedResponse);
		});

	});

});