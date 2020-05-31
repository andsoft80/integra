const request = require('request');
var mssql = require('mssql');
var cookie = require('cookie');
var objectPath = require("object-path");

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
    var dataProperty = options.dataProperty;
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


        request(opt, function (error, response, body) {
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            var jsonBody = [];
            if (isJSON) {
                jsonBody = body;
            }
            else {
                jsonBody = JSON.parse(body);
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
            if (isJSON) {
                jsonBody = body;
            }
            else {
                jsonBody = JSON.parse(body);
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
            json: parcel,
            headers: authHeaders
        }, function (error, response, body) {

            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);

            bearerToken = body;

            request(opt, function (error, response, body) {
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                var jsonBody = [];
                if (isJSON) {
                    jsonBody = body;
                }
                else {
                    jsonBody = JSON.parse(body);
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
                if (isJSON) {
                    jsonBody = body;
                }
                else {
                    jsonBody = JSON.parse(body);
                }
                if (dataProperty) {
                    //console.log('data:', jsonBody["data"]);
                    cb(jsonBody[dataProperty]);
                }
                else {
                    //console.log('data:', jsonBody);
                    cb(jsonBody);
                }
            });

        })



    }


}





var options_creatio = {
    getUrl: "https://072988-crm-bundle.terrasoft.ru/0/dataservice/json/reply/SelectQuery",
    authType: authTypes.authCookies,
    isJSON: true,
    dataProperty: "rows",
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
                if(modelObj.columnPath.indexOf('date')>-1 || modelObj.columnPath.indexOf('Date')>-1 || modelObj.columnPath.indexOf('CreatedOn')>-1 || modelObj.columnPath.indexOf('createdon')>-1 || modelObj.columnPath.indexOf('ModifiedOn')>-1 || modelObj.columnPath.indexOf('modifiedon')>-1){
                    modelObj.type = 'date';
                }
                else{
                    modelObj.type = typeof (objectPath.get(parserData, modelObj.columnPath));
                }

                model.push(modelObj);


            }
            continue;
        }
        console.log(mainKey + "-" + typeof (valueMainKey));
        modelObj.columnName = mainKey;
        modelObj.columnPath = mainKey;
        

        if(modelObj.columnPath.indexOf('date')>-1 || modelObj.columnPath.indexOf('Date')>-1 || modelObj.columnPath.indexOf('CreatedOn')>-1 || modelObj.columnPath.indexOf('createdon')>-1 || modelObj.columnPath.indexOf('ModifiedOn')>-1 || modelObj.columnPath.indexOf('modifiedon')>-1){
            modelObj.type = 'date';
        }
        else{
            modelObj.type = typeof (valueMainKey);
        }

        model.push(modelObj);


    }

    console.log(model);
    return model;

}


function putDataMSSQL(options, cb) {
    function insertRows() {

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
                if(typeof val === "object") {val = JSON.stringify(val); val = val.replace("'", "");};
                sqlStr = sqlStr + "'" + val + "',"

            }
            sqlStr = sqlStr.substring(0, sqlStr.length - 1);
            sqlStr = sqlStr + "),";





        }
        sqlStr = sqlStr.substring(0, sqlStr.length - 1);
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
            .finally(()=>{
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
                    sqlStr = sqlStr + column.columnName + " " + typeC + " ";
                    if (column.columnName === 'id' || column.columnName === 'ID' || column.columnName === '_id' || column.columnName === 'Id') {
                        sqlStr = sqlStr + "NOT NULL PRIMARY KEY"
                    }
                    sqlStr = sqlStr + ","


                }
                sqlStr = sqlStr.substring(0, sqlStr.length - 1);
                sqlStr = sqlStr + ")"
                console.log(sqlStr);

                mssql.connect().then((pool) => {
                    pool.query(sqlStr);
                })
                    .then(result => {
                        console.log("Table " + options.tableName + " created!");
                        insertRows();
                    })
                    .catch(error => {
                        console.log(error);
                    })




            }
            else {

                insertRows();


            }

        });
    });

}


getData(options_creatio, function (data) {



    //console.log(data);
    var model = parseModel(data[0]);
    var options = {
        db_config: {
            "user": "test", //default is sa
            "password": "Professional2",
            "server": "localhost", // for local machine
            "database": "company_dwh", // name of database
            "options": {
                "enableArithAbort": true
            },
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            }

        },
        tableName: "opportunities",
        model: model,
        data: data

    }
    putDataMSSQL(options, () => {
        
    });

});