// import { filter } from 'lodash';
// import { useEffect, useRef, useState } from 'react';
// import { Link as RouterLink, useLocation } from 'react-router-dom';
// import {
//   Card,
//   Table,
//   Stack,
//   Grid,
//   Avatar,
//   Button,
//   Checkbox,
//   TableRow,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   TableContainer,
//   Pagination,
// } from '@mui/material';

// import { makeStyles } from '@material-ui/core/styles';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';
// import { useDispatch, useSelector } from 'react-redux';
// import { DeleteTeam, GetTeam, SearchTeam, GetTeamByFilter } from '../../actions/TeamsAction';
// import { GetActiveCouncil } from '../../actions/CouncilAction';
// import { GetActiveZones, GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
// import { GetActiveWards, GetActiveWardsByCouncilId } from '../../actions/WardsActions';
// import Page from '../../components/Page';
// import Label from '../../components/Label';
// import Scrollbar from '../../components/Scrollbar';
// import Iconify from '../../components/Iconify';
// import { UserListHead, UserListToolbar, TeamsMenu } from '../../sections/@dashboard/user';
// import USERLIST from '../../_mock/user';
// // import NewUserDialog from '../components/DialogBox/NewUserDialog';
// import TeamsData from '../../components/JsonFiles/TeamsData.json';
// import TeamsTableDialog from '../../components/DialogBox/TeamsDialog/TeamsTableDialog';
// import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
// import StatusButton from '../../components/statusbutton/StatusButton';

// // ----------------------------------------------------------------------

// const TABLE_HEAD = [
//   { id: 'srno', label: '#', alignRight: false },
//   { id: 'name', label: 'Name', alignRight: false },
//   { id: 'roll', label: 'Role', alignRight: false },
//   { id: 'TeamCode', label: 'Team Code', alignRight: false },
//   { id: 'MobileNumber', label: 'MobileNumber', alignRight: false },
//   { id: 'zone', label: 'Zone', alignRight: false },
//   { id: 'ward', label: 'Ward', alignRight: false },
//   { id: 'lastTreeSyncOn', label: 'Last Tree Sync On', alignRight: false },
// ];

// // ----------------------------------------------------------------------

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc'
//     ? (a, b) => descendingComparator(a, b, orderBy)
//     : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function applySortFilter(array, comparator, query) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) return order;
//     return a[1] - b[1];
//   });
//   if (query) {
//     return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
//   }
//   return stabilizedThis.map((el) => el[0]);
// }

// export default function AssociateWithZeroTreeYesterday() {
//   const dispatch = useDispatch();
//   const [page, setPage] = useState(1);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [count, setCount] = useState(10);
//   const [open, setOpen] = useState(false);
//   const [dialogData, setDialogData] = useState(null);
//   const [search, setSearch] = useState(false);
//   const [searchValue, setSearchValue] = useState('');
//   const [stateName, setStateName] = useState('');
//   const [zoneId, setZoneId] = useState('');
//   const [wardId, setWardId] = useState('');
//   const [coucilId, setCouncilId] = useState('');
//   const [showList, setShowList] = useState(false);

//   const {
//     teams,
//     addTeamsLog,
//     editTeamsLog,
//     deleteTeamsLog,
//     pageInfo,
//     council,
//     zones,
//     wards,
//     activeZonesByCID,
//     activeWardsByCID,
//   } = useSelector((state) => ({
//     teams: state.teams.teams,
//     addTeamsLog: state.teams.addTeamsLog,
//     editTeamsLog: state.teams.editTeamsLog,
//     deleteTeamsLog: state.teams.deleteTeamsLog,
//     pageInfo: state.teams.pageInfo,
//     council: state.council.activeCouncil,
//     zones: state.zones.zones,
//     wards: state.wards.wards,
//     activeZonesByCID: state.zones.activeZonesByCID,
//     activeWardsByCID: state.wards.activeWardsByCID,
//   }));

//   const { state} = useLocation(); 

//   useEffect(()=>{
//     let cId = null;
//     let wId = null;
//     let zId = null;
//     if(state?.councilId){
//       setCouncilId(state.councilId)
//       cId = state.councilId;
//     }
//     if(state?.wardId){
//       setWardId(state.wardId);
//       wId = state.wardId;
//     }
//     if(state?.zoneId){
//       setZoneId(state.zoneId)
//       zId = state.zoneId;
//     }
//     if(state?.pageNumber){
//       setPage(state.pageNumber)
//     }
//     if(state){
//       dispatch(GetTeamByFilter(state.pageNumber,rowsPerPage,cId,zId,wId))
//     }
//     else {
//       dispatch(GetTeam(page,rowsPerPage));
//     }
    
//   },[])

//   const changeTeamRun = useRef(true);

//   useEffect(()=>{
//     if (changeTeamRun.current) {
//       changeTeamRun.current = false;
//       return;
//     }
//     dispatch(GetTeamByFilter(page,rowsPerPage,coucilId,zoneId,wardId));
//   },[addTeamsLog,editTeamsLog,deleteTeamsLog])

//   const fetchRun = useRef(true);
//   useEffect(() => {
//     if (fetchRun.current) {
//       fetchRun.current = false;
//       return;
//     }
//     setShowList(true);
//   }, [teams]);

//   useEffect(() => {
//     dispatch(GetActiveCouncil(1));
//     dispatch(GetActiveWards(1));
//     dispatch(GetActiveZones(1));
//   }, []);

//   useEffect(() => {
//     if (pageInfo) {
//       setCount(pageInfo?.total);
//     }
//   }, [pageInfo]);

