import { filter } from 'lodash';
import { useEffect, useState } from 'react';
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
  TablePagination,
  Stack,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { GetCouncil } from '../../actions/CouncilAction';
import { GetZones } from '../../actions/ZonesAction';
import { GetWards } from '../../actions/WardsActions';
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
  
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

  console.log("CWZ of team",cwzOfTeam)
  const { teamId,teamName } = useParams();
  
  useEffect(()=>{
    dispatch(GetCZWByTeam(teamId,page+1,rowsPerPage));
  },[assignCWZToTeamLog,deleteCWZFromteamLog])


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
    if(search){
      dispatch(SearchCZWByTeam(teamId,newPage+1,rowsPerPage,searchValue));
    }
    else {
      dispatch(GetCZWByTeam(teamId,newPage+1,rowsPerPage));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
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
          dispatch(SearchCZWByTeam(teamId,1,rowsPerPage,value))
          setSearch(true)
          setPage(0)
          setSearchValue(value);

        }
        else{
          dispatch(GetCZWByTeam(teamId,1,rowsPerPage));
          setSearch(false);
          setPage(0);
          setSearchValue("")
        }
    }, 1000);

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
          <Typography variant="h4" gutterBottom>
          Assigned Councils- Zones- Wards({teamName})
          </Typography>
          <Button onClick={handleNewUserClick} variant="contained" component={RouterLink} to="#" startIcon={<Iconify icon="eva:plus-fill"  />}>
          Assigned C-Z-W

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
                     { cwzOfTeam?.map((option,index) => {
                        return (                                                                      
                        <TableRow
                        hover
                      >
                        <TableCell align="left">{index+1}</TableCell>
                        <TableCell align="left">{option.council_name}</TableCell>
                        <TableCell align="left">{option.zone_name}</TableCell>
                        <TableCell align="left">{option.ward_name}</TableCell>
                        <TableCell align="left">{option.form_date}</TableCell>
                        <TableCell align="left">{option.to_date?option.to_date:"-"}</TableCell>
                        <TableCell align="left">{option.status?"Active":"Inactive"}</TableCell>
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
