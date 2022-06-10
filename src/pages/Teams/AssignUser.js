import { filter } from 'lodash';
import {  useEffect, useRef, useState } from 'react';
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
  TablePagination,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { DeleteUserFromTeam, GetUserByTeam, SearchUserByTeam } from '../../actions/TeamsAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar, TeamsAssignedMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import TeamsData from  '../../components/JsonFiles/TeamsData.json';
import AssignUserDialog from "../../components/DialogBox/TeamsDialog/AssignUserDialog";

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'user', label: 'User', alignRight: false },
  { id: 'role', label: 'Role', alignRight: false },
  { id: 'fromdate', label: 'From Date', alignRight: false },
  { id: 'todate', label: 'To Date', alignRight: false },
  { id: 'status', label: 'status', alignRight: false },
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

export default function AssignUser() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [showList,setShowList] = useState(false);
  
  const {
    userOfTeam,
    assignUserToTeamLog,
    deleteUserFromteamLog,
    pageInfo
  } = useSelector((state) => ({
    userOfTeam:state.teams.userOfTeam,
    assignUserToTeamLog:state.teams.assignUserToTeamLog,
    deleteUserFromteamLog:state.teams.deleteUserFromteamLog,
    pageInfo : state.teams.pageInfo
  }));

  console.log("USER of team",userOfTeam)
  const { teamId, teamName } = useParams();
  
  useEffect(()=>{
    dispatch(GetUserByTeam(teamId,page+1,rowsPerPage));
  },[assignUserToTeamLog,deleteUserFromteamLog])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const fetchRun = useRef(true);
  useEffect(()=>{
    if (fetchRun.current) {
      fetchRun.current = false;
      return;
    }
    setShowList(true);
  },[userOfTeam])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteUserFromTeam(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchUserByTeam(teamId,newPage+1,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetUserByTeam(teamId,newPage+1,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(0);
    if(search){
      dispatch(SearchUserByTeam(teamId,1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetUserByTeam(teamId,1,parseInt(event.target.value, 10)));
    }
  };

  let timer = null;
  const filterByName = (event) => {
    const value = event.currentTarget.value;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          setShowList(false);
          dispatch(SearchUserByTeam(teamId,1,rowsPerPage,value))
          setSearch(true)
          setPage(0)
          setSearchValue(value);

        }
        else{
          setShowList(false);
          dispatch(GetUserByTeam(teamId,1,rowsPerPage));
          setSearch(false);
          setPage(0);
          setSearchValue("")
        }
    }, 1000);

  }

  console.log("USERS OF TEAM",userOfTeam);

  return (
    <Page title="User">
    <Container>
        <AssignUserDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data= {dialogData}
        teamId={teamId}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Assigned User({teamName})
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
          Assigned User

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search user..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     { showList? userOfTeam?.map((option,index) => {
                        return (
                        <TableRow
                        hover
                      >
                            <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option.name}</TableCell>
                        <TableCell align="left">{option.roles}</TableCell>
                        <TableCell align="left">{option.form_date}</TableCell>
                        <TableCell align="left">{option.to_date}</TableCell>
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>
                        <TableCell align="right">
                        <TeamsAssignedMenu status={option.status}  handleDelete={()=>handleDelete(option)}/>
                        </TableCell>
                        </TableRow>
                        )
                  }):null
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
