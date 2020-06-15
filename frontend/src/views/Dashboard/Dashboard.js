// import React from "react";
import React, { useEffect, useState } from 'react';
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import WorkOffIcon from '@material-ui/icons/WorkOff';
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import TableMy from "components/Table/myTable.js";

import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ViewListIcon from '@material-ui/icons/ViewList';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import axios from 'axios';
import be_conf from '../../be_config';
import Authcontrol from './../../Authcontrol';

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);




export default  function Dashboard() {
  
  const [data, setData] = useState([]);

  const handleUpdateData = () =>{
    axios.post(be_conf.server + '/table/processes/action/get', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
    .then(function (response) {
  
      if(response.data!=="need_auth"){
        setData(response.data);
      } 
      
  
    })
    
  }


  useEffect(() => {
    handleUpdateData();
    

    
  },[]);










  
  const classes = useStyles();


  return (

    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card >
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <PriorityHighIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Процессы с ошибкой</p>
              <h3 className={classes.cardTitle}>1</h3>

            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>

                <ViewListIcon />

                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Показать
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>

      </GridContainer>

      <GridContainer>

        <GridItem xs={12} sm={12} md={12}>
          <Card plain>
            <CardHeader color="primary">
              <div style={{ display: 'flex' }}>
                <div><h4 className={classes.cardTitleWhite}>Интеграционные порцессы</h4>



                  {/* <p className={classes.cardCategoryWhite}>
                    Контрооль пакетных заданий
              </p> */}
                </div>
                <div style={{ "margin-left": 'auto' }}>
                  {/* <Fab color="default" aria-label="add">
                    <AddIcon />
                  </Fab> */}
                </div>
              </div>
            </CardHeader>
            <CardBody>
              {/* <Table
                tableHeaderColor="warning"
                tableHead={["Тип", "Период", "Дней", "Причина", "Согласована"]}
                tableData={[
                  ["Отпуск", "21.11.2020 - 23.11.2020", "3", "Отпуск", "Ожидает..."],
                  ["Удаленная работа", "24.11.2020 - 27.11.2020", "3", "Отпуск","Матюхин Д."],

                ]}
              /> */}

              <TableMy
                tableHead={["Тип", "Период", "Дней", "Причина", "Согласована"]}
                tableData={[
                  ["Отпуск", "21.11.2020 - 23.11.2020", "3", "Отпуск", "Ожидает..."],
                  ["Удаленная работа", "24.11.2020 - 27.11.2020", "3", "Отпуск", "Матюхин Д."],

                ]}
                columns={[
                  { id: 'id', numeric: true, disablePadding: false, label: 'Код' },
                  { id: 'sourcename', numeric: true, disablePadding: false, label: 'Источник' },
                  { id: 'destinationname', numeric: true, disablePadding: false, label: 'Назначение' },
                  { id: 'periodmin', numeric: true, disablePadding: false, label: 'Периодичность, мин' },
                  { id: 'active', numeric: true, disablePadding: false, label: 'Активен' , check:"play"},
                  { id: 'lasttime', numeric: true, disablePadding: false, label: 'Время запуска' },
                  { id: 'success', numeric: true, disablePadding: false, label: 'Успешно' , check:"check"},
                  { id: 'error', numeric: true, disablePadding: false, label: 'Ошибка' },
                ]}

                data={data}
                updateData = {handleUpdateData}

              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
