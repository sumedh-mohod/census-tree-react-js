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
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from 'react-redux';
import QcRemarksDialog from '../../components/DialogBox/QcRemarksDialog'
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import { DeleteQcRemarks, GetQcRemarks, SearchQcRemarks} from '../../actions/QcRemarksAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'remark', label: 'Remark', alignRight: false },
  { id: 'remarkFor', label: 'Remark For', alignRight: false },
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

export default function District() {

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
   const [close, setClose] = useState();
   const [dialogData,setDialogData] = useState(null);
   const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");

   const {
  qcremarks,
    addQcRemarksLog,
    editQcRemarksLog,
    deleteQcRemarksLog,
    pageInfo
  } = useSelector((qcremark) => ({
    qcremarks:qcremark.qcRemarksTypes.qcremarks,
    addQcRemarksLog:qcremark.qcRemarksTypes.addQcRemarksLog,
    editQcRemarksLog:qcremark.qcRemarksTypes.editQcRemarksLog,
    deleteQcRemarksLog:qcremark.qcRemarksTypes.deleteQcRemarksLog,
    pageInfo : qcremark.qcRemarksTypes.pageInfo
  }));

  // qcremarks:remark.qcRemarksTypes.qcremarks,
  useEffect(()=>{
    dispatch(GetQcRemarks(page+1,rowsPerPage));
  },[addQcRemarksLog,editQcRemarksLog,deleteQcRemarksLog])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])
  
  console.log("qcremarks---",qcremarks)
  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    if(search){
      dispatch(SearchQcRemarks(newPage+1,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetQcRemarks(newPage+1,rowsPerPage));
    }
    
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    if(search){
      dispatch(SearchQcRemarks(1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetQcRemarks(1,parseInt(event.target.value, 10)));
    }
    
  };

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteQcRemarks(data.id,data.status?0:1));
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchQcRemarks(1,rowsPerPage,value))
          setSearch(true)
          setPage(0)
          setSearchValue(value);

        }
        else{
          dispatch(GetQcRemarks(1,rowsPerPage));
          setSearch(false);
          setPage(0);
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

        {open?
         <QcRemarksDialog
         isOpen={open}
         handleClose = {handleNewUserClick}
         data = {dialogData}
         />:null
        }
       
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" separator='>'>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
        >
          Master
        </Link>
        <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
        >
          QC Remarks
        </Link>
      </Breadcrumbs>
    </div>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add New

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search QcRemarks..."} onFilterName={filterByName} />
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { qcremarks?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                            <TableCell align="left">
                              {option.remark}
                            </TableCell>
                        <TableCell align="left">{option.remark_for}</TableCell>
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

          <TablePagination
            rowsPerPageOptions={[10, 20, 30]}
            component="div"
            count={count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
