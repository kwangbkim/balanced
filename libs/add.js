var request = require('request'),
    assert = require('assert'),
    props = require('./properties'),
    sf = format = require('./string-format');

sf.init();

var headers = {
    'Content-Type': 'application/json'
};

var options = {
    url: "http://{0}:{1}/tasks".format(props.get('BALANCED_SERVER'), props.get('server:port')),
    method: 'POST',
    json: true,
    body: {
        type: process.argv[2],
        description: process.argv[3],
        quadrant: parseInt(process.argv[4])
    }
};

request(options, function(err, res, body) {
    assert.equal(err, null);
    console.log(body);
});
