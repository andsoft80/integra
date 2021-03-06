
var bcrypt = require('bcrypt');
const request = require('request');
var cookie = require('cookie');
var cookies_js = require('js-cookie');
const path = require('path');
const axios = require('axios');
var CM = require('cookie-manager');
var cm = new CM();
var objectPath = require("object-path");


var express = require('express');
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var cors = require('cors');
app.use(cors());
app.options('*', cors());




var port = process.env.PORT || 8080;

var mysql = require('mysql');
var mssql = require('mssql');
const { Pool, Client } = require('pg');


var config = require('./db_config');
var jwt = require('express-jwt');
var jwt_sign = require('jsonwebtoken');
app.use(express.static('assets'));





con = mysql.createPool(config);


app.listen(port);
console.log('The magic happens on port ' + port);

async function getTokenFromHeader(req) {
    var token = '';

    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
        // console.log(token)
    }
    let promise = new Promise((resolve, reject) => {
        jwt_sign.verify(token, 'secret', function (err, decoded) {

            resolve(decoded);


        });

    });

    return await promise;

}

function check(req, res, next) {
    if (req.url === '/signin' || req.url === '/' || req.url === '/getData') {
        next();
    }
    else {
        getTokenFromHeader(req).then((value) => {
            var now = Math.floor(Date.now() / 1000);
            // console.log(Math.floor(Date.now() / 1000));

            if (value === undefined || value.exp < now) {
                res.end("need_auth");
            }
            else {
                next();
            }
        });
    }
}

app.all('*', function (req, res, next) {
    // console.log(req.url);
    check(req, res, next);
})

app.get('/', function (req, res) {
    res.sendFile(path.resolve('index.html'));
})

app.get('/departments', function (req, res) {
    var clientid = req.body.clientid;


    var sqlStr = "select department from users where clientid = '" + clientid + "' group by department"
    con.query(sqlStr, function (err, result) {
        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(result));

    });
});
app.get('/orders', function (req, res) {
    var clientid = req.body.clientid;
    var userid = req.body.userid;
    var onlyapproved = req.body.onlyapproved;
    var ondate = req.body.ondate;
    var period = req.body.period;
    var approvedbypn = req.body.approvedbypn;
    var forapprovepn = req.body.forapprovepn;

    var sqlStr = "select orders.*, users.name, absencetypes.name as absencetype, absencetypes.iconfa, t1.name as approvedby from orders left join users on users.id = orders.userid left join absencetypes on absencetypes.id = orders.typeid left join users as t1 on t1.personnelnumber = orders.approvedbypn where orders.clientid = '" + clientid + "'"

    if (userid) {
        sqlStr = sqlStr + " and orders.userid = '" + userid + "'"
    }

    if (onlyapproved) {
        sqlStr = sqlStr + " and orders.approved = 1"
    }

    if (ondate) {
        sqlStr = sqlStr + " and (orders.startdate <= '" + ondate + "' and orders.enddate >= '" + ondate + "' )"
    }

    else if (period) {
        sqlStr = sqlStr + " and ((orders.startdate <= '" + period.startdate + "' and orders.enddate >= '" + period.startdate + "') or (orders.startdate <= '" + period.enddate + "' and orders.enddate >= '" + period.enddate + "') or (orders.startdate >= '" + period.startdate + "' and orders.enddate <= '" + period.enddate + "'))"
    }

    if (approvedbypn) {
        sqlStr = sqlStr + " and orders.approvedbypn = '" + approvedbypn + "'"
    }

    if (forapprovepn) {
        sqlStr = sqlStr + " and (users.approvepn = '" + forapprovepn + "' and orders.approved = 0)"
    }

    con.query(sqlStr, function (err, result) {
        if (err)
            res.end(JSON.stringify(err));
        res.end(JSON.stringify(result));

    });




})

