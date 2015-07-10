var settings = require('./settings.js');
var twilio = require('twilio');

var processOutcomes = function(outcomes) {
	var errors = [];

	outcomes.forEach(function(outcome) {
		if(outcome.statusCode && outcome.statusCode == '200') {
			if(outcome.elapsed && outcome.elapsed > outcome.options.responseTimeout) {
				errors.push(outcome.options.name + ': timeout (' + outcome.elapsed + ' ms)')
			}
		} else if (outcome.statusCode) {
			errors.push(outcome.options.name + ': status ' + outcome.statusCode);
		} else {
			errors.push(outcome.options.name + ': error ' + outcome.errorCode);
		}
	});

	if(errors.length) {
		var message = errors.join(' | ');

		if(settings.twilio.enabled) {
			var client = new twilio.RestClient(settings.twilio.accountSid, settings.twilio.authToken);

			settings.twilio.mobiles.forEach(function(mobile) {
				client.sms.messages.create({ to: mobile, from: settings.twilio.number, body: message }, function(error, response) {
    				if (error) {
    					console.log('Twilio failed: ', error);
    				} else {
    					console.log('Twilio succeeded: ', response);
    				}
				});
			});
		} else {
			console.log('Twilio disabled otherwise this message would have been sent: ' + message);
		}


	} else {
		console.log('Yuhu, no errors');
	}
};

module.exports = {
	processOutcomes: processOutcomes
};