var
        DB_NAME = 'TASK',
        TABLES = {
            'task_table': 'task',
            'user_table': 'user'
        };

var
        mysql = require('mysql'),
        db = mysql.createPool({
            connectionLimit: 100,
            host: 'localhost',
            user: 'root',
            password: '',
            database: DB_NAME
        });

exports.getTableName = function (table_object) {
    return TABLES[table_object];
};