app.post('/signin', function (req, res) {


    var email = req.body.email;
    var password = req.body.password;
    console.log(JSON.stringify(req.body));
    var sqlStr = '';

    if (email && password) {
        sqlStr = "select * from users where email = '" + email + "'";



        con.query(sqlStr, function (err, result) {

            // console.log(JSON.stringify(result[0]));

            if (err) {
                res.end(JSON.stringify(err));
            }
            else if (result.length === 0 || !bcrypt.compareSync(password, result[0].password)) {
                res.end("fail");
            }
            else {

                const data = {
                    id: result[0].id,
                    extid: result[0].extid,
                    name: result[0].name,
                    email: result[0].email,
                    clientid: result[0].clientid,
                    approveuserid: result[0].approveuserid,
                    personnelnumber: result[0].personnelnumber,
                    position: result[0].position,
                    department: result[0].department,



                };
                const signature = 'secret';
                const expiration = '6h';

                res.send(jwt_sign.sign({ data, }, signature, { expiresIn: expiration }));




            }

        });

    }


});




/////////////universal api//////////////////////////////////
function api_impl(req, res) {
    var tableName = req.params.tableName;
    var action = req.params.action;
    //var clientid = req.body.clientid;
    var idName = 'id';
    var sqlStr = '';
    var id = '';

    if (action === 'post') {
        sqlStr = "INSERT INTO " + tableName + " (";
        for (var i = 0; i < Object.keys(req.body).length; i++) {
            sqlStr = sqlStr + Object.keys(req.body)[i] + ",";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + ") VALUES (";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            sqlStr = sqlStr + "'" + req.body[Object.keys(req.body)[i]] + "',";
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + ")";

        con.query(sqlStr, function (err, result) {
            if (err) {
                errObj = {};
                errObj.error = JSON.stringify(err);
                res.end(JSON.stringify(errObj));
            }
            res.end(JSON.stringify(result));

        });
    }
    if (action === 'put') {
        id = req.body[idName];
        sqlStr = "update " + tableName + " set ";
        for (i = 0; i < Object.keys(req.body).length; i++) {
            if (Object.keys(req.body)[i] === idName) {
                continue;
            }
            sqlStr = sqlStr + Object.keys(req.body)[i] + "='" + req.body[Object.keys(req.body)[i]] + "',"
        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + " where " + idName + " = " + id;

        con.query(sqlStr, function (err, result) {
            if (err) {
                errObj = {};
                errObj.error = JSON.stringify(err);
                res.end(JSON.stringify(errObj));
            }
            res.end(JSON.stringify(result));

        });
    }

    if (action === 'delete') {
        id = req.body[idName];
        sqlStr = "delete from " + tableName + " where " + idName + " = " + id;

        con.query(sqlStr, function (err, result) {
            if (err) {
                errObj = {};
                errObj.error = JSON.stringify(err);
                res.end(JSON.stringify(errObj));
            }
            res.end(JSON.stringify(result));

        });


    }
    if (action === 'get') {
        id = req.body[idName];
        var clientid = req.body.clientid;
        // console.log(id);


        if (id) {
            sqlStr = "select * from " + tableName + " where " + idName + " = " + id;
        }
        else {
            //sqlStr = "select * from " + tableName + " where clientid = " + clientid;
            sqlStr = "select * from " + tableName;
        }


        con.query(sqlStr, function (err, result) {
            if (err) {
                errObj = {};
                errObj.error = JSON.stringify(err);
                res.end(JSON.stringify(errObj));
            }
            res.end(JSON.stringify(result));

        });


    }
}

app.all('/table/:tableName/action/:action', function (req, res) {

    api_impl(req, res);

});





//////////////////////////////////////////////




app.post('/userinfo', function (req, res) {

    getTokenFromHeader(req).then(function (response) {

        res.end(JSON.stringify(response));
    });




});

app.post('/checkauth', function (req, res) {

    res.end("checked");


});

var authTypes = {
    "none": "none",
    "basic": "basic",
    "bearer": "bearer",
    "authCookies": "authCookies"
}



function getData(options, cb) {


    var getUrl = options.getUrl;
    var authType = options.authType;
    var isJSON = options.isJSON;
    var dataProperty = options.dataproperty;
    var authUrl = options.authUrl;
    var login = options.login;
    var password = options.password;
    var parcel = options.parcel;
    var authParcel = options.authParcel;
    var authHeaders = options.authHeaders;
    var headers = options.headers;

    var opt = {

        url: getUrl,
        headers: headers,
        json: parcel

    }

    if (authType == authTypes.none) {
        // console.log("mama");

        request(opt, function (error, response, body) {
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            var jsonBody = [];

            try {
                jsonBody = JSON.parse(body);

            }
            catch (err) {
                jsonBody = body;
            }

            if (dataProperty) {
                //console.log('data:', jsonBody["data"]);
                cb(jsonBody["data"]);
            }
            else {
                //console.log('data:', jsonBody);
                cb(jsonBody);
            }
        });
    }
    else if (authType == authTypes.basic) {
        request(opt, function (error, response, body) {
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            var jsonBody = [];

            try {
                jsonBody = JSON.parse(body);

            }
            catch (err) {
                jsonBody = body;
            }
            if (dataProperty) {
                //console.log('data:', jsonBody["data"]);
                cb(jsonBody[dataProperty]);
            }
            else {
                //console.log('data:', jsonBody);
                cb(jsonBody);
            }
        }).auth(login, password, false);
    }
    else if (authType == authTypes.bearer) {


        request({
            method: 'POST',
            url: authUrl,
            json: authParcel,
            headers: authHeaders
        }, function (error, response, body) {

            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);

            bearerToken = body;
            console.log(bearerToken);
            // opt.method = "POST";
            request(opt, function (error, response, body) {
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                var jsonBody = [];

                try {
                    jsonBody = JSON.parse(body);

                }
                catch (err) {
                    jsonBody = body;
                }
                if (dataProperty) {
                    //console.log('data:', jsonBody["data"]);
                    cb(jsonBody[dataProperty]);
                }
                else {
                    //console.log('data:', jsonBody);
                    cb(jsonBody);
                }
            }).auth(null, null, true, bearerToken);

        })



    }
    else if (authType == authTypes.authCookies) {


        request({
            method: 'POST',
            url: authUrl,
            json: authParcel,
            headers: authHeaders
        }, function (error, response, body) {

            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            var h = cookie.parse(response.headers["set-cookie"].join(';'));
            var cookie_resp = "";
            for (var i = 0; i < response.headers["set-cookie"].length; i++) {
                cookie_resp = cookie_resp + response.headers["set-cookie"][i] + ';';

            }
            opt.headers = {};
            opt.headers["Cookie"] = cookie_resp;
            opt.headers[options.csrfHeaderName] = h[options.csrfHeaderName];



            opt.method = "POST";


            request(opt, function (error, response, body) {
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                var jsonBody = [];

                try {
                    jsonBody = JSON.parse(body);

                }
                catch (err) {
                    jsonBody = body;
                }
                if (dataProperty) {
                    console.log('data:', jsonBody["data"]);
                    cb(jsonBody[dataProperty]);
                }
                else {
                    console.log('data:', jsonBody);
                    cb(jsonBody);
                }
            });

        })



    }


}



var options = {
    getUrl: "https://reqres.in/api/users?page=1",
    authType: "none",
    // isJSON: false,
    dataProperty: "data",
    authUrl: "",
    login: "",
    password: "",
    parcel: {}

}

var options_creatio = {
    getUrl: "https://072988-crm-bundle.terrasoft.ru/0/dataservice/json/reply/SelectQuery",
    authType: authTypes.authCookies,
    // isJSON: true,
    dataproperty: "rows",
    authUrl: "https://072988-crm-bundle.terrasoft.ru/ServiceModel/AuthService.svc/Login",
    login: "",
    password: "",
    authParcel: {
        "UserName": "Саулин Андрей",
        "UserPassword": "Professional1"
    },
    authHeaders: {
        // "ForceUseSession": false,
        "Content-Type": "application/json"
    },
    parcel: {
        "RootSchemaName": "Opportunity",
        "OperationType": 0,

        "AllColumns": true,
        // "Filters": {
        //     "RootSchemaName": "Opportunity",
        //     "FilterType": 1,
        //     "ComparisonType": "GreaterOrEqual",
        //     "LeftExpression": { "ExpressionType": 0, "ColumnPath": "CreatedOn" },
        //     "RightExpression": { "ExpressionType": 1, "FunctionType": 1, "MacrosType": 10 }

        // }

    },
    csrfHeaderName: "BPMCSRF"

}


function parseModel(parserData) {

    var model = [];


    for (var i = 0; i < Object.keys(parserData).length; i++) {
        var modelObj = {};
        var mainKey = Object.keys(parserData)[i];

        var valueMainKey = parserData[mainKey];




        if (typeof (valueMainKey) === "object") {
            for (var j = 0; j < Object.keys(valueMainKey).length; j++) {
                var modelObj = {};

                modelObj.columnName = mainKey + "_" + Object.keys(valueMainKey)[j];
                modelObj.columnPath = mainKey + "." + Object.keys(valueMainKey)[j];
                if (modelObj.columnPath.indexOf('date') > -1 || modelObj.columnPath.indexOf('Date') > -1 || modelObj.columnPath.indexOf('CreatedOn') > -1 || modelObj.columnPath.indexOf('createdon') > -1 || modelObj.columnPath.indexOf('ModifiedOn') > -1 || modelObj.columnPath.indexOf('modifiedon') > -1) {
                    modelObj.type = 'date';
                }
                else {
                    modelObj.type = typeof (objectPath.get(parserData, modelObj.columnPath));
                }

                model.push(modelObj);


            }
            continue;
        }
        console.log(mainKey + "-" + typeof (valueMainKey));
        modelObj.columnName = mainKey;
        modelObj.columnPath = mainKey;


        if (modelObj.columnPath.indexOf('date') > -1 || modelObj.columnPath.indexOf('Date') > -1 || modelObj.columnPath.indexOf('CreatedOn') > -1 || modelObj.columnPath.indexOf('createdon') > -1 || modelObj.columnPath.indexOf('ModifiedOn') > -1 || modelObj.columnPath.indexOf('modifiedon') > -1) {
            modelObj.type = 'date';
        }
        else {
            modelObj.type = typeof (valueMainKey);
        }

        model.push(modelObj);


    }

    console.log(model);
    return model;

}


function buildInsertQuery(options) {
    var sqlStr = 'insert into ' + options.tableName + " (";
    for (var j = 0; j < options.model.length; j++) {
        sqlStr = sqlStr + options.model[j].columnName + ','

    }
    sqlStr = sqlStr.substring(0, sqlStr.length - 1);
    sqlStr = sqlStr + ") values ";


    for (var i = 0; i < options.data.length; i++) {
        var row = options.data[i];




        sqlStr = sqlStr + "("
        for (var j = 0; j < options.model.length; j++) {
            var val = objectPath.get(row, options.model[j].columnPath);
            if (val === false) { val = 0 };
            if (val === true) { val = 1 };
            if (typeof val === "object") { val = JSON.stringify(val); val = val.replace("'", ""); };
            sqlStr = sqlStr + "'" + val + "',"

        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
        sqlStr = sqlStr + "),";





    }
    sqlStr = sqlStr.substring(0, sqlStr.length - 1);
    return sqlStr;
}





function buildCreateTableQuery(options) {
    var sqlStr = 'create table ' + options.tableName + "(";
    for (var i = 0; i < options.model.length; i++) {
        var column = options.model[i];
        var typeC = '';
        if (column.type === 'number') {
            typeC = 'numeric(16,3)'
        }
        else if (column.type === 'string') {
            typeC = 'varchar(255)'
        }
        else if (column.type === 'boolean') {
            typeC = 'tinyint'
        }
        else if (column.type === 'date') {
            typeC = 'datetime'
        }

        if (column.columnName === 'id' || column.columnName === 'ID' || column.columnName === '_id' || column.columnName === 'Id') {
            if (column.type === 'number') {
                sqlStr = sqlStr + column.columnName + " " + "integer" + " ";

            }
            else {
                sqlStr = sqlStr + column.columnName + " " + typeC + " ";
            }
            sqlStr = sqlStr + "NOT NULL PRIMARY KEY"
        }
        else {
            sqlStr = sqlStr + column.columnName + " " + typeC + " ";

        }
        sqlStr = sqlStr + ","


    }
    sqlStr = sqlStr.substring(0, sqlStr.length - 1);
    sqlStr = sqlStr + ")"

    return sqlStr;
}





function putDataMSSQL(options, cb) {
    function insertRows() {

        var sqlStr = buildInsertQuery(options);
        console.log(sqlStr);
        mssql.connect().then((pool) => {
            pool.query(sqlStr);
        })
            .then(result => {
                console.log("All data inserted!");
                //console.log(100);

            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                cb();
            })
        //console.log("All data inserted!");
    }

    mssql.connect(options.db_config, err => {
        if (err) {
            throw err;
        }
        console.log("Connection to MSSQL Successful !");

        var sqlStr = 'select * from ' + options.tableName;

        new mssql.Request().query(sqlStr, function (err, result) {

            if (err) {
                var sqlStr = buildCreateTableQuery(options);

                console.log(sqlStr);

                // mssql.connect().then((pool) => {
                //     pool.query(sqlStr);
                // })
                //     .then(result => {
                //         console.log("Table " + options.tableName + " created!");
                //         insertRows();
                //     })
                //     .catch(error => {
                //         console.log(error);
                //     })

                new mssql.Request().query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Table " + options.tableName + " created!");
                        insertRows();
                    }

                })


            }
            else {
                sqlStr = "delete from " + options.tableName;

                // mssql.connect().then((pool) => {
                //     pool.query(sqlStr);
                // })
                //     .then(result => {
                //         console.log("Table " + options.tableName + " dropped!");
                //         insertRows();
                //     })
                //     .catch(error => {
                //         console.log(error);
                //     })

                new mssql.Request().query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        console.log("Table " + options.tableName + " dropped!");
                        insertRows();
                    }

                })


            }

        });
    });

}


