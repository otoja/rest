var db = require.main.require('./lib/db');

module.exports = {
    create: function (name, is_done, callback) {
        db.getConnection(function (err, connection) {
            var sql = "INSERT INTO `" + db.getTableName("task_table") + "`( `name`, `is_done`) VALUES ('" + name + "', " + is_done + ")";
            connection.query(sql, callback);
            connection.release();
        });
    },
    getAll: function (callback) {
        db.getConnection(function (err, connection) {
            connection.query("select * from " + db.getTableName("task_table"), callback);
            connection.release();
        });
    },
    getById: function (id, callback) {
        db.getConnection(function (err, connection) {
            connection.query("select * from " + db.getTableName("task_table") + " where task_id=" + id, callback);
            connection.release();
        });
    },
    update: function (id, params, callback) {
        var sql = "UPDATE `" + db.getTableName("task_table") + "` SET ";
        //Generate SQL with updated params
        Object.keys(params).forEach(function (key, idx) {
            if (idx !== 0) {
                sql += ", ";
            }
            sql += "`" + key + "`='" + params[key] + "' ";
        });

        sql += " WHERE `task_id` = " + id;
        console.log(sql);
        db.getConnection(function (err, connection) {

            connection.query(sql, callback);
            connection.release();
        });
    },
    remove: function (id, callback) {
        db.getConnection(function (err, connection) {

            connection.query("delete from " + db.getTableName("task_table") + " where task_id=" + id, callback);
            connection.release();
        });
    }

};