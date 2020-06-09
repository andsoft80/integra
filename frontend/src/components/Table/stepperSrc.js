import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import axios from 'axios';
import be_conf from '../../be_config';
import Authcontrol from './../../Authcontrol';


import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    button: {
        marginRight: theme.spacing(1),
    },
    instructions: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1),
    },
}));


function getSteps() {
    return ['Настройки запроса', 'Аутентификация', 'Дополнительные настройки', 'Проверка данных'];
}

// function onChange(newValue) {
//     setreqParcelVal(newValue);
//   }

function getStepContent(step,
    handleReqParcelVal,
    reqParcelVal,
    handleAuthParcelVal,
    authParcelVal,
    handleReqHeaderVal,
    reqHeaderVal,
    handleAuthHeaderVal,
    authHeaderVal,
    editRow,
    getUrl,
    authUrl,
    name,
    handleGetUrl,
    handleAuthUrl,
    handleName,
    authType,
    handleAuthType,
    login,
    password,
    handleLogin,
    handlePassword,
    dataProperty,
    csrfHeaderName,
    handleDataProperty,
    handleCsrfHeaderName,
    reqAnswer,
    handleDataCheck,
    isJSON,
    handleIsJSON,
    handlePkName,
    pkName,
    tableName,
    handleTableName



) {

    switch (step) {
        case 0:
            return (
                <div style={{ margin: '20px' }}>
                    <h3>{"Настройки запроса"}</h3>
                    <TextField
                        id="name"
                        name="name"
                        label="Название источника"
                        variant="filled"
                        required
                        helperText={"Название для дальнейшего выбора из списка"}
                        size={"small"}
                        fullWidth
                        // defaultValue={editRow ? editRow.name : ""}
                        value={name}
                        onChange={handleName}
                    />
                    <TextField
                        id="getUrl"
                        label="URL запроса"
                        variant="filled"
                        required
                        helperText={"URL для получения данных"}
                        size={"small"}
                        fullWidth
                        // defaultValue={editRow ? editRow.getUrl : ""}
                        value={getUrl}
                        onChange={handleGetUrl}
                    />
                    <p>{"Headers для запроса в виде JSON"}</p>
                    <div style={{ border: "1px solid" }}>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            onChange={handleReqHeaderVal}
                            name="headers"
                            editorProps={{ $blockScrolling: false }}
                            setOptions={{

                            }}
                            value={reqHeaderVal}
                            height={"300px"}
                            width={"100%"}


                        />
                    </div>
                    <p>{"Данные для запроса"}</p>
                    <div style={{ border: "1px solid" }}>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            onChange={handleReqParcelVal}
                            name="reqData"
                            editorProps={{ $blockScrolling: false }}
                            setOptions={{

                            }}
                            value={reqParcelVal}
                            height={"300px"}
                            width={"100%"}


                        />
                    </div>

                </div>



            );
        case 1:

            return (
                <div style={{ margin: '20px' }}>
                    <h3>{"Аутентификация"}</h3>
                    <TextField
                        id="authType"
                        select
                        required
                        size={"small"}
                        label="Тип"
                        value={authType}
                        onChange={handleAuthType}
                        helperText="Выберите тип аутентификации"
                        variant="filled"
                    // width = "200"
                    >

                        <MenuItem key={"none"} value={"none"}>
                            {"Без аутентификации"}
                        </MenuItem>
                        <MenuItem key={"basic"} value={"basic"}>
                            {"Basic аутентификация"}
                        </MenuItem>
                        <MenuItem key={"bearer"} value={"bearer"}>
                            {"Bearer аутентификация"}
                        </MenuItem>
                        <MenuItem key={"authCookies"} value={"authCookies"}>
                            {"Header cookie аутентификация"}
                        </MenuItem>

                    </TextField>
                    <TextField
                        id="authUrl"
                        label="URL аутентификации"
                        variant="filled"

                        helperText={"URL для отправки запроса на аутентификацию"}
                        size={"small"}
                        fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={authUrl}
                        onChange={handleAuthUrl}
                    />
                    <TextField
                        id="login"
                        label="Basic логин"
                        variant="filled"

                        helperText={"Логин для basic аутентификации"}
                        size={"small"}
                        // fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={login}
                        onChange={handleLogin}
                    />
                    <TextField
                        style={{ marginLeft: "10px" }}
                        id="password"
                        label="Basic пароль"
                        variant="filled"

                        helperText={"Пароль для basic аутентификации"}
                        size={"small"}
                        // fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={password}
                        onChange={handlePassword}
                    />
                    {/* <TextField id="csrfHeaderName" label="csrfHeaderName" variant="filled" required helperText={"csrfHeaderName"} size={"small"} fullWidth defaultValue={editRow ? editRow.csrfHeaderName : ""} /> */}
                    <p>{"Headers для аутентификации в виде JSON"}</p>
                    <div style={{ border: "1px solid" }}>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            onChange={handleAuthHeaderVal}
                            name="authHeaders"
                            editorProps={{ $blockScrolling: false }}
                            setOptions={{

                            }}
                            value={authHeaderVal}
                            height={"300px"}
                            width={"100%"}


                        />
                    </div>
                    <p>{"Данные для запроса аутентификации"}</p>
                    <div style={{ border: "1px solid" }}>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            onChange={handleAuthParcelVal}
                            name="authData"
                            editorProps={{ $blockScrolling: false }}
                            setOptions={{

                            }}
                            value={authParcelVal}
                            height={"300px"}
                            width={"100%"}


                        />
                    </div>
                </div>



            );
        case 2:
            return (
                <div>
                    <h3>{"Дополнительные настройки"}</h3>
                    <TextField
                        // style={{ marginLeft: "10px" }}
                        id="dataProperty"
                        label="Свойство данных"
                        variant="filled"

                        helperText={"Свойство в JSON ответе, с массивом данных"}
                        size={"small"}
                        // fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={dataProperty}
                        onChange={handleDataProperty}
                    />
                    <TextField
                        style={{ marginLeft: "10px" }}
                        id="csrfHeaderName"
                        label="Название CSRF"
                        variant="filled"

                        helperText={"Название CSRF заголовка, для отправки с запросом"}
                        size={"small"}
                        // fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={csrfHeaderName}
                        onChange={handleCsrfHeaderName}
                    />
                    <br />
                    <TextField
                        // style={{ marginLeft: "10px" }}
                        id="pkName"
                        label="Имя первичного ключа"
                        variant="filled"
                        required
                        helperText={"Имя первичного ключа. Обычно id"}
                        size={"small"}
                        // fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={pkName}
                        onChange={handlePkName}
                    />
                    <TextField
                        style={{ marginLeft: "10px" }}
                        id="tableName"
                        label="Имя таблицы назначения"
                        variant="filled"
                        required
                        helperText={"Имя таблицы для базы данных назначения"}
                        size={"small"}
                        // fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={tableName}
                        onChange={handleTableName}
                    />
                    {/* <TextField
                        id="isJSON"
                        select
                        required
                        size={"small"}
                        label="Формат ответа"
                        value={isJSON}
                        onChange={handleIsJSON}
                        helperText="Выберите формат ответа на запрос данных "
                        variant="filled"
                        fullWidth
                    >

                        <MenuItem key={1} value={1}>
                            {"JSON"}
                        </MenuItem>
                        <MenuItem key={0} value={0}>
                            {"Строка"}
                        </MenuItem>


                    </TextField> */}

                </div>



            );

        case 3:
            return (
                <div>
                    <h3>{"Проверка данных"}</h3>

                    <Button color={"primary"} onClick={handleDataCheck}>
                        Проверить получение данных
                    </Button>

                    <div style={{ border: "1px solid" }}>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            // onChange={handleReqAnswer}
                            name="reqAnswer"
                            editorProps={{ $blockScrolling: false }}
                            setOptions={{

                            }}
                            value={reqAnswer}
                            height={"300px"}
                            width={"100%"}


                        />
                    </div>


                </div>



            );

    }
}

