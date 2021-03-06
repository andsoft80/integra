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
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import StepperSrc from './stepperSrc';
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



import AceEditor from "react-ace";



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
    const [editDialog, setEditDialog] = React.useState(false);


    return (
        <div>

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

                        <Tooltip title="Редктировать" onClick={props.edit}>
                            <IconButton aria-label="delete" >
                                <EditIcon />
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
                            <Fab color="default" aria-label="add" onClick={props.create}>
                                <AddIcon />
                            </Fab>
                            {/* <Tooltip title="Фильтры">
                                <IconButton aria-label="filter list">
                                    <FilterListIcon />
                                </IconButton>
                            </Tooltip> */}
                        </div>
                    )}
            </Toolbar>
        </div>
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
    const [editD, setEditDialog] = React.useState(props.edit);
    const [dialogTitle, setDialogTitle] = React.useState("");
    const [dialogEditMode, setDialogEditMode] = React.useState("false");
    const [editRow, setEditRow] = React.useState({});
    // const [options, setOptions] = React.useState("");
    const [typeDB, setTypeDB] = React.useState("");

    const handleTypeDB = (e) => {
        setTypeDB(e.target.value);
    }

    const handleSave = (e) => { 
        var parcel = {};
        parcel.typeDB = typeDB;
        parcel.name = document.getElementById("name").value;
        parcel.host = document.getElementById("host").value;
        parcel.dbName = document.getElementById("dbName").value;
        parcel.login = document.getElementById("login").value;
        parcel.password = document.getElementById("password").value;

        if (parcel.typeDB === "" ||
        parcel.name === "" ||
        parcel.host === "" ||
        parcel.dbName === "" ||
        parcel.login === "" ||
        parcel.password === "") {

        alert("Все поля обязательные!");
        return;

    }

        if (JSON.stringify(editRow) !== "{}") {
            parcel.id = editRow.id;

            axios.post(be_conf.server + '/table/destinations/action/put/', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {

                    // alert(JSON.stringify(response));
                    handleClose();

                })
                .catch((err) => {
                    alert(err);
                    return;
                })
        }
        else {
            axios.post(be_conf.server + '/table/destinations/action/post/', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                .then(function (response) {
                    // alert(JSON.stringify(response));
                    handleClose();


                })
                .catch((err) => {
                    alert(err);
                    return;
                })

        }

    }



    const handleCheck = (e) => {
        var parcel = {};

        parcel.typeDB = typeDB;
        parcel.name = document.getElementById("name").value;
        parcel.server = document.getElementById("host").value;
        parcel.database = document.getElementById("dbName").value;
        parcel.user = document.getElementById("login").value;
        parcel.password = document.getElementById("password").value;
        // try{
        //     parcel.options = JSON.parse(options);
        // }
        // catch(err){
        //     alert("Ошибка формата JSON в опциях : "+err);
        //     return;
        // }

        // alert(JSON.stringify(parcel));

        if (parcel.typeDB === "" ||
            parcel.name === "" ||
            parcel.server === "" ||
            parcel.database === "" ||
            parcel.user === "" ||
            parcel.password === "") {

            alert("Все поля обязательные!");
            return;

        }

        axios.post(be_conf.server + '/checkConnection', parcel, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
            .then(function (response) {
                alert(JSON.stringify(response.data));
            })




    }

    // const handleOptions = (val) => {
    //     setOptions(val);
    // }
    // const handleTitleNew = () => {
    //     setDialogTitle("Новая запись");
    // };

    // const handleTitleEdit = () => {
    //     setDialogTitle("Редактирование записи");
    // };




    const [open, setOpen] = React.useState(props.edit);


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const handleClose = () => {
        setEditDialog(false);
         props.updateData();

    };

    const handleOpenDialog = () => {

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
            setTypeDB(result[0].typeDB);

        }

    };


    const handleCreateDialog = () => {

        setDialogTitle("Новая запись");
        setEditDialog(true);
        setDialogEditMode(false);
        setEditRow({});
        // setOptions("");
        setTypeDB("mssql");

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

    const handleDelete = (e) => {

        if (window.confirm("Удалить выбранные записи?")) {

            for (var i = 0; i < selected.length; i++) {

                axios.post(be_conf.server + '/table/destinations/action/delete', { "id": selected[i] }, { headers: { "Authorization": 'Bearer ' + Authcontrol.getToken() } })
                    .then(function (response) {
                        props.updateData();

                    })
            }
        }
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
                            id="name"
                            label="Название"
                            variant="filled"
                            required
                            helperText={"Название подключения"}
                            size={"small"}
                            fullWidth
                            defaultValue={editRow.name ? editRow.name : ""}
                        // value={authUrl}
                        // onChange={handleAuthUrl}
                        />

                        <TextField
                            id="host"
                            label="URL назначения"
                            variant="filled"
                            required
                            helperText={"Полный URL подключения к хранилищу"}
                            size={"small"}
                            fullWidth
                            defaultValue={editRow.host ? editRow.host : ""}
                        // value={authUrl}
                        // onChange={handleAuthUrl}
                        />
                        <TextField
                            id="typeDB"
                            select
                            required
                            size={"small"}
                            label="Тип хранилища"
                            value={typeDB}
                            onChange={handleTypeDB}
                            // defaultValue={editRow.typeDB ? editRow.typeDB : "mssql"}
                            helperText="Выберите тип хранилища"
                            variant="filled"
                        // width = "200"
                        >

                            <MenuItem key={"mssql"} value={"mssql"}>
                                {"MS SQL"}
                            </MenuItem>
                            <MenuItem key={"mysql"} value={"mysql"}>
                                {"MySQL"}
                            </MenuItem>
                            <MenuItem key={"postres"} value={"pgsql"}>
                                {"PostgreSQL"}
                            </MenuItem>


                        </TextField>
                        <TextField
                            id="dbName"
                            label="Имя БД"
                            variant="filled"
                            required
                            helperText={"Название базы данных"}
                            size={"small"}
                            fullWidth
                            defaultValue={editRow.dbName ? editRow.dbName : ""}
                        // value={authUrl}
                        // onChange={handleAuthUrl}
                        />
                        <TextField
                            id="login"
                            label="Логин БД"
                            variant="filled"
                            required
                            helperText={"Логин базы данных"}
                            size={"small"}
                            fullWidth
                            defaultValue={editRow.login ? editRow.login : ""}
                        // value={authUrl}
                        // onChange={handleAuthUrl}
                        />
                        <TextField
                            id="password"
                            label="Пароль БД"
                            variant="filled"
                            required
                            helperText={"Пароль базы данных"}
                            size={"small"}
                            fullWidth
                            defaultValue={editRow.password ? editRow.password : ""}
                        // value={authUrl}
                        // onChange={handleAuthUrl}
                        />

                        {/* <p>{"Опции подключения"}</p>
                    <div style={{ border: "1px solid" }}>
                        <AceEditor
                            mode="javascript"
                            theme="github"
                            onChange={handleOptions}
                            name="authData"
                            editorProps={{ $blockScrolling: false }}
                            
                            setOptions={{

                            }}
                            value={options}
                            height={"300px"}
                            width={"100%"}


                        />
                    </div> */}

                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCheck} color="primary">
                        Проверить соединение
                        </Button>
                    <Button autoFocus onClick={handleSave} color="primary">
                        Сохранить
                        </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                        Закрыть
                    </Button>
                </DialogActions>
            </Dialog>
            <Paper className={classes.paper}>
                <EnhancedTableToolbar numSelected={selected.length} edit={handleOpenDialog} create={handleCreateDialog} delete={handleDelete} />

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
                                                                    ? <CheckBoxIcon color="inherit" />
                                                                    : <CheckBoxOutlineBlankIcon color="inherit" />



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
        </div >
    );
}
