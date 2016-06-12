var assert = require('assert'),
	proxyquire = require('proxyquire');

var stubs = {
	'./send-mail': function(description, callback) {
		callback('sent mail');
	},
	'./add-task': function(description, callback) {
		callback('added task');
	},
	'./delete-tasks-type': function(description, callback) {
		callback('deleted tasks by type');
	},
	'./delete-single-task': function(description, callback) {
		callback('deleted single task');
	},
	'./get-tasks': function(description, callback) {
		callback('get tasks');
	}
};

var ff = proxyquire('../libs/free-form', stubs);

describe('free-form', function() {
	it('sends mail', function(done) {
		ff("mail", function(result) {
			assert.equal("sent mail", result);
			done();
		});
	});

	it('deletes single task', function(done) {
		ff("delete some task", function(result) {
			assert.equal("deleted single task", result);
			done();
		});
	});

	it('deletes by task type', function(done) {
		ff("finished task-type", function(result) {
			assert.equal("deleted tasks by type", result);
			done();
		});
	});

	it('adds a new task', function(done) {
		ff("add type some new task", function(result) {
			assert.equal("added task", result);
			done();
		});
	});

	it('gets tasks', function(done) {
		ff("get", function(result) {
			assert.equal("get tasks", result);
			done();
		});
	});

	it('returns error when no intent found', function(done) {
		ff("asdf043295hf", function(err, result) {
			assert.equal("cant classify intent for: asdf043295hf", err);
			done();
		});
	});
});