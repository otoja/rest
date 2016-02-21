

module.exports = function (router, bodyParser) {
    var Task = require.main.require("./model/task.js");
    
    var jsonParser = bodyParser.json();

    router.route('/task')
            .get(function (req, res) {
                Task.getAll(function (err, results) {
                    if (!err)
                        res.send(results);
                    else
                        res.send({"error": "select tasks list failed with error code: "+err.code});
                });
            })
            .post(jsonParser, function (req, res) {
                if (!req.body)
                    return res.sendStatus(400);

                Task.create(req.body.name, req.body.is_done, function (err, results) {
                    if (!err)
                        res.send(results);
                    else
                        res.send({"error": "create task failed with error code: "+err.code});
                });
            });


    router.route('/task/:task_id')
            .get(function (req, res) {
                Task.getById(req.params.task_id, function (err, results) {
                    if (!err)
                        res.send(results);
                    else
                        res.send({"error": "select task failed with error code: "+err.code});
                });
            })
            .put(jsonParser, function (req, res) {
                if (!req.body)
                    return res.sendStatus(400);

                var params = {};

                if (req.body.name)
                    params.name = req.body.name;
                if (req.body.is_done)
                    params.is_done = req.body.is_done;

                Task.update(req.params.task_id, params, function (err, results) {
                    if (!err)
                        res.send(results);
                    else
                        res.send({"error": "Update task failed with error code: "+err.code});
                });
            })
            .delete(function (req, res) {
                Task.remove(req.params.task_id, function (err, results) {
                    if (!err)
                        res.send(results);
                    else
                        res.send({"error": "delete task failed with error code: "+err.code});
                });

            });

};