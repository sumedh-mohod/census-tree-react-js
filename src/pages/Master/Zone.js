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
import { useDispatch, useSelector } from 'react-redux';
import { DeleteZones, GetZones } from '../../actions/ZonesAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import ZoneDialog from "../../components/DialogBox/ZoneDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignCenter: false },
  { id: 'Zone', label: 'Zone', alignRight: false },
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

export default function Zone() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);

  const {
    zones,
    addZonesLog,
    editZonesLog,
    deleteZonesLog,
    pageInfo
  } = useSelector((state) => ({
    zones:state.zones.zones,
    addZonesLog:state.zones.addZonesLog,
    editZonesLog:state.zones.editZonesLog,
    deleteZonesLog:state.zones.deleteZonesLog,
    pageInfo : state.zones.pageInfo
  }));

  useEffect(()=>{
    dispatch(GetZones(page+1,rowsPerPage));
  },[addZonesLog,editZonesLog,deleteZonesLog])

  console.log("ZONES",zones);

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open);
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(GetZones(newPage+1,rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(GetZones(1,parseInt(event.target.value, 10)));
  };

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteZones(data.id,data.status?0:1));
  };

  return (
    <Page title="User">
      <Container>
        <ZoneDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data = {dialogData}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Zones
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add Zone

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search zone..."}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { zones?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>
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
