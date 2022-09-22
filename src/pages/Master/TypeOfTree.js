import { filter } from 'lodash';
import { useState,useEffect } from 'react';
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
  Pagination,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTreeType, GetTreeType, SearchTreeType } from '../../actions/TreeTypeActions';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import TypeOfTreeDialog from "../../components/DialogBox/TypeOfTreeDialog";
import { MasterBreadCrumChip } from '../../sections/@dashboard/master/MasterBreadCrumChip';
import StatusButton from '../../components/statusbutton/StatusButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'TypeofTree', label: 'Type Of Tree', alignRight: false },
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

export default function TypeOfTree() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [dropPage, setDropPage] = useState(9);
   const userPermissions = [];

  const {
    treeType,
    addTreeTypeLog,
    editTreeTypeLog,
    deleteTreeTypeLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    treeType:state.treeType.treeType,
    addTreeTypeLog:state.treeType.addTreeTypeLog,
    editTreeTypeLog:state.treeType.editTreeTypeLog,
    deleteTreeTypeLog:state.treeType.deleteTreeTypeLog,
    pageInfo : state.treeType.pageInfo,
    loggedUser:state.auth.loggedUser,

  }));

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))
  

  // console.log("TREE TYPE",treeType)

  useEffect(()=>{
    dispatch(GetTreeType(page,rowsPerPage));
  },[addTreeTypeLog,editTreeTypeLog,deleteTreeTypeLog])

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
    dispatch(DeleteTreeType(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchTreeType(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetTreeType(newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchTreeType(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetTreeType(1,parseInt(event.target.value, 10)));
    }
  };


  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchTreeType(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetTreeType(1,rowsPerPage));
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }
  const handleDropChange = (event) => {
    setDropPage(event.target.value);
   };


  return (
    <Page title="User">
      <Container>
        {open ? <TypeOfTreeDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}
        {userPermissions.includes('create-tree-type') ? (
            <Button
              onClick={handleNewUserClick}
              variant="contained"
              component={RouterLink}
              to="#"
              // startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{float: 'right', mt: -4}}
            >
              Add Tree Type
            </Button>
          ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} mt={5}>
          <div role="presentation" onClick={handleClick}>
            <MasterBreadCrumChip dropDownPage={dropPage} handleDropChange={handleDropChange} slug={'tree types'} />
          </div>

          
        </Stack>

        <Card>
          <UserListToolbar numSelected={0} placeHolder={'Search type of tree...'} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {treeType?.map((option, index) => {
                    return (
                      <TableRow hover>
                        <TableCell align="left">
                          <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                        </TableCell>
                        <TableCell align="left">{option.tree_type}</TableCell>
                        <TableCell align="left">
                          <StatusButton status={option.status} />
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu
                            status={option.status}
                            permissions={userPermissions}
                            handleEdit={() => handleEdit(option)}
                            handleDelete={() => handleDelete(option)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {treeType ? (
            <Pagination
              count={pageInfo.last_page}
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
