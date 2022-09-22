import { filter } from 'lodash';
import {  useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useLocation, useParams } from 'react-router-dom';
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
  Link,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
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
import AssignedUserMenu from '../../sections/@dashboard/user/AssignedUserMenu';
import WarningMessageDialog from '../../components/DialogBox/WarningMessageDialog';

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
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
  const [searchValue,setSearchValue] = useState("");
  const [showList,setShowList] = useState(false);
  const [topModalOpen, setTopModalOpen] = useState(false);
  const [reqObj, setReqObj] = useState(null);
  const message = "Unassigning the user will expired the current session of the user and might lose the offline data. Please synch all the Offline data before proceeding."
  
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

  // console.log("USER of team",userOfTeam)
  const { teamId, teamName } = useParams();
  const {state} = useLocation();
  
  useEffect(()=>{
    dispatch(GetUserByTeam(teamId,page,rowsPerPage));
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
    handleTopModalClose();
    setReqObj(data);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchUserByTeam(teamId,newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetUserByTeam(teamId,newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(1);
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
          setPage(1)
          setSearchValue(value);

        }
        else{
          setShowList(false);
          dispatch(GetUserByTeam(teamId,1,rowsPerPage));
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

  // console.log("USERS OF TEAM",userOfTeam);


  const handleTopModalClose = () => {
    setTopModalOpen(!topModalOpen)
  }

  const handleTopModalAnswer = (answer) => {
    if(answer){
      dispatch(DeleteUserFromTeam(reqObj.id,reqObj.status?0:1));
    }
    setTopModalOpen(!topModalOpen)
  }

  return (
    <Page title="User">
    <Container>
    <WarningMessageDialog 
        isOpenConfirm={topModalOpen}
        message={message}
        handleClose = {(answer)=>handleTopModalAnswer(answer)}
        />
      {open?
        <AssignUserDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data= {dialogData}
        teamId={teamId}
        />
        :null}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" style={{color: "#000000", fontWeight: 700, fontSize: '25px'}} separator=':'>
      <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
      Teams
          </Typography>
      <Typography variant="h4" gutterBottom style={{color: "#000000",fontWeight: 400}}>
        <Link 
        component={RouterLink}
        to={`/dashboard/teams`}
        state={state}
          underline="hover"
          // sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          // href="#"
        >
          {teamName}
              
        </Link>
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#000000", fontWeight: 400}}>
        Assigned Users
        </Typography>
        {/* <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 24, fontSize: 25, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
           Assigned Users
              
        </Link> */}
        
      </Breadcrumbs>
      <Typography variant="h6" style={{ fontWeight: 400,marginTop: '-8px' }}>
              It is showing list of assigned users with its details
            </Typography>
    </div>
          <Button onClick={handleNewUserClick} variant="contained" >
          Add assign User

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
                          <TableRow hover>
                            <TableCell align="left">
                              <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                            </TableCell>
                            <TableCell align="left">{option.name}</TableCell>
                            <TableCell align="left">{option.roles}</TableCell>
                            <TableCell align="left">{option.from_date}</TableCell>
                            <TableCell align="left">{option.to_date}</TableCell>
                            <TableCell align="left">
                              {option.status?
                              <button
                                style={{
                                  backgroundColor: '#3b8038',
                                  border: 'none',
                                  borderRadius: '5px',
                                  padding: '5px 10px',
                                  color: '#fff',
                                  fontFamily: 'Poppins',
                                  fontWeight: 700,
                               
                                }}
                              >
                               Assigned
                              </button>:<button
                                style={{
                                  backgroundColor: '#737373',
                                  border: 'none',
                                  borderRadius: '5px',
                                  padding: '5px 10px',
                                  color: '#fff',
                                  fontFamily: 'Poppins',
                                  fontWeight: 700,
                                
                                }}
                              >
                                Unassign
                              </button>}
                            </TableCell>
                            <TableCell align="right">
                              <AssignedUserMenu
                                status={option.status}
                                disable={!option.status}
                                handleEdit={() => handleEdit(option)}
                                handleDelete={() => handleDelete(option)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {userOfTeam?(
          <Pagination count={showList ? pageInfo.last_page : 0} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
