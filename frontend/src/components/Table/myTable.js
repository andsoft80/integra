import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
//import { TableContainer } from '@material-ui/core';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';

import axios from 'axios';
import be_conf from '../../be_config';
import Authcontrol from './../../Authcontrol';


import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import { isConstructorDeclaration } from 'typescript';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

// function createData(name, calories, fat, carbs, protein) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Donut', 452, 25.0, 51, 4.9),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//     createData('Honeycomb', 408, 3.2, 87, 6.5),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Jelly Bean', 375, 0.0, 94, 0.0),
//     createData('KitKat', 518, 26.0, 65, 7.0),
//     createData('Lollipop', 392, 0.2, 98, 0.0),
//     createData('Marshmallow', 318, 0, 81, 2.0),
//     createData('Nougat', 360, 19.0, 9, 37.0),
//     createData('Oreo', 437, 18.0, 63, 4.0),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

// const headCells = [
//     { id: 'name', numeric: false, disablePadding: true, label: 'Dessert (100g serving)' },
//     { id: 'calories', numeric: true, disablePadding: false, label: 'Calories' },
//     { id: 'fat', numeric: true, disablePadding: false, label: 'Fat (g)' },
//     { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
//     { id: 'protein', numeric: true, disablePadding: false, label: 'Protein (g)' },
// ];

