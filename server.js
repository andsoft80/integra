'use strict';

var express = require('express');
const request = require('request');
var app = express();
var cors = require('cors');
app.use(cors());
app.options('*', cors());
var port = process.env.PORT || 3000;
var con_mysql = require('mysql');
var con_mssql = require('mssql');

var jwt = require('express-jwt');
var jwt_sign = require('jsonwebtoken');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port);
console.log('The magic happens on port ' + port);

var authTypes = {
    "none": "none",
    "basic": "basic",
    "jwt": "jwt"
}



function getData(getUrl, authType, isJSON, dataProperty, authUrl,  login, password, parcel, cb) {

    if (authType == authTypes.none) {


        request(getUrl, function (error, response, body) {
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
        request(getUrl, function (error, response, body) {
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
                console.log('data:', jsonBody["data"]);
            }
            else {
                console.log('data:', jsonBody);
            }
        }).auth(login, password, false);
    }

}

getData("https://reqres.in/api/users?page=1", "none", false, "data", "", "", "", "", function (data) {

    console.log(data);

});
/*getData("http://httpbin.org/basic-auth/user/passwd", "basic", false, "", "", "user", "passwd", "", function (data) {

    console.log(data);
});*/
