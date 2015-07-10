var q = require('q');
var settings = require('./settings.js');
var endpoint = require('./endpoint.js');
var notification = require('./notification.js');

var promises = [];

settings.endpoints.forEach(function(item) {
  promises.push(endpoint.execute(item));
});

q.allSettled(promises).then(function(results) {
    notification.processOutcomes(results.map(function(item) { return item.value; }));
});