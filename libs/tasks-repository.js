var Task = require('./tasks');

module.exports = {
    deleteByType: function (type, callback) {
        Task.find({type: req.params.type}).remove(callback);
    },

    deleteSingle: function (id, callback) {
        Task.findOne({_id: mongoose.Types.ObjectId(req.params.id)}, function (err, task) {
            var isDeleted = task == null;
            callback(err, isDeleted);
        });
    },

    getAllTasks: function (callback) {
        Task.find({}).sort('quadrant').exec(callback);
    },

    getTasksByQuadrant: function(quadrant, callback) {
        Task.find({quadrant: parseInt(quadrant)}, callback);
    },

    getTasksByType: function (type, callback) {
        Task.find({type: type}).sort('quadrant').exec(callback);
    },

    insert: function (type, description, quadrant, callback) {
        var task = new Task({
            description: description,
            quadrant: parseInt(quadrant),
            type: type
        });
        task.save(callback);
    }
}