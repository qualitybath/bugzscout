var request = require('request');

function BugzScout(options) {
	validateOptions(options);
	this.domain         = options.domain;
	this.user           = options.user;
	this.project        = options.project;
	this.area           = options.area;
	this.description    = options.description;
	this.forceNewBug    = options.forceNewBug || false;
	this.extra          = options.extra;
	this.email          = options.email;
	this.defaultMessage = options.defaultMessage;
}

BugzScout.prototype.submit = function() {
	var body = {
		ScoutUserName: this.user,
		ScoutProject: this.project,
		ScoutArea: this.area,
		Description: this.description,
		ForceNewBug: this.forceNewBug,
		Extra: this.extra,
		Email: this.email,
		ScoutDefaultMessage: this.defaultMessage,
		FriendlyResponse: 0
	};
	var url = this.domain + "/scoutSubmit.asp";
	request.post({
		url: url,
		form: body
	},
	function(err, res, body) {
		var regex = /<Error>(.*)<\/Error>/.exec(body);
		if(regex){throw new Error(regex[1]);}
	});

};

function validateOptions(options) {
	if (!options.domain) {throw new Error("You have to provide a domain");}
	if (!options.user) {throw new Error("You have to provide a user name");}
	if (!options.project) {throw new Error("You must provide a FogBugz project");}
	if (!options.area) {throw new Error("You have to provide an area");}
	if (!options.description) {throw new Error("You have to provide a description");}
}

module.exports = BugzScout;