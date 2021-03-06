# BugzScout
[![bugzscout](http://img.shields.io/npm/v/bugzscout.svg?style=flat-square)](https://www.npmjs.com/package/bugzscout)
[![bugzscout](http://img.shields.io/npm/dm/bugzscout.svg?style=flat-square)](https://www.npmjs.com/package/bugzscout)
[![bugzscout](http://img.shields.io/npm/l/bugzscout.svg?style=flat-square)](https://www.npmjs.com/package/bugzscout)
[![Build Status](https://img.shields.io/travis/qualitybath/bugzscout.svg?style=flat-square)](https://travis-ci.org/qualitybath/bugzscout)
[![Coveralls](https://img.shields.io/coveralls/qualitybath/bugzscout.svg?style=flat-square)](https://coveralls.io/r/qualitybath/bugzscout)
[![code climate](https://img.shields.io/codeclimate/github/qualitybath/bugzscout.svg?style=flat-square)](https://codeclimate.com/github/qualitybath/bugzscout)

####Send automated crash reports to [FogBugz](http://www.fogcreek.com/fogbugz/) from Node.js applications using the bugzscout API

```
npm install bugzscout
```

###Basic Usage

```javascript
var BugzScout = require('bugzscout');

var bugzscout = new BugzScout({
	user: "user-name",
	project: "project-name",
	area: "area-name",
	domain: "your-fogbugz-domain-name",
	email: "email",
	forceNewBug: false
});

bugzscout.submit({
	description: "description",
	extra: "extra",
	defaultMessage: "defaultMessage"
});
```

`submit` takes a callback as a second parameter

```javascript
bugzscout.submit({
	description: "description",
	extra: "extra",
	defaultMessage: "defaultMessage"
}, function(err, res){

});
```
###Available Fields
* `domain` (required)
* `user` (required)
* `project` (required)
* `area` (required)
* `description` (required)
* `forceNewBug` (defaults to `false`)
* `extra`
* `email`
* `defaultMessage`

> Only `user`,`domain`, `project`, `area`, `domain`, `email`, and `forceNewBug` can be set as defaults in the constructor. However,  all fields can be set/overridden in the `submit` options.

For more info on the BugzScout API see [bugzscout for automatic crash reportings](http://help.fogcreek.com/7566/bugzscout-for-automatic-crash-reporting)

## Authors
* [Seth Pollack](https://github.com/sethpollack)

***
The MIT License  
Copyright (c) 2015 [QualityBath.com](https://www.qualitybath.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

