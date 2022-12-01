import { filter, includes } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TextField,
  Grid,
  Box,
  Pagination,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
// eslint-disable-next-line import/named
import { UserListHead, UserListToolbar, UserFormListMenu } from '../sections/@dashboard/user';
import USERLIST from '../_mock/user';
import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from '../components/JsonFiles/UserTableData.json';
import { DeleteUsers, GetUsers, SearchUsers, UnlinkDevice } from '../actions/UserAction';
import WarningMessageDialog from '../components/DialogBox/WarningMessageDialog';
import UserActivateConfirmationDialog from '../components/DialogBox/UserActivateConfirmationDialog';
import StatusButton from '../components/statusbutton/StatusButton';
import warningSound from '../Assets/warning_sound.mp3';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'activeTeam', label: 'Active Team', alignRight: false },
  { id: 'activeCouncil', label: 'Active Council', alignRight: false },
  { id: 'activeZone', label: 'Active Zone', alignRight: false },
  { id: 'activeWard', label: 'Active Ward', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
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

export default function User() {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('Name');
  const [filterName, setFilterName] = useState('');
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState();
  const [dialogData, setDialogData] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [pageCountError, setPageCountError] = useState(false);
  const [topModalOpen, setTopModalOpen] = useState(false);
  const [activateModalOpen, setActivateModalOpen] = useState(false);
  const [reqObj, setReqObj] = useState(null);
  const [requireActiveObj, setReqActiveObj] = useState(null);
  const userPermissions = [];
  const message =
    'Unlinking device will expired the current session of the user and might lose the offline data. Please synch all the Offline data before proceeding.';

  const { state } = useLocation();
  // console.log("topModalOpen", topModalOpen);
  // console.log("STATE PAGE ",state);
  // console.log("Current Page", page)

  const { users, pageInfo, deleteUsersLog, loggedUser } = useSelector((state) => ({
    users: state.users.users,
    pageInfo: state.users.pageInfo,
    deleteUsersLog: state.users.deleteUsersLog,
    loggedUser: state.auth.loggedUser,
  }));

  loggedUser.roles[0].permissions.map((item, index) => userPermissions.push(item.name));

  useEffect(() => {
    if (state) {
      // console.log("INSIDE STATE");
      setPage(state.page);
    }
  }, []);

  useEffect(() => {
    if (state) {
      setPage(state.page);
      dispatch(GetUsers(state.page, rowsPerPage));
    } else {
      dispatch(GetUsers(page, rowsPerPage));
    }
  }, [deleteUsersLog]);

  useEffect(() => {
    if (pageInfo) {
      setCount(pageInfo?.total);
    }
  }, [pageInfo]);

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    // console.log('newPage', newPage);
    setPage(newPage);

    if (search) {
      dispatch(SearchUsers(newPage, rowsPerPage, searchValue));
    } else {
      dispatch(GetUsers(newPage, rowsPerPage));
    }
  };

  const handleDelete = (data) => {
    // console.log('activate_data', data);
    const activeObj = {
      data_id: data.id,
      data_status: data.status ? 0 : 1
    }
    if(!data.status){
      dispatch(DeleteUsers(activeObj));
    }else{
      handleactiveModalClose();
      setReqActiveObj(activeObj);
    }
    // dispatch(DeleteUsers(data.id, data.status ? 0 : 1));
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if (value) {
        dispatch(SearchUsers(1, rowsPerPage, value));
        setSearch(true);
        setPage(1);
        setSearchValue(value);
      } else {
        dispatch(GetUsers(1, rowsPerPage));
        setSearch(false);
        setPage(1);
        setSearchValue('');
      }
    }, 1000);
  };

  const handleUnlink = (userId) => {
    const obj = {
      user_id: userId,
    };
    handleTopModalClose();
    setReqObj(obj);
  };

  const audio = new Audio(warningSound);
  const handleTopModalClose = () => {
    setTopModalOpen(!topModalOpen);
  };

  const handleTopModalAnswer = (answer) => {
    if (answer) {
      audio.loop = false;
      dispatch(UnlinkDevice(reqObj));
    }
    audio.loop = false;
    setTopModalOpen(!topModalOpen);
  };

  const handleactiveModalClose=()=>{
    setActivateModalOpen(!activateModalOpen);
  }

  const handleActivateModalAnswer=(answer)=>{
    if(answer){
      // console.log('aciveInactive')
      dispatch(DeleteUsers(requireActiveObj));
      audio.loop = false;
    }
    audio.loop = false;
    setActivateModalOpen(!activateModalOpen)
  }
  if(topModalOpen){
    audio.loop = true;
    audio.play();
  }
  if(activateModalOpen){
    audio.loop = true;
    audio.play();
  }
  return (
    <Page title="User">
      <Container>
        {/* <NewUserDialog
        isOpen={open}
        data={dialogData}
        // isClose={}
        /> */}
        <WarningMessageDialog
          isOpenConfirm={topModalOpen}
          message={message}
          handleClose={(answer) => handleTopModalAnswer(answer)}
        />
        <UserActivateConfirmationDialog 
        isOpenConfirm={activateModalOpen}
        message={'Inactivating the user will expire their session. Please make sure they have synched all their offline data. Do you still want to Inactivate?'}
        handleClose={(answer) => handleActivateModalAnswer(answer)}
        />
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <Typography variant="h4" gutterBottom>
            Users
            
            <Typography variant="h6" style={{ fontWeight: 400 }}  >
              It is showing list of all users with its details
            </Typography>
          </Typography>

          {userPermissions.includes('create-user') ? (
            <Button
              variant="contained"
              component={RouterLink}
              to="/dashboard/new-user-Form"
              // style={{boxShadow: 'none'}}
              // startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add User
            </Button>
          ) : null}
        </Stack>

        <Card>
          <UserListToolbar numSelected={0} placeHolder={'Search users...'} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead
                  headLabel={TABLE_HEAD}
                  data={dialogData}
                  // handleClose = {handleNewUserClick}
                />
                <TableBody>
                  {users?.map((option, index) => {
                    return (
                      <TableRow hover>
                        <TableCell align="left">
                          <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                        </TableCell>
                        <TableCell align="left" style={{width: '600px'}} > 
                          {`${option.first_name} ${option.last_name}`}
                        </TableCell>
                        <TableCell align="left">{option.email}</TableCell>
                        <TableCell align="left">{option.mobile}</TableCell>
                        <TableCell align="left">{option.assigned_roles}</TableCell>
                        <TableCell align="left">{option.username}</TableCell>
                        <TableCell align="left">
                          <StatusButton status={option.status} />
                        </TableCell>
                        <TableCell align="left">
                          {option.active_team?.[0]?.name ? option.active_team?.[0]?.name : '-'}
                        </TableCell>
                        <TableCell align="left">
                          {option.active_team?.[0]?.active_council?.[0]?.name
                            ? option.active_team?.[0]?.active_council?.[0]?.name
                            : '-'}
                        </TableCell>
                        <TableCell align="left">
                          {option.active_team?.[0]?.active_zone?.[0]?.name
                            ? option.active_team?.[0]?.active_zone?.[0]?.name
                            : '-'}
                        </TableCell>
                        <TableCell align="left">
                          {option.active_team?.[0]?.active_ward?.[0]?.name
                            ? option.active_team?.[0]?.active_ward?.[0]?.name
                            : '-'}
                        </TableCell>
                        <TableCell align="right">
                          <UserFormListMenu
                            page={page}
                            status={option.status}
                            userId={option.id}
                            userPermissions={userPermissions}
                            handleEdit={() => handleEdit(option)}
                            handleDelete={() => handleDelete(option)}
                            handleUnlink={() => handleUnlink(option.id)}
                          />
                        </TableCell>
                        
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Box>
            {users ? (
              <Pagination
                count={pageInfo.last_page}
                page={page}
                variant="outlined"
                shape="rounded"
                onChange={handleChangePage}
                sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
              />
            ) : null}
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