function putDataMySQL(options, cb) {
    function insertRows() {

        var sqlStr = buildInsertQuery(options);
        console.log(sqlStr);

        connection.query(sqlStr, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log("All data inserted!");
            cb();
            connection.end();


        })


        //console.log("All data inserted!");
    }



    var connection = mysql.createConnection(options.db_config);

    connection.connect(err => {
        if (err) {
            throw err;
        }
        console.log("Connection to MySQL Successful !");

        var sqlStr = 'select * from ' + options.tableName;

        connection.query(sqlStr, function (err, result) {

            if (err) {
                var sqlStr = buildCreateTableQuery(options);

                console.log(sqlStr);

                connection.query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Table " + options.tableName + " created!");
                    insertRows();


                })


            }
            else {
                sqlStr = "delete from " + options.tableName;


                connection.query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Table " + options.tableName + " dropped!");
                    insertRows();


                })




            }

        });
    });


}

function putDataPgSQL(options, cb) {
    function insertRows() {

        var sqlStr = buildInsertQuery(options);
        console.log(sqlStr);

        connection.query(sqlStr, function (err, result) {
            if (err) {
                console.log(err);
            }
            console.log("All data inserted!");
            cb();
            connection.end();


        })


        //console.log("All data inserted!");
    }


    console.log(options.db_config);
    var connection = new Pool(options.db_config);

    // connection.connect(err => {
    //     if (err) {
    //         throw err;
    //     }
    //     console.log("Connection to MySQL Successful !");

        var sqlStr = 'select * from ' + options.tableName;

        connection.query(sqlStr, function (err, result) {

            if (err) {
                var sqlStr = buildCreateTableQuery(options);

                console.log(sqlStr);

                connection.query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Table " + options.tableName + " created!");
                    insertRows();


                })


            }
            else {
                sqlStr = "delete from " + options.tableName;


                connection.query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    console.log("Table " + options.tableName + " dropped!");
                    insertRows();


                })




            }

        });
    // });


}
// getData(options_creatio, function(data){

