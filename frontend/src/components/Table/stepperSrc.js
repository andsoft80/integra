import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


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
    handleAuthType    



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
                        required
                        helperText={"URL для отправки запроса на аутентификацию"}
                        size={"small"}
                        fullWidth
                        // defaultValue={editRow ? editRow.authUrl : ""}
                        value={authUrl}
                        onChange={handleAuthUrl}
                    />
                    {/* <TextField id="csrfHeaderName" label="csrfHeaderName" variant="filled" required helperText={"csrfHeaderName"} size={"small"} fullWidth defaultValue={editRow ? editRow.csrfHeaderName : ""} /> */}
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

                </div>



            );

        case 3:
            return (
                <div>
                    <h3>{"Проверка данных"}</h3>

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
    const [authType, setAuthType] = React.useState(props.editRow.authType ? props.editRow.authType : "");

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

            try {

                // код ...
                JSON.parse(reqParcelVal)

            } catch (err) {

                alert("Ошибка в данных запроса: " + err);
                return;

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
                            Все шаги завершены - можно сохранять...
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
                                    handleAuthType

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
                                    {activeStep === steps.length - 1 ? 'Завершить' : 'Вперед'}
                                </Button>
                            </div>
                        </div>
                    )}
            </div>
        </div>
    );
}
