import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';


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

function getStepContent(step,handleReqParcelVal,reqParcelVal) {
    switch (step) {
        case 0:
            return (
                <div style={{ margin: '20px' }}>
                    <h3>{"Настройки запроса"}</h3>
                    <TextField id="name" label="Название источника" variant="filled" required helperText={"Название для дальнейшего выбора из списка"} size={"small"} fullWidth />
                    <TextField id="getUrl" label="URL запроса" variant="filled" required helperText={"URL для получения данных"} size={"small"} fullWidth />
                    <p>{"Данные для запрорса"}</p>
                    <AceEditor
                        mode="javascript"
                        theme="github"
                        onChange={handleReqParcelVal}
                        name="ACE_DIV"
                        editorProps={{ $blockScrolling: false }}
                        value={reqParcelVal}
                    />

                </div>



            );
        case 1:
            return (
                <div>
                    <h3>{"Аутентификация"}</h3>

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
    const [reqParcelVal, setreqParcelVal] = React.useState("");
    
    const handleReqParcelVal = (val) => {
        setreqParcelVal(val);
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
                            <Typography className={classes.instructions}>{getStepContent(activeStep, handleReqParcelVal,reqParcelVal)}</Typography>
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
