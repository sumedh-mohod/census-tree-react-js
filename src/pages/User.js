import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
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
import UserTableData from  '../components/JsonFiles/UserTableData.json';
import { DeleteUsers, GetUsers, SearchUsers, UnlinkDevice } from '../actions/UserAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'Email', alignRight: false },
  { id: 'mobile', label: 'Mobile', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'username', label: 'Username', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action',  label: 'Action', alignRight: true},
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

  const [page, setPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('Name');
  const [filterName, setFilterName] = useState('');
  const [open, setOpen ] = useState(false);
  const [close, setClose] = useState();
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [pageCountError, setPageCountError]= useState(false);

  
  
  

   const {
    users,
    pageInfo,
    deleteUsersLog
  } = useSelector((state) => ({
    users:state.users.users,
    pageInfo : state.users.pageInfo,
    deleteUsersLog:state.users.deleteUsersLog
  }));


  
  useEffect(()=>{
    dispatch(GetUsers(page+1,rowsPerPage));
  },[deleteUsersLog])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])


  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };
  

  const handleChangePage = (event, newPage) => {
    console.log(newPage);
    setPage(newPage);
    if(search){
      dispatch(SearchUsers(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetUsers(newPage,rowsPerPage));
    }
  };

  const handleDelete = (data) => {
    dispatch(DeleteUsers(data.id,data.status?0:1));
  };



  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchUsers(1,rowsPerPage,value))
          setSearch(true)
          setPage(0)
          setSearchValue(value);

        }
        else{
          dispatch(GetUsers(1,rowsPerPage));
          setSearch(false);
          setPage(0);
          setSearchValue("")
        }
    }, 1000);

  }

  const handleUnlink = (userId) => {
    const obj = {
      user_id: userId
    }
    dispatch(UnlinkDevice(obj))
  }

  return (
    <Page title="User">
      <Container>
        {/* <NewUserDialog
        isOpen={open}
        data={dialogData}
        // isClose={}
        /> */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Button variant="contained" component={RouterLink} to="/dashboard/new-user-Form" startIcon={<Iconify icon="eva:plus-fill"  />}>
            New User

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search users..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                  data = {dialogData}
                  // handleClose = {handleNewUserClick}
                />
                <TableBody>
                     { users?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                            <TableCell align="left">
                              {option.first_name}  {option.last_name}
                            </TableCell>
                        <TableCell align="left">{option.email}</TableCell>
                        <TableCell align="left">{option.mobile}</TableCell>
                        <TableCell align="left">{option.assigned_roles}</TableCell>
                        <TableCell align="left">{option.username}</TableCell>
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>

                        <TableCell align="right">
                          <UserFormListMenu status={option.status} userId={option.id} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)} handleUnlink={()=>handleUnlink(option.id)}/>
                        </TableCell>
                        </TableRow>
                        )
                  })
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          <Box>
 { users?(
  <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />):null
 }
          </Box>
        </Card>
      </Container>
    </Page>
  );
}
