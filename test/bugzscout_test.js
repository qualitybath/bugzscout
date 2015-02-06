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
					area: "my area"
				});
			}).to.throw(BugzScoutError);

		});

		it("should fail without a user", function() {
			expect(function() {
				new BugzScout({
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					project: "my project",
					area: "my area"
				});
			}).to.throw(BugzScoutError);

		});

		it("should fail without a project", function() {
			expect(function() {
				new BugzScout({
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					user: "my user",
					area: "my area"
				});
			}).to.throw(BugzScoutError);
		});

		it("should fail without a area", function() {
			expect(function() {
				new BugzScout({
					url: "http://your.fogbugz.url/scoutSubmit.asp",
					project: "my project",
					user: "my user"
				});
			}).to.throw(BugzScoutError);
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
					area: "my area"
				});

			var expectedResponse = {
				body: {
					ScoutUserName: "my user",
					ScoutProject: "my project",
					ScoutArea: "my area",
					Description: "",
					ForceNewBug: "",
					Extra: "",
					Email: "",
					ScoutDefaultMessage: "",
					FriendlyResponse: 0
				},
				url: "http://your.fogbugz.url/scoutSubmit.asp"
			};

			bugzscout.submit();
			sinon.assert.calledWith(request.post, expectedResponse);
		});

	});

});