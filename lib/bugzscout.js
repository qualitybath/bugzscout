var request = require('request');

function BugzScout(options) {

	if (!options.domain) {throw new Error("You have to provide a domain");}
	if (!options.user) {throw new Error("You have to provide a user name");}
	if (!options.project) {throw new Error("You must provide a FogBugz project");}
	if (!options.area) {throw new Error("You have to provide an area");}

	this.domain         = options.domain;
	this.user           = options.user;
	this.project        = options.project;
	this.area           = options.area;
	this.email          = options.email;
	this.forceNewBug    = options.forceNewBug || false;
}

BugzScout.prototype.submit = function(options, cb) {
	if (cb && !options.description) {return cb(Error("You have to provide a description"));}

	this.domain      = options.domain      || this.domain;
	this.user        = options.user        || this.user;
	this.project     = options.project     || this.project;
	this.area        = options.area        || this.area;
	this.email       = options.email       || this.email;
	this.forceNewBug = options.forceNewBug || this.forceNewBug;
	
	this.description    = options.description;
	this.extra          = options.extra;
	this.defaultMessage = options.defaultMessage;

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
		var error = /<Error>(.*)<\/Error>/.exec(body);
		if(error){error = error[1];}
		var success = /<Success>(.*)<\/Success>/.exec(body);
		if(success){success = success[1];}
		if(cb){
			cb(err || error, success);
		}
	});

};

module.exports = BugzScout;
