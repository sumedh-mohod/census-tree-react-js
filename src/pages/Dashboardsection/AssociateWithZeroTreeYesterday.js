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

import { useDispatch, useSelector } from 'react-redux';

import { DeleteTeam, GetTeam, SearchTeam, GetTeamByFilter } from '../../actions/TeamsAction';

import { GetActiveCouncil } from '../../actions/CouncilAction';

import { GetActiveZones, GetActiveZonesByCouncilId } from '../../actions/ZonesAction';

import { GetActiveWards, GetActiveWardsByCouncilId } from '../../actions/WardsActions';

import { GetUnsynchedUser } from '../../actions/UnsynchedAction';

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

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },

  { id: 'name', label: 'Name', alignRight: false },

  { id: 'roll', label: 'Role', alignRight: false },

  { id: 'TeamCode', label: 'Team Code', alignRight: false },

  { id: 'MobileNumber', label: 'MobileNumber', alignRight: false },

  { id: 'zone', label: 'Zone', alignRight: false },

  { id: 'ward', label: 'Ward', alignRight: false },

  { id: 'lastTreeSyncOn', label: 'Last Tree Sync On', alignRight: false },
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

export default function AssociateWithZeroTreeYesterday() {
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

  const { council, unsynchedUser, pageInfo } = useSelector((state) => ({
    council: state.council.activeCouncil,

    unsynchedUser: state.unsynchedUser.unsynchedUser,

    pageInfo: state.unsynchedUser.pageInfo,
  }));

 
 
const { Id } = useParams();
// console.log("idcall", Id);
const filterCouncil = council.filter((val)=>val.id === +Id);
const coun = filterCouncil[0]?.name;
// console.log("filterCouncil", filterCouncil);
  const secondRun = useRef(true);

  useEffect(() => {
    if (secondRun.current) {
      secondRun.current = false;

      return;
    }

    setShowList(true);
  }, [unsynchedUser]);

  useEffect(() => {
    dispatch(GetActiveCouncil(1));
    dispatch(GetUnsynchedUser(Id, 1, rowsPerPage));
    // dispatch(GetBaseColorTreeById(1));
  }, []);

  useEffect(() => {
    if (pageInfo) {
      setCount(pageInfo?.total);
    }
  }, [pageInfo]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    setShowList(true);

    dispatch(GetUnsynchedUser(coucilId, newPage, rowsPerPage));
  };

  const handleCoucilChange = (e) => {
    setCouncilId(e.target.value);

    setPage(1);
    // setShowList(true);

    // setShowList(false);

    dispatch(GetUnsynchedUser( e.target.value,1, rowsPerPage));
  };

  const useStyles = makeStyles({
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
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
            Associates with 0 (Zero) Trees sync yesterday
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              It is showing last top 10 logged associates
            </Typography>
          </Typography>

          <Typography variant="h6" style={{ fontWeight: 400 }}>
            <Select
              id="state"
              displayEmpty
              // name="gender"
              value={coucilId}
              style={{ width: '95%', height: 45 }}
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
        </Stack>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />

                <TableBody>
                  {showList
                    ? unsynchedUser?.map((option, index) => (
                        <TableRow hover>
                          <TableCell align="left">
                            <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                          </TableCell>

                          <TableCell align="left">{option.name}</TableCell>

                          <TableCell align="left">{option.current_role}</TableCell>

                          {/* <TableCell align="left">{option.team}</TableCell> */}

                          <TableCell align="left">
                            {option.team_code !== '' ? (
                              <button className={classes.button}>
                                <b>{option.team}</b>
                              </button>
                            ) : (
                              ''
                            )}
                          </TableCell>

                          <TableCell align="left">{option?.mobile}</TableCell>

                          <TableCell>{option?.zone}</TableCell>

                          <TableCell align="left">{option?.ward}</TableCell>

                          <TableCell align="left">{option?.last_tree_synced_on}</TableCell>
                        </TableRow>
                      ))
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>

          {unsynchedUser ? (
            <Pagination
              count={showList ? pageInfo.last_page : 0}
              page={page}
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
