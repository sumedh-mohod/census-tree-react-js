import { filter } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Grid,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Pagination,
} from '@mui/material';

import { makeStyles } from '@material-ui/core/styles';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import moment from 'moment';
import TextField from '@mui/material/TextField';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTeam, GetTeam, SearchTeam, GetTeamByFilter } from '../../actions/TeamsAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZones, GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWards, GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar, TeamsMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import TeamsData from '../../components/JsonFiles/TeamsData.json';
import TeamsTableDialog from '../../components/DialogBox/TeamsDialog/TeamsTableDialog';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import StatusButton from '../../components/statusbutton/StatusButton';
import { GetWorkLogged } from "../../actions/WorkLoggedAction";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'teamCode', label: 'team', alignRight: false },
  { id: '1stTreeAdded', label: '1st Tree Added', alignRight: false },
  { id: 'lastTreeAdded', label: 'Last Tree Added', alignRight: false },
  { id: 'maxInterval', label: 'Max Interval bt 2 trees', alignRight: false },
];

// ----------------------------------------------------------------------

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

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function YesterdayLoggedInAssociates() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [stateName, setStateName] = useState('');
  const [zoneId, setZoneId] = useState('');
  const [wardId, setWardId] = useState('');
  const [coucilId, setCouncilId] = useState('');
  const [showList, setShowList] = useState(false);
  const [dateFrom, setDateFrom] = useState(false);

  const {
    pageInfo,
    council,
    workLogged
  } = useSelector((state) => ({
    pageInfo: state.teams.pageInfo,
    council: state.council.activeCouncil,
    workLogged: state.workLogged.workLogged
  }));

  // console.log("workLogged____", workLogged)




const today = new Date();
const yesterday = today.setDate(today.getDate() - 1);
const  yesterdayNew = moment(yesterday).format('YYYY-MM-DD')
console.log("yesterdayNew", yesterdayNew);

  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  const { state} = useLocation(); 
const { Id } = useParams();
console.log("idcall", Id);
const filterCouncil = council.filter((val)=>val.id === +Id);
const coun = filterCouncil[0]?.name;
// console.log("filterCouncil", filterCouncil);
const secondRun = useRef(true);
useEffect(() => {
  if (secondRun.current) {
    secondRun.current = false;

    return;
  }

  setShowList(true)
}, [workLogged]);
console.log("workLogged1", workLogged )

