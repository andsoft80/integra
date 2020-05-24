import React from "react";
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

import { bugs, website, server } from "variables/general.js";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="info">
                <WorkOffIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Отсутствуют сегодня</p>
              <h3 className={classes.cardTitle}>
                300/ 10050
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger> */}
                <ViewListIcon />
                {/* </Danger> */}
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Список
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <BeachAccessIcon />
              </CardIcon>
              <p className={classes.cardCategory}>В отпуске</p>
              <h3 className={classes.cardTitle}>30</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger> */}
                <ViewListIcon />
                {/* </Danger> */}
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Список
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <LocalHospitalIcon />
              </CardIcon>
              <p className={classes.cardCategory}>Болеют</p>
              <h3 className={classes.cardTitle}>75</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger> */}
                <ViewListIcon />
                {/* </Danger> */}
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Список
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="primary" stats icon>
              <CardIcon color="primary">
                <BusinessCenterIcon />
              </CardIcon>
              <p className={classes.cardCategory}>В командировке</p>
              <h3 className={classes.cardTitle}>11</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                {/* <Danger> */}
                <ViewListIcon />
                {/* </Danger> */}
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Список
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      {/* <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="success">
              <ChartistGraph
                className="ct-chart"
                data={dailySalesChart.data}
                type="Line"
                options={dailySalesChart.options}
                listener={dailySalesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Отсутсвие по дням</h4>
              <p className={classes.cardCategory}>
                <span className={classes.successText}>
                  <ArrowUpward className={classes.upArrowCardCategory} /> 55%
                </span>{" "}
                увеличение сегодня
              </p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Обновить
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="warning">
              <ChartistGraph
                className="ct-chart"
                data={emailsSubscriptionChart.data}
                type="Bar"
                options={emailsSubscriptionChart.options}
                responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                listener={emailsSubscriptionChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Отсутствие по месяцам</h4>
              <p className={classes.cardCategory}>План до конца года</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Обновить
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={completedTasksChart.data}
                type="Line"
                options={completedTasksChart.options}
                listener={completedTasksChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Остатки отпусков</h4>
              <p className={classes.cardCategory}>Среднее по компании</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Обновить
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer> */}
      <GridContainer>
        {/* <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Мои согласования:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Ожидают",
                tabIcon: AccessTime,
                tabContent: (
                  <Table
                  tableHeaderColor="warning"
                  tableHead={["Сотрудник","Тип", "Период", "Дней", "Причина"]}
                  tableData={[
                    ["Жуков А.","Отпуск", "21.11.2020 - 23.11.2020", "3", "Отпуск"],
                    ["Жуков А.","Отгул", "24.11.2020 - 27.11.2020", "3", "Отпуск"],
  
                  ]}
                />
                )
              },
              {
                tabName: "Согласовано",
                tabIcon:  CheckIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Отклонил",
                tabIcon: CloseIcon,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem> */}
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Интеграционные порцессы</h4>
              <p className={classes.cardCategoryWhite}>
                Список активных
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["Тип", "Период", "Дней", "Причина", "Согласована"]}
                tableData={[
                  ["Отпуск", "21.11.2020 - 23.11.2020", "3", "Отпуск", "Ожидает..."],
                  ["Удаленная работа", "24.11.2020 - 27.11.2020", "3", "Отпуск","Матюхин Д."],

                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
