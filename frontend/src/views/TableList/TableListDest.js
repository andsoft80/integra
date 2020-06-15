import React, { useEffect, useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import TableMyDest from "components/Table/myTableDest.js";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import axios from 'axios';
import be_conf from '../../be_config';
import Authcontrol from '../../Authcontrol';

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TableList() {
  const [data, setData] = useState([]);
  const [openEdit, setEdit] = useState(false);

  const handleUpdateData = () =>{
    axios.post(be_conf.server + '/table/destinations/action/get', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
    .then(function (response) {
  
      
      if(response.data!=="need_auth"){
        setData(response.data);
      } 
  
    })
    
  }


  useEffect(() => {
    handleUpdateData();
    

    
  },[]);

  const handleEdit = () =>{
    setEdit(true);
  }






  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
          <div style={{ display: 'flex' }}>
                <div><h4 className={classes.cardTitleWhite}>Список хранилищ</h4>



                  {/* <p className={classes.cardCategoryWhite}>
                    Настраиваются подключения к облачным системам
              </p> */}
                </div>
                <div style={{ "margin-left": 'auto' }}>
                  {/* <Fab color="default" aria-label="add">
                    <AddIcon  onClick = {handleEdit}/>
                  </Fab> */}
                </div>
              </div>

          </CardHeader>
          <CardBody>

          <TableMyDest edit = {openEdit} updateData = {handleUpdateData}

                columns={[
                  { id: 'id', numeric: true, disablePadding: false, label: 'Код' },
                  { id: 'name', numeric: true, disablePadding: false, label: 'Название' },
                  { id: 'host', numeric: true, disablePadding: false, label: 'URL назначение' },
                  { id: 'typeDB', numeric: true, disablePadding: false, label: 'Тип хранилища'},
                  { id: 'dbName', numeric: true, disablePadding: false, label: 'Имя БД'},
                  { id: 'login', numeric: true, disablePadding: false, label: 'Пользователь БД' },
                  
                  { id: 'password', numeric: true, disablePadding: false, label: 'Пароль БД'},
                  // { id: 'options', numeric: true, disablePadding: false, label: 'Опции подключения'}


                ]}

                data={data}

              />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