//   const StateValue = [
//     {
//       id: 'Maharastra',
//       name: 'Maharastra',
//     },
//     {
//       id: 'Patana',
//       name: 'Patana',
//     },
//   ];

//   const handleNewUserClick = () => {
//     setDialogData(null);
//     setOpen(!open);
//   };

//   const handleStateChange = (event) => {
//     setStateName(event.target.value);
//   };

//   const handleEdit = (data) => {
//     setDialogData(data);
//     setOpen(!open);
//   };

//   const handleDelete = (data) => {
//     dispatch(DeleteTeam(data.id, data.status ? 0 : 1));
//   };

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//     setShowList(false);
//     if (search) {
//       dispatch(SearchTeam(newPage, rowsPerPage, searchValue));
//     } else {
//       dispatch(GetTeam(newPage, rowsPerPage));
//     }
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(1);
//     setShowList(false);
//     if (search) {
//       dispatch(SearchTeam(1, parseInt(event.target.value, 10), searchValue));
//     } else {
//       dispatch(GetTeam(1, parseInt(event.target.value, 10)));
//     }
//   };

//   let timer = null;
//   const filterByName = (event) => {
//     const { value } = event.currentTarget;
//     clearTimeout(timer);
//     // Wait for X ms and then process the request
//     timer = setTimeout(() => {
//       if (value) {
//         setShowList(false);
//         dispatch(SearchTeam(1, rowsPerPage, value));
//         setSearch(true);
//         setPage(1);
//         setSearchValue(value);
//       } else {
//         setShowList(false);
//         dispatch(GetTeam(1, rowsPerPage));
//         setSearch(false);
//         setPage(1);
//         setSearchValue('');
//       }
//     }, 1000);
//   };

//   const handleCoucilChange = (e) => {
//     setCouncilId(e.target.value);
//     setZoneId('');
//     setWardId('');
//     setPage(1);
//     setShowList(false);
//     dispatch(GetTeamByFilter(1, rowsPerPage, e.target.value, null, null));
//     dispatch(GetActiveZonesByCouncilId(1, e.target.value));
//     dispatch(GetActiveWardsByCouncilId(1, e.target.value));
//   };

//   const handleWardChange = (e) => {
//     setWardId(e.target.value);
//     setPage(1);
//     setShowList(false);
//     dispatch(GetTeamByFilter(1, rowsPerPage, coucilId, zoneId, e.target.value));
//   };

//   const handleZoneChange = (e) => {
//     setZoneId(e.target.value);
//     setPage(1);
//     setShowList(false);
//     dispatch(GetTeamByFilter(1, rowsPerPage, coucilId, e.target.value, wardId));
//   };

//   const useStyles = makeStyles({
//     button: {
//       backgroundColor: '#d0fae2',
//       borderRadius: '5px',
//       padding: '2px 10px',
//       color: '#18a553',
//       border: '1.5px solid #18a553',
//       fontFamily: 'Poppins',
      
//     },
//   });
//   const classes = useStyles();
//   const getValidTeamType = (teamType) => {
//     let updatedTeamType = teamType;

//     if(teamType==="base_color"){
//       updatedTeamType = "Base Color";
//     }
//     else if(teamType==="census"){
//       updatedTeamType = "Census";
//     }
//     else if(teamType==="offsite_qc"){
//       updatedTeamType = "Offsite QC";
//     }
//     else if(teamType==="onsite_qc"){
//       updatedTeamType = "Onsite QC";
//     }
//     return updatedTeamType;
//   }

//   return (
//     <Page title="TeamList">
//       <Container>
//         {open ? <TeamsTableDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
//           <Typography variant="h4" gutterBottom>
//           Associates with 0 (Zero) Trees sync yesterday
//             <Typography variant="h6" style={{ fontWeight: 400 }}>
//             It is showing last top 10 logged associates
//             </Typography>
//           </Typography>
//         </Stack>

//         <Card>
//           {/* <TeamListToolbar
//             numSelected={0}
//             placeHolder={'Search teams...'}
//             onFilterName={filterByName}
//             handleCoucilChange={(e) => handleCoucilChange(e)}
//             handleWardChange={(e) => handleWardChange(e)}
//             handleZoneChange={(e) => handleZoneChange(e)}
//             coucilId={coucilId}
//             zoneId={zoneId}
//             wardId={wardId}
//             callType="Teams"
//           /> */}
//           <Scrollbar>
//             <TableContainer sx={{ minWidth: 800 }}>
//               <Table  size="small" aria-label="a dense table">
//                 <UserListHead headLabel={TABLE_HEAD} />
//                 <TableBody>
//                      {/* { teams?.map((option,index) => (
//                         <TableRow
//                         hover
//                       >
//                           <TableCell align="left">
//                         <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
//                       </TableCell>
//                         <TableCell align="left">{option.name}</TableCell>
//                         <TableCell align="left">
//                         {option.team_code !== '' ? <button className={classes.button}><b>{option.team_code}</b></button> : ''}
//                       </TableCell>
//                         <TableCell align="left">{getValidTeamType(option.team_type)}</TableCell>
//                         <TableCell align="left">{option?.council}</TableCell>
//                         <TableCell >{option?.zone}</TableCell>
//                         <TableCell align="left">{option?.ward}</TableCell>
//                         <TableCell align="left">
//                         <StatusButton status={option.status} />
//                       </TableCell>
//                         </TableRow>
//                         ))
//                 } */}

//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </Scrollbar>
         
//         </Card>
//       </Container>
//     </Page>
//   );
// }