useEffect(() => {
  dispatch(GetActiveCouncil(1));
  dispatch(GetWorkLogged(Id, yesterdayNew|| dateFrom, 1, rowsPerPage));
  // dispatch(GetBaseColorTreeById(1));
}, []);

  useEffect(() => {
    if (pageInfo) {
      setCount(pageInfo?.total);
    }
  }, [pageInfo]);

  const StateValue = [
    {
      id: 'Maharastra',
      name: 'Maharastra',
    },
    {
      id: 'Patana',
      name: 'Patana',
    },
  ];

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
      dispatch(GetWorkLogged( Id,yesterdayNew, newPage, rowsPerPage));
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    setShowList(false);
    if (search) {
      dispatch(SearchTeam(1, parseInt(event.target.value, 10), searchValue));
    } else {
      dispatch(GetTeam(1, parseInt(event.target.value, 10)));
    }
  };


  const handleFromDate =(e) => {
    setPage(1);
    setShowList(false);
    setDateFrom(e.target.value)
    dispatch(GetWorkLogged(coucilId, e.target.value, 1, rowsPerPage));
  }

  let timer = null;
  const filterByName = (event) => {
    const { value } = event.currentTarget;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if (value) {
        setShowList(false);
        dispatch(SearchTeam(1, rowsPerPage, value));
        setSearch(true);
        setPage(1);
        setSearchValue(value);
      } else {
        setShowList(false);
        dispatch(GetTeam(1, rowsPerPage));
        setSearch(false);
        setPage(1);
        setSearchValue('');
      }
    }, 1000);
  };

  const handleCoucilChange = (e) => {
    setCouncilId(e.target.value);

    setPage(1);

    // setShowList(false);

    dispatch(GetWorkLogged(coucilId,yesterdayNew, page, rowsPerPage));
  };

  const useStyles = makeStyles({
    success: {
      backgroundColor: '#d0fae2',
      borderRadius: '5px',
      padding: '2px 8px',
      color: '#3B8038',
      border: '1.5px solid #3B8038',
      fontFamily: 'Poppins',
    },

    warning: {
      backgroundColor: '#F8EED4',
      borderRadius: '5px',
      padding: '3px 0px',
      color: '#E46727',
      border: '1.5px solid #E46727',
      fontFamily: 'Poppins',
      width: '150px',
      fontSize: '12px',
    },
    successDark: {
      backgroundColor: '#DDFAD1',
      borderRadius: '5px',
      padding: '3px',
      color: '#507C59',
      border: '1.5px solid #507C59',
      fontFamily: 'Poppins',
      width: '150px',
      fontSize: '12px',
    },
    danger: {
      backgroundColor: '#F6DDDD',
      borderRadius: '5px',
      padding: '3px',
      color: '#C0374E',
      border: '1.5px solid #C0374E',
      fontFamily: 'Poppins',
      width: '150px',
      fontSize: '12px',
    },
    darkSection: {
      backgroundColor: '#214C50',
      color: '#fff',
      borderRadius: '12px',
      fontWeight: 400,
      // pointerEvents: 'none',
      fontSize: '15px',
      padding: '10px 15px',
    },
    button: {
      backgroundColor: '#d0fae2',

      borderRadius: '5px',

      padding: '2px 10px',

      color: '#18a553',

      border: '1.5px solid #18a553',

      fontFamily: 'Poppins',
    },
    icon: {
      fill: "#214C50"
    }
  });

  const classes = useStyles();

  return (
    <Page title="TeamList">
      <Container>
        {open ? <TeamsTableDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
          Works Logs of Associates
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            It's showing the work logs of Associates for 
            selected council and date
            </Typography>
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 400, marginLeft: 20 ,}}>
          <Select
              id="state"
              displayEmpty
              // name="gender"
              value={coucilId}
              style={{ width: '95%', height: 45, marginRight: 40}}
              onChange={handleCoucilChange}
              // error={Boolean(touched.state && errors.state)}

              // helperText={touched.state && errors.state}

              // {...getFieldProps("state")}

              inputProps={{
                classes: {
                  icon: classes.icon,
                },
              }}
            >
              <MenuItem disabled value="">
                <em>{filterCouncil[0]?.name}</em>
              </MenuItem>

              {council?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
          </Typography>
          <Typography variant="h6" style={{ fontWeight: 400 }} >
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                // value={dateFrom }
                label="Date"
                placeholder="Date"
                defaultValue={ yesterdayNew}
                style={{ width: '100%'}}
                onChange={handleFromDate}
                // className={classes.textField}
                // error={Boolean(touched.fromDate && errors.fromDate)}
                // helperText={touched.fromDate && errors.fromDate}
                // {...getFieldProps('fromDate')}
                // InputLabelProps={{
                //   shrink: true,
                // }}
                // inputProps={{ max: todayDate }}
              />
            </Typography>
        </Stack>

        <Card>
        <TableContainer sx={{ minWidth: 800 }} style={{ padding: '10px 5px' }}>
                    <Table size="small" aria-label="a dense table">
                 
                      <><UserListHead headLabel={TABLE_HEAD} />
                      {workLogged?.map((val,index) =>(
                      <TableBody>
                        <TableCell align="left">
                          <b>{index + 1}</b>
                        </TableCell>
                        <TableCell align="left">
                          {val?.name}
                          <br />
                          <b>{val?.current_role}</b>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.success}>
                            <b>{val?.team}</b>
                          </button>
                        </TableCell>
                        {/* <TableCell align="left" style={{ width: '150px' }}>
                          <PhoneInTalkIcon
                            style={{
                              color: '#fff',
                              background: '#CE5623',
                              borderRadius: '15px',
                              padding: '3px',
                              marginBottom: '-5px',
                            }} />
                          <span style={{ marginLeft: '5px' }}>{val?.mobile}</span>
                        </TableCell> */}
                        <TableCell align="left">
                          <button className={classes.warning}>
                            <b>{val?.first_tree_added}</b>
                          </button>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.successDark}>
                            <b>{val?.last_tree_added}</b>
                          </button>
                        </TableCell>
                        <TableCell align="left">
                          <button className={classes.danger}>
                            <b>{val?.max_interval}</b>
                          </button>
                        </TableCell>
                       
                      </TableBody>
                       ))}
                      </>
                       
                    </Table>
                  </TableContainer>
                  {workLogged ? (
            <Pagination
              count={workLogged ? pageInfo.last_page : 0}
              // page={page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
              sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
            />
          ) : null}

        </Card>
      </Container>
    </Page>
  );
}
