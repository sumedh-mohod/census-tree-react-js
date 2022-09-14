import { filter } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import { Link as RouterLink, useParams } from 'react-router-dom';
import {
  Avatar,
  Button,
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  Pagination,
  Stack,
  Link,
} from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useDispatch, useSelector } from 'react-redux';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZones } from '../../actions/ZonesAction';
import { GetActiveWards } from '../../actions/WardsActions';
import { DeleteCZWFromTeam, GetCZWByTeam, SearchCZWByTeam } from '../../actions/TeamsAction';
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead, UserListToolbar, TeamsAssignedMenu } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
// import NewUserDialog from '../components/DialogBox/NewUserDialog';
import TeamsData from  '../../components/JsonFiles/TeamsData.json';
import AssignCouncilZoneDialog from "../../components/DialogBox/TeamsDialog/AssignCouncilZoneDialog";
import StatusButton from '../../components/statusbutton/StatusButton'

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'council', label: 'Council', alignRight: false },
  { id: 'zone', label: 'Zone', alignRight: false },
  { id: 'ward', label: 'Ward', alignRight: false },
  { id: 'fromDate', label: 'From Date', alignRight: false },
  { id: 'todate', label: 'To Date', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
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

export default function AssignNewCouncilZoneWard() {

  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [showList,setShowList] = useState(false);
  
  const {
    cwzOfTeam,
    assignCWZToTeamLog,
    deleteCWZFromteamLog,
    pageInfo
  } = useSelector((state) => ({
    cwzOfTeam:state.teams.cwzOfTeam,
    assignCWZToTeamLog:state.teams.assignCWZToTeamLog,
    deleteCWZFromteamLog:state.teams.deleteCWZFromteamLog,
    pageInfo : state.teams.pageInfo
  }));

  // console.log("CWZ of team",cwzOfTeam)
  const { teamId,teamName } = useParams();
  
  useEffect(()=>{
    dispatch(GetCZWByTeam(teamId,page,rowsPerPage));
  },[assignCWZToTeamLog,deleteCWZFromteamLog])

  const firstRun = useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setShowList(true);
  },[cwzOfTeam])


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
    dispatch(DeleteCZWFromTeam(data.id,data.status?0:1));
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchCZWByTeam(teamId,newPage,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetCZWByTeam(teamId,newPage,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setShowList(false);
    setPage(1);
    if(search){
      dispatch(SearchCZWByTeam(teamId,1,parseInt(event.target.value, 10),searchValue));
    }
    else {
      dispatch(GetCZWByTeam(teamId,1,parseInt(event.target.value, 10)));
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
          dispatch(SearchCZWByTeam(teamId,1,rowsPerPage,value))
          setSearch(true)
          setPage(1)
          setSearchValue(value);

        }
        else{
          setShowList(false);
          dispatch(GetCZWByTeam(teamId,1,rowsPerPage));
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
      <AssignCouncilZoneDialog
        isOpen={open}
        handleClose = {handleNewUserClick}
        data= {dialogData}
        teamId={teamId}
        />
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <div role="presentation" onClick={handleClick} >
      <Breadcrumbs aria-label="breadcrumb" style={{color: "#000000"}} separator='>'>
      <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
      Teams
          </Typography>
          <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
        <Link component={RouterLink}
        to ={`/dashboard/teams`}
          underline="hover"
          // sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
        {teamName}
        </Link>
        </Typography>
        <Typography variant="h4" gutterBottom style={{color: "#000000"}}>
             Assigned Councils - Zones - Wards
    </Typography>
      </Breadcrumbs>
    </div>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
          Assign C-Z-W

          </Button>
        </Stack>

        <Card>
        <UserListToolbar numSelected={0} placeHolder={"Search c-z-w..."} onFilterName={filterByName}/>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  headLabel={TABLE_HEAD}
                />
                <TableBody>
                     {showList ? cwzOfTeam?.map((option,index) => {
                        return (                                                                      
                        <TableRow
                        hover
                      >
                        <TableCell align="left"><b>{((page-1)*(rowsPerPage))+(index+1)}</b></TableCell>
                        <TableCell align="left">{option.council_name}</TableCell>
                        <TableCell align="left">{option.zone_name}</TableCell>
                        <TableCell align="left">{option.ward_name}</TableCell>
                        <TableCell align="left">{option.from_date}</TableCell>
                        <TableCell align="left">{option.to_date?option.to_date:"-"}</TableCell>
                        <TableCell align="left">
                          <StatusButton status={option.status} />
                        </TableCell>
                        </TableRow>
                        )
                  }):null
                }

                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {cwzOfTeam?(
          <Pagination count={showList? pageInfo.last_page : 0} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} />
  ):null}
        </Card>
      </Container>
    </Page>
  );
}
