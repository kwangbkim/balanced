var mailin = require('mailin'),
  balancedRequest = require('./libs/balanced-request'),
  sendMail = require('./libs/send-mail'),
  intentClassifier = require('./libs/intent-classifier');

mailin.start({
  port: 25,
  disableWebhook: true // Disable the webhook posting.
});

mailin.on('message', function(connection, data, content) {
  var sentence = data.text.split("\n")[0];
  console.log('received request for: ' + sentence);

  var first = sentence.split(" ")[0];
  if (first != 'note') {
    var command = intentClassifier(first);
    if (command == 'get') {
      sentence = sentence.replace('get', 'mail');
    }
    balancedRequest(sentence, function(err, res) {
      if (err) console.log(err);
      if (res) console.log(res.body);
    });
  }
});