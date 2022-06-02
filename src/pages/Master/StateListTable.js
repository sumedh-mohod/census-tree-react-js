import { filter } from 'lodash';
import { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
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
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteState, GetAllState } from '../../actions/MasterActions';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import UserTableData from  '../../components/JsonFiles/UserTableData.json';
import StateDialog from "../../components/DialogBox/StateDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'state', label: 'State', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'action', label: 'Action', alignRight: true },
];

export default function StateListTable() {

  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);

  const {
    states,
    addStateLog,
    editStateLog,
    deleteStateLog,
    pageInfo
  } = useSelector((state) => ({
    states:state.master.states,
    addStateLog:state.master.addStateLog,
    editStateLog:state.master.editStateLog,
    deleteStateLog:state.master.deleteStateLog,
    pageInfo : state.master.pageInfo
  }));

  console.log("STATES",states)

  useEffect(()=>{
    dispatch(GetAllState(page+1,rowsPerPage));
  },[addStateLog,editStateLog,deleteStateLog])

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
    dispatch(DeleteState(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    dispatch(GetAllState(newPage+1,rowsPerPage));
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    dispatch(GetAllState(1,parseInt(event.target.value, 10)));
  };

  return (
    <Page title="User">
      <Container>
        <StateDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data= {dialogData}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
           State
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
            Add State

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search states..."}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { states?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>
                        <TableCell align="right">
                          <UserMoreMenu status={option.status}  handleEdit={()=>handleEdit(option)} handleDelete={()=>handleDelete(option)}/>
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
