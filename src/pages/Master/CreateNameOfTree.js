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
  TablePagination,
  Pagination,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteTreeName, GetTreeName, SearchTreeName } from '../../actions/TreeNameAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import NameOfTreeDialog from '../../components/DialogBox/NameOfTreeDialog';
import {MasterBreadCrumChip} from '../../sections/@dashboard/master/MasterBreadCrumChip';
import StatusButton from '../../components/statusbutton/StatusButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'localName', label: 'Local Name', alignRight: false },
  { id: 'botanicalName', label: 'Botanical Name', alignRight: false },
  { id: 'typeOfTree', label: 'Type Of Tree', alignRight: false },
  { id: 'treeFamily', label: 'Tree Family', alignRight: false },
  { id: 'Uses', label: 'Uses', alignRight: false },
  { id: 'origin', label: 'Origin', alignRight: false },
  { id: 'floweringSeason', label: 'Flowering Season', alignRight: false },
  { id: 'fruitingSeason', label: 'Fruiting Season', alignRight: false },
  { id: 'growthFactor', label: 'Growth Factor', alignRight: false },
  { id: 'oxygenEmittrate', label: 'Oxygen Emittrate', alignRight: false },
  { id: 'maximumHeight', label: 'Maximum Height', alignRight: false },
  { id: 'maximunAge', label: 'Maximun Age', alignRight: false },
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

export default function CreateNameOfTree() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [dropPage, setDropPage] = useState(11);
  const userPermissions = [];

  const handleDropChange = (event) => {
    setDropPage(event.target.value);
   };

  const {
    treeName,
    addTreeNameLog,
    editTreeNameLog,
    deleteTreeNameLog,
    pageInfo, 
    loggedUser
  } = useSelector((state) => ({
    treeName:state.treeName.treeName,
    addTreeNameLog:state.treeName.addTreeNameLog,
    editTreeNameLog:state.treeName.editTreeNameLog,
    deleteTreeNameLog:state.treeName.deleteTreeNameLog,
    pageInfo : state.treeName.pageInfo,
    loggedUser:state.auth.loggedUser,
   
  }));

  // console.log("TREE NAME",treeName)

  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))
  

  useEffect(()=>{
    dispatch(GetTreeName(page,rowsPerPage));
  },[addTreeNameLog,editTreeNameLog,deleteTreeNameLog])

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
    dispatch(DeleteTreeName(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchTreeName(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetTreeName(newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchTreeName(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetTreeName(1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchTreeName(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetTreeName(1,rowsPerPage));
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

  return (
    <Page title="User">
      <Container>
        {open ? <NameOfTreeDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}
        {userPermissions.includes('create-tree-name') ? (
            <Button
              onClick={handleNewUserClick}
              variant="contained"
              component={RouterLink}
              to="#"
              // startIcon={<Iconify icon="eva:plus-fill" />}
                sx={{float: 'right', mt: -4}}
            >
              Add Tree Name
            </Button>
          ) : null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} mt={5}>
          <div role="presentation" onClick={handleClick}>
            <MasterBreadCrumChip dropDownPage={dropPage} handleDropChange={handleDropChange} slug={'tree names'} />
          </div>
         
        </Stack>

        <Card>
          <UserListToolbar numSelected={0} placeHolder={'Search tree...'} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {treeName?.map((option, index) => {
                    return (
                      <TableRow key={index} hover>
                        <TableCell align="left">
                          <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                        </TableCell>
                        <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.botanical_name}</TableCell>
                        <TableCell align="left">{option.tree_type?.tree_type}</TableCell>
                        <TableCell align="left">
                          {option.tree_family?.tree_family ? option.tree_family?.tree_family : '-'}
                        </TableCell>
                        <TableCell align="left">{option.uses ? option.uses : '-'}</TableCell>
                        <TableCell align="left">{option.origin ? option.origin : '-'}</TableCell>
                        <TableCell align="left">{option.flowering_season ? option.flowering_season : 'NA'}</TableCell>
                        <TableCell align="left">{option.fruiting_season ? option.fruiting_season : 'NA'}</TableCell>
                        <TableCell align="left">{option.growth_factor ? option.growth_factor : 'NA'}</TableCell>
                        <TableCell align="left">{option.oxygen_emit_rate ? option.oxygen_emit_rate : 'NA'}</TableCell>
                        <TableCell align="left">{option.max_height ? option.max_height : 'NA'}</TableCell>
                        <TableCell align="left">{option.max_age ? option.max_age : 'NA'}</TableCell>
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
          {treeName ? (
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
