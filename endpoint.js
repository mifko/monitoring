var http = require('http');
var https = require('https');
var q = require('q');

var execute = function(options) {
	var deferred = q.defer();
	var start;
	var outcome = { options: options };
	var protocol = options.protocol === 'https' ? https : http;

	console.log('processing ' + options.name);

	var req = protocol.request(options.request, function(res) {
  		outcome.statusCode = res.statusCode;
  		outcome.body = '';
  		res.on('data', function(d) {
  			outcome.body += d;
  		});
  		res.on('end', function () {
  			outcome.elapsed = Math.round(process.hrtime(start)[1] / 1000000);
  			console.log('processed ' + options.name + ': ' + outcome.body.length + ' bytes in ' + outcome.elapsed + ' ms');
  			deferred.resolve(outcome);
  		});
	});

	req.on('socket', function (res) {
		start = process.hrtime();
	});
	req.on('error', function(e) {
		outcome.elapsed = Math.round(process.hrtime(start)[1] / 1000000);
		outcome.errorCode = e.code;
		deferred.resolve(outcome);
	});

	req.end();

	return deferred.promise;
};

module.exports = {
	execute: execute
};