// })

app.post('/getData', function (req, res) {
    console.log(req.body);
    getData(req.body, function (data) {
        // console.log(data);
        res.send(data);
    })


})
app.post('/checkConnection', function (req, res) {

    var conf = req.body;
    console.log(conf);


    if (conf.typeDB === "mssql") {
        conf.pool = {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
        };
        conf.options = {
            "enableArithAbort": true
        };
        // console.log(conf);
        mssql.connect(conf, err => {
            if (err) {
                res.send(JSON.stringify(err));
                mssql.close();
            }
            else {
                res.send("Cоединение установлено успешно!");
                mssql.close();
            }
        })

    }
    if (conf.typeDB === "mysql") {

        var conf = req.body;
        var mysql = require('mysql');
        var connection = mysql.createConnection(conf);


        connection.connect(function (err) {
            if (err) {
                res.send(JSON.stringify(err));
                return;
            }

            res.send("Cоединение установлено успешно!");
        });



        connection.end();



    }
    if (conf.typeDB === "pgsql") {

        var conf = req.body;
        var pg_conf = {};
        pg_conf.host = conf.server;
        pg_conf.user = conf.user;
        pg_conf.password = conf.password;
        pg_conf.database = conf.database;



        const pool = new Pool(pg_conf);
        pool.query('SELECT NOW()', (err, result) => {
            if (err) {
                res.send(JSON.stringify(err));
                return;
            }

            res.send("Cоединение установлено успешно!");
            pool.end();
        })






    }

})


