/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import Authcontrol from './Authcontrol';
import Login from './components/Login';

import Admin from "layouts/Admin.js";
import RTL from "layouts/RTL.js";
import "assets/css/material-dashboard-react.css?v=1.8.0";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ruRU } from '@material-ui/core/locale';
const theme = createMuiTheme({

}, ruRU);


// core components




const hist = createBrowserHistory();


ReactDOM.render(

  <Router history={hist}> {Authcontrol.isUserAuthenticated() ?
    <ThemeProvider theme={theme}>
      <Switch>
        <Route path="/admin" component={Admin} />
        {/* <Route path="/rtl" component={RTL} /> */}
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </ThemeProvider>
    :
    <Login />
  }
  </Router>,
  document.getElementById("root")

);
