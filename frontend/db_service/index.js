
var bcrypt = require('bcrypt');
const request = require('request');
var cookie = require('cookie');
var cookies_js = require('js-cookie');

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
    if (req.url === '/signin') {
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
    var clientid = req.body.clientid;
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
            if (err)
                res.end(JSON.stringify(err));
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
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });
    }

    if (action === 'delete') {
        id = req.body[idName];
        sqlStr = "delete from " + tableName + " where " + idName + " = " + id;

        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
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
            sqlStr = "select * from " + tableName + " where clientid = " + clientid;
        }


        con.query(sqlStr, function (err, result) {
            if (err)
                res.end(JSON.stringify(err));
            res.end(JSON.stringify(result));

        });


    }
}

app.post('/table/:tableName/action/:action', function (req, res) {

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
            console.error('authbody:', body);
            console.error('error:', error);
            console.log('statusCode:', response && response.statusCode);
            var h = cookie.parse(response.headers["set-cookie"].join(';'));
            var t = response.headers["set-cookie"];
            opt.headers = {};
            opt.headers[".ASPXAUTH"] = h[".ASPXAUTH"];
            opt.headers["BPMCSRF"] = h["BPMCSRF"];
            // cookies_js.set('.ASPXAUTH', h[".ASPXAUTH"],{'path':'/', 'domain':'072988-crm-bundle.terrasoft.ru'});
            // cookies_js.set('BPMCSRF', h["BPMCSRF"],{'path':'/', 'domain':'072988-crm-bundle.terrasoft.ru'});

            //opt.headers["Content-Type"] = "application/json";
            opt.method = "POST";
            // console.log(cookies_js.get(".ASPXAUTH"));
            console.log('opt:', opt);
            
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

var options = {
    getUrl: "https://reqres.in/api/users?page=1",
    authType: "none",
    isJSON: false,
    dataProperty: "data",
    authUrl: "",
    login: "",
    password: "",
    parcel: {}

}

var options_creatio = {
    getUrl: "https://072988-crm-bundle.terrasoft.ru/0/dataservice/json/reply/SelectQuery",
    authType: authTypes.authCookies,
    isJSON: true,
    dataProperty: "",
    authUrl: "https://072988-crm-bundle.terrasoft.ru/ServiceModel/AuthService.svc/Login",
    login: "",
    password: "",
    authParcel: {
        "UserName": "Саулин Андрей",
        "UserPassword": "Professional1"
    },
    authHeaders: {
        "ForceUseSession": false,
        "Content-Type": "application/json"
    },
    parcel: {
        "RootSchemaName": "Opportunity",
        "OperationType": 0,

        "AllColumns": true,
        "Filters": {
            "RootSchemaName": "Opportunity",
            "FilterType": 1,
            "ComparisonType": "GreaterOrEqual",
            "LeftExpression": { "ExpressionType": 0, "ColumnPath": "CreatedOn" },
            "RightExpression": { "ExpressionType": 1, "FunctionType": 1, "MacrosType": 10 }

        }

    }

}
getData(options_creatio, function (data) {

    console.log(data);

});