import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  Pagination
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteDesignations, GetDesignations, SearchDesignations } from '../../actions/DesignationAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import CreateDesignationDialog from "../../components/DialogBox/CreateDesignationDialog";
import MasterBreadCrum from '../../sections/@dashboard/master/MasterBreadCrum';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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

export default function CreateDestination() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [dropPage,setDropPage] = useState(2);
  const userPermissions = [];

  const handleDropChange = (e) => {
    setDropPage(e.target.value)
  }
  
  const {
    designations,
    addDesignationsLog,
    editDesignationsLog,
    deleteDesignationsLog,
    pageInfo,
    loggedUser,
  } = useSelector((state) => ({
    designations:state.designations.designations,
    addDesignationsLog:state.designations.addDesignationsLog,
    editDesignationsLog:state.designations.editDesignationsLog,
    deleteDesignationsLog:state.designations.deleteDesignationsLog,
    pageInfo : state.designations.pageInfo,
    loggedUser:state.auth.loggedUser,
  }));

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))
  
  console.log("DISTRICTS",designations)

  useEffect(()=>{
    dispatch(GetDesignations(page,rowsPerPage));
  },[addDesignationsLog,editDesignationsLog,deleteDesignationsLog])


  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }
 

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteDesignations(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchDesignations(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetDesignations(newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchDesignations(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetDesignations(1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchDesignations(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetDesignations(1,rowsPerPage));
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }
  function handleClick(event) {
    event.preventDefault();
  }


  return (
    <Page title="User">
      <Container>
      {open?
        <CreateDesignationDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data= {dialogData}
        />:null
      } 
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
         <MasterBreadCrum
          dropDownPage={dropPage}
          handleDropChange={handleDropChange}
          />
    </div>
    {userPermissions.includes("create-designation")? 
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add Designation

          </Button>:null}
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search designations..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     {designations?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu status={option.status} permissions={userPermissions} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)} />
                        </TableCell>
                        </TableRow>
                        )
                  })
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {designations?(
          <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
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
