import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink, NavLink } from 'react-router-dom';
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
  TablePagination,
  Pagination,
  Chip
} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteRole, GetRole, SearchRole } from '../../actions/RoleAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from '../../components/JsonFiles/UserTableData.json';
import CreateRoleDialog from '../../components/DialogBox/CreateRoleDialog';
import {MasterBreadCrum, breadCrumDrop} from '../../sections/@dashboard/master/MasterBreadCrum';
import {MasterBreadCrumChip} from '../../sections/@dashboard/master/MasterBreadCrumChip';
import StatusButton from '../../components/statusbutton/StatusButton';
import './style.css';
// import Menu from './Menu';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'Status', label: 'Status', alignRight: false },
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

export default function CreateRole() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen] = useState(false);
  const [close, setClose] = useState();
  const [dialogData, setDialogData] = useState(null);
  const [search, setSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [dropPage, setDropPage] = useState(1);

  const handleDropChange = (event) => {
    console.log(event);
    setDropPage(event);
  };
  const userPermissions = [];

  const { roles, addRolesLog, editRolesLog, deleteRolesLog, pageInfo, loggedUser } = useSelector((state) => ({
    roles: state.roles.roles,
    addRolesLog: state.roles.addRolesLog,
    editRolesLog: state.roles.editRolesLog,
    deleteRolesLog: state.roles.deleteRolesLog,
    pageInfo: state.roles.pageInfo,
    loggedUser: state.auth.loggedUser,
  }));

  // console.log("ROLES",roles);

  loggedUser.roles[0].permissions.map((item, index) => userPermissions.push(item.name));

  useEffect(() => {
    dispatch(GetRole(page, rowsPerPage));
  }, [addRolesLog, editRolesLog, deleteRolesLog]);

  useEffect(() => {
    if (pageInfo) {
      setCount(pageInfo?.total);
    }
  }, [pageInfo]);

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if (search) {
      dispatch(SearchRole(newPage, rowsPerPage, searchValue));
    } else {
      dispatch(GetRole(newPage, rowsPerPage));
    }
  };

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteRole(data.id, data.status ? 0 : 1));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if (search) {
      dispatch(SearchRole(1, parseInt(event.target.value, 10), searchValue));
    } else {
      dispatch(GetRole(1, parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // console.log("---",value)
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
      if (value) {
        // console.log("---...",value)
        dispatch(SearchRole(1, rowsPerPage, value));
        setSearch(true);
        setPage(1);
        setSearchValue(value);
      } else {
        dispatch(GetRole(1, rowsPerPage));
        setSearch(false);
        setPage(1);
        setSearchValue('');
      }
    }, 1000);
    // console.log("rolesss", roles)
  };
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

  return (
    <Page title="User">
      <Container >
        {open ? <CreateRoleDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}
        <Scrollbar>
        {userPermissions.includes('create-role') ? (
            <Button
              onClick={handleNewUserClick}
              variant="contained"
              component={RouterLink}
              to="#"
              // startIcon={<Iconify icon="eva:plus-fill" />}
               sx={{float: 'right',boxShadow: 'none',mt: 1}}
            >
              Add Role
            </Button>
          ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between"  mb={7} mt={5}>
          {/* <div role="presentation" onClick={handleClick}>
            <MasterBreadCrum dropDownPage={dropPage} handleDropChange={handleDropChange} />
          </div> */}
        
        <div role="presentation" className='mob-master' onClick={handleClick} >
        <MasterBreadCrumChip dropDownPage={dropPage} handleDropChange={handleDropChange} slug={'roles'} />
        </div>
         
        </Stack>
        </Scrollbar>
        <Card>
          <UserListToolbar numSelected={0} placeHolder={'Search role...'} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {roles?.map((option, index) => {
                    return (
                      <TableRow hover>
                        <TableCell align="left"><b>{(page - 1) * rowsPerPage + (index + 1)}</b></TableCell>
                        <TableCell align="left">{option.role}</TableCell>
                        <TableCell align="left">
                          <StatusButton status={option.status}/>
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu
                            status={option.status}
                            permissions={userPermissions}
                            handleEdit={() => handleEdit(option)}
                            handleDelete={() => handleDelete(option)}
                            disable={option.is_protected}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {roles ? (
            <Pagination
              count={pageInfo.last_page}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
              sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
            />
          ) : null}
          {/* <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          /> */}
        </Card>
      </Container>
    </Page>
  );
}
