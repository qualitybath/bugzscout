var request = require('request');

function BugzScout(options) {
	validateOptions(options);
	this.url = options.url;
	this.user = options.user;
	this.project = options.project;
	this.area = options.area;
	this.title = options.title || "";
	this.new = options.new || "";
	this.body = options.body || "";
	this.email = options.email || "";
}

BugzScout.prototype.submit = function() {
	var body = {
		ScoutUserName: this.user,
		ScoutProject: this.project,
		ScoutArea: this.area,
		Description: this.title,
		ForceNewBug: this.new,
		Extra: this.body,
		Email: this.email,
		ScoutDefaultMessage: "",
		FriendlyResponse: 0
	};

	request.post({
		url: this.url,
		body: JSON.stringify(body)
	},
	function(err, res, body) {
		var regex = /<Error>(.*)<\/Error>/.exec(body);
		if(regex){throw new Error(regex[1]);}
	});

};

function validateOptions(options) {
	if (!options.url) {throw new Error("You have to provide a url");}
	if (!options.user) {throw new Error("You have to provide a user name");}
	if (!options.project) {throw new Error("You must provide a FogBugz project");}
	if (!options.area) {throw new Error("You have to provide an area");}
}


module.exports = BugzScout;