var fuzzy = require('./fuzzy-match'),
  classify = require('./intent-classifier'),
  repository = require('./tasks-repository'),
  sendMail = require('./send-mail');

module.exports = function (sentence, callback) {
  var description = sentence.substring(sentence.indexOf(' '));
  var intent = classify(sentence.split(" ")[0]);

  if (intent == 'delete single') {
    console.log("running delete single");
    fuzzy.search(description, 'description', function (tasks) {
      if (tasks[0]) {
        var bestMatch = tasks[0];
        console.log('attemping to delete: ' + bestMatch);
        repository.deleteSingle(bestMatch._id.toString(), callback);
      } else {
        console.log("no match");
      }
    });
  } else if (intent == 'delete type') {
    console.log('delete by type');
    repository.deleteByType(description, callback);
  } else if (intent == 'add') {
    console.log('running add');
    var a = description.split(" ");
    var quadrant = a[a.length - 1];
    console.log(a);
    repository.insert(a[1].trim(), description.trim(), quadrant, callback);
  } else if (intent == 'get') {
      var type = description.split(' ')[1];
      if (type) {
        console.log('running get tasks by type');
        fuzzy.search(type, 'type', function (tasks) {
        if (tasks[0]) {
          var bestMatch = tasks[0];
          console.log('best match found: ' + bestMatch.type);
          repository.getTasksByType(bestMatch.type, callback);
        } else {
          callback("no match found for type: " + description, null);
        }
      });
    } else {
      console.log('running get all tasks');
      repository.getAllTasks(callback);
    }
  } else if (intent == 'mail') {
    console.log('running mail');
    sendMail(callback);
  } else {
    callback('no task found for intent: ' + intent, null);
  }
};
