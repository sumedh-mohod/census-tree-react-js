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
  Pagination,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import TreeDensityDialog from '../../components/DialogBox/TreeDensityDialog'
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import { DeleteDistricts, GetAllDistricts, SearchDistricts} from '../../actions/MasterActions';
import { MasterBreadCrumChip } from '../../sections/@dashboard/master/MasterBreadCrumChip';
import StatusButton from '../../components/statusbutton/StatusButton'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'locationType', label: 'Location Type', alignRight: false },
  { id: 'width', label: 'Width', alignRight: false },
  { id: 'interval', label: 'Interval', alignRight: false },
  { id: 'minimumNumOfTree', label: 'Minimum Number Of Tree', alignRight: false },
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

export default function TreeDensity() {

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
   const [close, setClose] = useState();
   const [dialogData,setDialogData] = useState(null);
   const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [dropPage, setDropPage] = useState("");
  const handleDropChange = (event) => {
    setDropPage(event.target.value);
   };

   const {
    districts,
    addDistrictsLog,
    editDistrictsLog,
    deleteDistrictsLog,
    pageInfo
  } = useSelector((state) => ({
    districts:state.master.districts,
    addDistrictsLog:state.master.addDistrictsLog,
    editDistrictsLog:state.master.editDistrictsLog,
    deleteDistrictsLog:state.master.deleteDistrictsLog,
    pageInfo : state.master.pageInfo
  }));

  // console.log("DISTRICTS",districts)

  useEffect(()=>{
    dispatch(GetAllDistricts(page,rowsPerPage));
  },[addDistrictsLog,editDistrictsLog,deleteDistrictsLog])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchDistricts(newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetAllDistricts(newPage,rowsPerPage));
    }
    
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchDistricts(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetAllDistricts(1,parseInt(event.target.value, 10)));
    }
    
  };

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteDistricts(data.id,data.status?0:1));
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchDistricts(1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetAllDistricts(1,rowsPerPage));
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }
  function handleClick(event) {
    event.preventDefault();
    // console.info('You clicked a breadcrumb.');
  }

  return (
    <Page title="User">
      <Container>
        {open?
        <TreeDensityDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data = {dialogData}
        />:null
        }
        
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={10} mt={5}>
        <div role="presentation" onClick={handleClick} >
        <MasterBreadCrumChip
          dropDownPage={dropPage}
          handleDropChange={handleDropChange}
          />

    </div>
          <Button onClick={handleNewUserClick}  variant="contained" component={RouterLink} to="#" >
          Add Tree Density

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search districts..."} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table size="small" aria-label="a dense table">
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { districts?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left"><b>{((page-1)*(rowsPerPage))+(index+1)}</b></TableCell>
                            <TableCell align="left">
                              {option.name}
                            </TableCell>
                        <TableCell align="left">{option.state?.name}</TableCell>
                        <TableCell align="left">{option.state?.name}</TableCell>
                        <TableCell align="left">
                          <StatusButton status={option.status} />
                        </TableCell>
                        <TableCell align="right">
                          <UserMoreMenu status={option.status} handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)} />
                        </TableCell>
                        </TableRow>
                        )
                  })
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {districts?(
          <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