function transferData(processObj) {

    var srcObj = {};
    var destObj = {};

    var lastTimeMilliSec = Date.parse(processObj.lasttime);
    var currTime = new Date();
    var currTimeMySQL = currTime.toISOString().slice(0, 19).replace('T', ' ');
    var currTimeMilliSec = currTime.getTime();
    var period = processObj.periodmin * 60000;//milliseconds
    if (currTimeMilliSec - lastTimeMilliSec >= period && processObj.active === 1) {
        console.log('started ' + processObj.id);
        var sqlStr = "update processes set lasttime = '" + currTimeMySQL + "' where id = " + processObj.id;
        con.query(sqlStr, function (err, result) {
            if (err) {
                console.log(err);
            }
            var sqlStr = "select * from sources where id = " + processObj.sourceid;
            con.query(sqlStr, function (err, result) {
                if (err) {
                    console.log(err);
                }
                srcObj = result[0];
                var sqlStr = "select * from destinations where id = " + processObj.destinationid;
                con.query(sqlStr, function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    destObj = result[0];

                    getData(srcObj, (data) => {
                        console.log(data);
                        if (destObj.typeDB === "mssql") {
                            var model = parseModel(data[0]);
                            var options = {
                                db_config: {
                                    "user": destObj.login,
                                    "password": destObj.password,
                                    "server": destObj.host, // for local machine
                                    "database": destObj.dbName, // name of database
                                    "options": {
                                        "enableArithAbort": true
                                    },
                                    pool: {
                                        max: 10,
                                        min: 0,
                                        idleTimeoutMillis: 30000
                                    }

                                },
                                tableName: srcObj.tableName,
                                model: model,
                                data: data

                            }
                            putDataMSSQL(options, () => {

                            });

                        }

                        if (destObj.typeDB === "mysql") {
                            var model = parseModel(data[0]);
                            var options = {
                                db_config: {
                                    "user": destObj.login,
                                    "password": destObj.password,
                                    "server": destObj.host, // for local machine
                                    "database": destObj.dbName, // name of database
                                    "options": {
                                        "enableArithAbort": true
                                    },
                                    pool: {
                                        max: 10,
                                        min: 0,
                                        idleTimeoutMillis: 30000
                                    }

                                },
                                tableName: srcObj.tableName,
                                model: model,
                                data: data

                            }
                            putDataMySQL(options, () => {

                            });

                        }
                        if (destObj.typeDB === "pgsql") {
                            var model = parseModel(data[0]);
                            var options = {
                                db_config: {
                                    "user": destObj.login,
                                    "password": destObj.password,
                                    "host": destObj.host, // for local machine
                                    "database": destObj.dbName, // name of database
                                    // "options": {
                                    //     "enableArithAbort": true
                                    // },
                                    // pool: {
                                    //     max: 10,
                                    //     min: 0,
                                    //     idleTimeoutMillis: 30000
                                    // }

                                },
                                tableName: srcObj.tableName,
                                model: model,
                                data: data

                            }
                            putDataPgSQL(options, () => {

                            });

                        }



                    });




                });

            });


        });

    }

}

setInterval(() => {





}, 2000);

var sqlStr = "select * from processes";
con.query(sqlStr, function (err, result) {
    if (err) {
        console.log(err);
    }
    for (var i = 0; i < result.length; i++) {
        var processObj = result[i];
        transferData(processObj)

    }


});