function EnhancedTableHead(props) {
    const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{ 'aria-label': 'select all desserts' }}
                    />
                </TableCell>
                {props.headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} Выбрано
                </Typography>
            ) : (
                    <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                        Выберите записи
                    </Typography>
                )}

            {numSelected > 0 ? (
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Запустить" onClick={props.start}>
                        <IconButton aria-label="delete">
                            <PlayArrowIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Остановить" onClick={props.pause}>
                        <IconButton aria-label="delete">
                            <PauseIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Удалить" onClick={props.delete}>
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>
            ) : (

                    <div style={{ display: 'flex' }}>
                        {/* <Tooltip title="Добавить">
                            <IconButton aria-label="delete">
                                <AddIcon />
                            </IconButton>
                        </Tooltip> */}
                        <Fab color="default" aria-label="add" onClick={props.create}>
                            <AddIcon />
                        </Fab>
                    </div>
                )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

export default function EnhancedTable(props) {
    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(props.columns[0].id);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [editD, setEditDialog] = React.useState(false);
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [dialogEditMode, setDialogEditMode] = React.useState("false");
    const [editRow, setEditRow] = React.useState({});
    const [src, setSrc] = React.useState([]);
    const [dest, setDest] = React.useState([]);
    const [srcVal, setSrcVal] = React.useState("");
    const [destVal, setDestVal] = React.useState("");



    const handleStart =(e)=>{
        for (var i = 0; i < selected.length; i++) {

            axios.post(be_conf.server + '/table/processes/action/put', { "id": selected[i], "active":1 }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {
                    props.updateData();

                })
        }
       
    }

    const handlePause =(e)=>{
        for (var i = 0; i < selected.length; i++) {

            axios.post(be_conf.server + '/table/processes/action/put', { "id": selected[i], "active":0 }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {
                    props.updateData();
                })
        }
        
    }

    const handleSrcVal = (e) => {
        setSrcVal(e.target.value);
    }

    const handleDestVal = (e) => {
        setDestVal(e.target.value);
    }







    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleSave = (e) => {
        var parcel = {};

        parcel.sourcename = document.getElementById("src").innerText;
        parcel.sourceid = srcVal;
        parcel.destinationname = document.getElementById("dest").innerText;
        parcel.destinationid = destVal;
        parcel.periodmin = document.getElementById("period").value;
        parcel.active = 0;
        parcel.success = 1;
        parcel.error = "";
        parcel.lasttime = "1900-01-01 00:00:00";


        


        if (
            parcel.sourceid === ""||
            parcel.destinationid === ""||
            parcel.periodmin === ""||
            parcel.periodmin === "0"

        ) {

            alert("Все поля обязательные!");
            return;

        }

        if (

            parcel.periodmin < 0

        ) {

            alert("Перионд должен быть больше нуля!");
            return;

        }

        if (JSON.stringify(editRow) !== "{}") {
            parcel.id = editRow.id;

            axios.post(be_conf.server + '/table/processes/action/put/', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {

                    //alert(JSON.stringify(response));
                    handleClose();
                    props.updateData();

                })
                .catch((err) => {
                    alert(err);
                    return;
                })
        }
        else {
            axios.post(be_conf.server + '/table/processes/action/post/', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {
                    // alert(JSON.stringify(response));
                    handleClose();
                    props.updateData();


                })
                .catch((err) => {
                    alert(err);
                    return;
                })

        }

    }

    const handleClose = () => {
        setEditDialog(false);
        setSrcVal("");
        setDestVal("");

    };

    const handleEditDialog = () => {

        if (selected.length > 1) {
            alert("Выберите тоько одну строку для редактирования!");

        }
        else {

            var editId = selected[0];
            var data = props.data;
            const result = data.filter(row => row.id === editId);
            // alert(JSON.stringify(result));
            setDialogTitle("Редактирование записи");
            setEditDialog(true);
            setEditRow(result[0]);
            setDialogEditMode(true);
            // setOptions(result[0].options);


        }

    };

    const getSrcDest = () => {
        axios.post(be_conf.server + '/table/sources/action/get/', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {

                // alert(JSON.stringify(response));
                if(response.data!=="need_auth"){
                    setSrc(response.data);
                  } 
                


            })
            .catch((err) => {
                alert(err);
                return;
            })

        axios.post(be_conf.server + '/table/destinations/action/get/', {}, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {

                if(response.data!=="need_auth"){
                    setDest(response.data);
                  } 

                // alert(JSON.stringify(response));
                

            })
            .catch((err) => {
                alert(err);
                return;
            })

    }

    const handleCreateDialog = () => {

        getSrcDest();


        setDialogTitle("Новая запись");
        setEditDialog(true);
        setDialogEditMode(false);
        setEditRow({});



    };


    const handleDelete = (e) => {

        if (window.confirm("Удалить выбранные записи?")) {

            for (var i = 0; i < selected.length; i++) {

                axios.post(be_conf.server + '/table/processes/action/delete', { "id": selected[i] }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                    .then(function (response) {
                        props.updateData();

                    })
            }
        }
    };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = props.data.map((n) => n.id);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, props.data.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Dialog
                fullScreen={fullScreen}
                open={editD}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
                disableBackdropClick
                disableEscapeKeyDown
                maxWidth="md"
                fullWidth

            >
                <DialogTitle id="responsive-dialog-title">{dialogTitle}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <TextField
                            id="src"
                            select
                            required
                            size={"small"}
                            label="Источник"
                            value={srcVal}
                            onChange={handleSrcVal}
                            // defaultValue={editRow.typeDB ? editRow.typeDB : "mssql"}
                            helperText="Выберите источник"
                            variant="filled"
                            fullWidth
                        // width = "200"
                        >
                            {
                                src.map((s,key)=>{
                                    return(
                                        <MenuItem key={key} value={s.id}>
                                            {s.name}
                                        </MenuItem>
                                        )
                                    })
                            
                                }


                        </TextField>
                        {/* <br/> */}
                        <TextField
                            id="dest"
                            select
                            required
                            size={"small"}
                            label="Назначение"
                            value={destVal}
                            onChange={handleDestVal}
                            // defaultValue={editRow.typeDB ? editRow.typeDB : "mssql"}
                            helperText="Выберите назначение"
                            variant="filled"
                            fullWidth
                        // width = "200"
                        >
                            {
                                dest.map((s,key)=>{
                                    return(
                                        <MenuItem key={key} value={s.id}>
                                            {s.name}
                                        </MenuItem>
                                        )
                                    })
                            
                                }


                        </TextField>
                        <TextField
                            id="period"
                            // select
                            required
                            size={"small"}
                            label="Периодичность в мин."
                            // value={srcVal}
                            // onChange={handleSrcVal}
                            defaultValue={""}
                            helperText="Укажите периодичность в минутах"
                            variant="filled"
                            type = {"number"}
                            
                            // fullWidth
                        // width = "200"
                        >

                        </TextField>



                    </DialogContentText>
                </DialogContent>
                <DialogActions>

                    <Button autoFocus onClick={handleSave} color="primary">
                        Сохранить
                        </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} delete={handleDelete} create={handleCreateDialog} edit={handleEditDialog} start = {handleStart} pause = {handlePause}/>
                <TableContainer>
                    <Table
                        className={classes.table}
                        aria-labelledby="tableTitle"
                        size={dense ? 'small' : 'medium'}
                        aria-label="enhanced table"
                    >
                        <EnhancedTableHead
                            classes={classes}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={props.data.length}

                            headCells={props.columns}
                        />
                        <TableBody>
                            {stableSort(props.data, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.id);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            onClick={(event) => handleClick(event, row.id)}
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.name}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{ 'aria-labelledby': labelId }}
                                                />
                                            </TableCell>


                                            {props.columns.map((column, index) => {
                                                return (
                                                    column.check
                                                        ? <TableCell align="right">{
                                                            column.check === "check"
                                                                ?
                                                                row[column.id] === 1
                                                                    ? <CheckCircleIcon color="action" />
                                                                    : <ErrorIcon color="secondary" />



                                                                :
                                                                row[column.id] === 1
                                                                    ? <PlayArrowIcon />
                                                                    : <PauseIcon />



                                                        }</TableCell>
                                                        : <TableCell align="right">{row[column.id]}</TableCell>


                                                )

                                            })}

                                            {/* 
                                            <TableCell  padding="none">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right">{row.fat}</TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell> */}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense} />}
                label="Уплотнить строки"
            />
        </div>
    );
}