export default function HorizontalLinearStepper(props) {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
    const [skipped, setSkipped] = React.useState(new Set());
    const [reqParcelVal, setreqParcelVal] = React.useState(props.editRow.parcel);
    const [authParcelVal, setAuthParcelVal] = React.useState(props.editRow.authParcel);
    const [reqHeaderVal, setReqHeaderVal] = React.useState(props.editRow.headers);
    const [authHeaderVal, setAuthHeaderVal] = React.useState(props.editRow.authHeaders);

    const [getUrl, setGetUrl] = React.useState(props.editRow.getUrl ? props.editRow.getUrl : "");
    const [authUrl, setAuthUrl] = React.useState(props.editRow.authUrl ? props.editRow.authUrl : "");
    const [name, setName] = React.useState(props.editRow.name ? props.editRow.name : "");
    const [authType, setAuthType] = React.useState(props.editRow.authType ? props.editRow.authType : "none");
    const [login, setLogin] = React.useState(props.editRow.login ? props.editRow.login : "");
    const [password, setPassword] = React.useState(props.editRow.password ? props.editRow.password : "");
    const [dataProperty, setDataProperty] = React.useState(props.editRow.dataproperty ? props.editRow.dataproperty : "");
    const [csrfHeaderName, setCsrfHeaderName] = React.useState(props.editRow.csrfHeaderName ? props.editRow.csrfHeaderName : "");
    const [isJSON, setIsJSON] = React.useState(props.editRow.isJSON ? props.editRow.isJSON : 1);
    const [reqAnswer, setReqAnswer] = React.useState("");
    const [pkName, setPkName] = React.useState(props.editRow.pkName ? props.editRow.pkName : "");
    const [tableName, setTableName] = React.useState(props.editRow.tableName ? props.editRow.tableName : "");

    const handleTableName = (e) => {
        setTableName(e.target.value);
    }

    const handlePkName = (e) => {
        setPkName(e.target.value);
    }


    const handleDataCheck = () => {
        var reqStructure = {};
        reqStructure.getUrl = getUrl;
        reqStructure.authUrl = authUrl;
        reqStructure.authType = authType;
        reqStructure.login = login;
        reqStructure.password = password;
        reqStructure.dataProperty = dataProperty;
        reqStructure.csrfHeaderName = csrfHeaderName;
        reqStructure.authParcel = authParcelVal ? JSON.parse(authParcelVal) : {};
        reqStructure.authHeaders = authHeaderVal ? JSON.parse(authHeaderVal) : {};
        reqStructure.headers = reqHeaderVal ? JSON.parse(reqHeaderVal) : {};
        reqStructure.parcel = reqParcelVal ? JSON.parse(reqParcelVal) : {};
        // reqStructure.isJSON = isJSON===0?false:true;

        // console.log(JSON.stringify(reqStructure));
        // return;
        axios.post(be_conf.server + '/getData', reqStructure, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {


                setReqAnswer(JSON.stringify(response.data));

            })

    }

    const handleIsJSON = (e) => {
        setIsJSON(e.target.value);
    }
    const handleDataProperty = (e) => {
        setDataProperty(e.target.value);
    }
    const handleCsrfHeaderName = (e) => {
        setCsrfHeaderName(e.target.value);
    }
    const handleLogin = (e) => {
        setLogin(e.target.value);
    }

    const handlePassword = (e) => {
        setPassword(e.target.value);
    }



    const handleAuthType = (e) => {
        setAuthType(e.target.value);
    }

    const handleGetUrl = (e) => {
        setGetUrl(e.target.value);
    }
    const handleAuthUrl = (e) => {
        setAuthUrl(e.target.value);
    }
    const handleName = (e) => {

        setName(e.target.value);
    }


    const handleReqParcelVal = (val) => {
        setreqParcelVal(val);
    }
    const handleAuthParcelVal = (val) => {
        setAuthParcelVal(val);
    }
    const handleReqHeaderVal = (val) => {
        setReqHeaderVal(val);
    }
    const handleAuthHeaderVal = (val) => {
        setAuthHeaderVal(val);
    }


    const steps = getSteps(reqParcelVal);


    const isStepOptional = (step) => {
        //return step === 1;
        return false;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleNext = () => {

        if (activeStep === 0) {
            if (!document.getElementById("name").value || !document.getElementById("getUrl").value) {
                alert("Заполните поля Название источника и URL запроса");
                return;
            }
            if (reqParcelVal) {
                try {

                    // код ...
                    JSON.parse(reqParcelVal)

                } catch (err) {

                    alert("Ошибка в данных запроса: " + err);
                    return;

                }
            }
            if (reqHeaderVal) {
                try {

                    // код ...
                    JSON.parse(reqHeaderVal)

                } catch (err) {

                    alert("Ошибка в headers запроса: " + err);
                    return;

                }
            }
        }
        if (activeStep === 1) {
            // if (!document.getElementById("name").value || !document.getElementById("getUrl").value) {
            //     alert("Заполните поля Название источника и URL запроса");
            //     return;
            // }
            if (authParcelVal) {
                try {

                    // код ...
                    JSON.parse(authParcelVal)

                } catch (err) {

                    alert("Ошибка в данных аутентификации: " + err);
                    return;

                }
            }
            if (authHeaderVal) {
                try {

                    // код ...
                    JSON.parse(authHeaderVal)

                } catch (err) {

                    alert("Ошибка в headers аутентификации: " + err);
                    return;

                }
            }
        }
        if (activeStep === 2) {
            if (!document.getElementById("pkName").value || !document.getElementById("tableName").value) {
                alert("Заполните поля Имя первичного ключа и Имя таблицы назначения");
                return;
            }
        }

        if (activeStep === 3) {

            if (reqAnswer === "\"\"") {
                alert("Полученный ответ не является JSON массивом. Исправьте настройки запросов...");
                return;

            }

            if (reqAnswer.indexOf("[{") !== 0) {
                alert("Полученный ответ не является JSON массивом. Исправьте настройки запросов...");
                return;

            }



            try {
                var l = JSON.parse(reqAnswer);
                var t = l[0];


            }
            catch (err) {
                alert("Полученный ответ не является JSON массивом. Исправьте настройки запросов...");
                return;
            }
            var reqStructure = {};
            reqStructure.getUrl = getUrl;
            reqStructure.authUrl = authUrl;
            reqStructure.authType = authType;
            reqStructure.login = login;
            reqStructure.password = password;
            reqStructure.dataProperty = dataProperty;
            reqStructure.csrfHeaderName = csrfHeaderName;
            reqStructure.authParcel = !authParcelVal ? "" : authParcelVal;
            reqStructure.authHeaders = !authHeaderVal ? "" : authHeaderVal;
            reqStructure.headers = !reqHeaderVal ? "" : reqHeaderVal;
            reqStructure.parcel = !reqParcelVal ? "" : reqParcelVal;
            reqStructure.name = name;
            reqStructure.pkName = pkName;
            reqStructure.tableName = tableName;




            // alert(JSON.stringify(reqStructure));

            if (JSON.stringify(props.editRow) !== "{}") {
                reqStructure.id = props.editRow.id;

                axios.post(be_conf.server + '/table/sources/action/put/', reqStructure, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                    .then(function (response) {

                        // alert(JSON.stringify(response));

                    })
                    .catch((err) => {
                        alert(err);
                        return;
                    })
            }
            else {
                axios.post(be_conf.server + '/table/sources/action/post/', reqStructure, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                    .then(function (response) {
                        // alert(JSON.stringify(response));



                    })
                    .catch((err) => {
                        alert(err);
                        return;
                    })

            }



        }



        let newSkipped = skipped;
        if (isStepSkipped(activeStep)) {
            newSkipped = new Set(newSkipped.values());
            newSkipped.delete(activeStep);
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped(newSkipped);
    };

    const handleBack = () => {

        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleSkip = () => {
        if (!isStepOptional(activeStep)) {
            // You probably want to guard against something like this,
            // it should never occur unless someone's actively trying to break something.
            throw new Error("You can't skip a step that isn't optional.");
        }

        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setSkipped((prevSkipped) => {
            const newSkipped = new Set(prevSkipped.values());
            newSkipped.add(activeStep);
            return newSkipped;
        });
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Stepper activeStep={activeStep} orientation={props.vertical ? "vertical" : "horizontal"}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Опционально</Typography>;
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
            <div>
                {activeStep === steps.length ? (
                    <div>
                        <Typography className={classes.instructions}>
                            Данные успешно сохранены...
            </Typography>
                        <Button onClick={handleReset} className={classes.button}>
                            Повторить
            </Button>
                    </div>
                ) : (
                        <div>
                            <Typography className={classes.instructions}>{
                                getStepContent(
                                    activeStep,
                                    handleReqParcelVal,
                                    reqParcelVal,
                                    handleAuthParcelVal,
                                    authParcelVal,
                                    handleReqHeaderVal,
                                    reqHeaderVal,
                                    handleAuthHeaderVal,
                                    authHeaderVal,
                                    props.editRow,
                                    getUrl,
                                    authUrl,
                                    name,
                                    handleGetUrl,
                                    handleAuthUrl,
                                    handleName,
                                    authType,
                                    handleAuthType,
                                    login,
                                    password,
                                    handleLogin,
                                    handlePassword,
                                    dataProperty,
                                    csrfHeaderName,
                                    handleDataProperty,
                                    handleCsrfHeaderName,
                                    reqAnswer,
                                    handleDataCheck,
                                    isJSON,
                                    handleIsJSON,
                                    handlePkName,
                                    pkName,
                                    tableName,
                                    handleTableName



                                )
                            }
                            </Typography>
                            <div>
                                <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                                    Назад
              </Button>
                                {isStepOptional(activeStep) && (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={handleSkip}
                                        className={classes.button}
                                    >
                                        Пропустить
                                    </Button>
                                )}

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleNext}
                                    className={classes.button}
                                >
                                    {activeStep === steps.length - 1 ? 'Завершить и сохранить' : 'Вперед'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
