import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import * as Yup from 'yup';
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

  Link,
  IconButton,
  Pagination,
  Box,
  Drawer,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import moment from 'moment';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import BaseColorDialog from "../../components/DialogBox/tree-data/BaseColorDialog";
import TreeCensusMenu from '../../sections/@dashboard/tree/TreeCensusMenu';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import {GetReportRequest} from "../../actions/WorkReportAction";
import { GetMyActiveTeam } from '../../actions/TeamsAction';
import { GetTreeCensus, SearchTreeCensus, UpdateQCStatusOfTreeCensus} from '../../actions/TreeCensusAction';
import { GetActiveCouncil, SetActiveCouncil } from '../../actions/CouncilAction';
import { GetUsersByRoleID } from '../../actions/UserAction';
import { GetActiveZonesByCouncilId ,GetActiveZones, SetActiveZones} from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId,GetActiveWards, SetActiveWards} from '../../actions/WardsActions';
import { GetActiveTreeName} from '../../actions/TreeNameAction';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';
import CencusViewDetailsDialog from '../../components/DialogBox/tree-data/CensusViewDetailsDialog';
import StatusPendngButton from '../../components/statusbutton/StatusPendngButton';
import StatusApprovedButton from '../../components/statusbutton/StatusApprovedButton';
import StatusUnapprovedButton from '../../components/statusbutton/StatusUnapprovedButton';
import { ShowLoader } from '../../actions/CommonAction';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'treeNumber', label: 'Tree Number', alignRight: false },
  { id: 'treeName', label: 'Tree Name', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'addedOn', label: 'Added On', alignRight: false },
  { id: 'age', label: 'Tree Age', alignRight: false },
  { id: 'locationAccuracyNeeded', label: 'Location Accuracy Captured', alignRight: false },
  { id: 'QCStatus', label: 'QC Status', alignRight: false },
  { id: 'isReferredToExpert', label: 'Is Referred To Expert?', alignRight: false },
  { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function Census() {
  const dispatch = useDispatch();
  const [councilID, setCouncilID] = React.useState('');
  const [zoneID, setZoneID] = React.useState('');
  const [wardID, setWardID] = React.useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [addedBy, setAddedBy] = React.useState('');
  const [open, setOpen ] = useState(false);
  const [viewOpen, setViewOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [stateName, setStateName] = useState('');
   const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [coucilId,setCouncilId] = useState('');
   const [imageList,setImageList] = useState([]);
   const [showList,setShowList] = useState(false);
   const [qcDialogOpen,setQcDialogOpen] = useState(false);
   const [viewCensusDetails, setViewCensusDetails] = useState(false)
   const [treeCensusId,setTreeCensusId] = useState("");
   const [addedByForm, setAddedByForm] = React.useState();
   const[heightFrom,setHeightFrom] = React.useState();
   const[heightTo, setHeightTo] = React.useState();
   const[girthFrom, setGirthFrom] = React.useState();
   const[girthTo, setGirthTo] = React.useState();
   const [treeNameId, setTreeNameId]= React.useState();
   const [treeNameFrom, setTreeNameFrom] = React.useState();
   const [formDate, setFromDate] = React.useState();
   const [toDate, setToDate] = React.useState();
   const [treeNumber,setTreeNumber] = React.useState();
   const [heightFromId,setHeightFromId] = React.useState();
   const [heightToId, setHeightToId] = React.useState();
   const [girthFromId, setGirthFromId] = React.useState();
   const [girthToId, setGirthToId]  = React.useState();
   const [reportForRequest, setReportForRequest] = React.useState();
   const todayDate = moment(new Date()).format('YYYY-MM-DD');
   const userPermissions = [];

   const [newState, setNewState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


   const {
    council,
    zones,
    wards,
    treeCensus,
    treeName,
    userByRoleID,
    activeTeams,
    editBaseColorTreesLog,
    deleteBaseColorTreesLog,
    updateQCStatusLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    activeTeams: state.teams.activeTeams,
    zones:state.zones.activeZonesByCID,
    wards:state.wards.activeWardsByCID,
    treeCensus:state.treeCensus.treeCensus,
    userByRoleID: state.users.userByRoleID,
    treeName:state.treeName.activeTreeName,
    // editBaseColorTreesLog:state.baseColor.editBaseColorTreesLog,
    // deleteBaseColorTreesLog:state.baseColor.deleteBaseColorTreesLog,
    updateQCStatusLog:state.treeCensus.updateQCStatusLog,
    pageInfo:state.treeCensus.pageInfo,
    loggedUser:state.auth.loggedUser
  }));
console.log("treeCensus", treeCensus)
  console.log("treeName", treeName);
loggedUser.roles[0].permissions.map((item, index)=>(
  userPermissions.push(item.name)
))

  const { state} = useLocation();

  useEffect(()=>{
    let cId = null;
    let wId = null;
    let zId = null;
    if(state?.councilId){
      setCouncilId(state.councilId)
      cId = state.councilId;
    }
    if(state?.wardId){
      setWardId(state.wardId);
      wId = state.wardId;
    }
    if(state?.zoneId){
      setZoneId(state.zoneId)
      zId = state.zoneId;
    }
    if(state?.pageNumber){
      setPage(state.pageNumber)
    }
    if(state){
      dispatch(GetTreeCensus(state.pageNumber,rowsPerPage,cId,zId,wId))
    }
    dispatch(GetUsersByRoleID(1, 3, 5));
    dispatch(GetActiveTreeName(1))
  },[])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setNewState({ ...newState, [anchor]: open });
  };


  const firstRun = React.useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    dispatch(ShowLoader(false));
    dispatch(
      GetTreeCensus(
        activeTeams?.active_council_id,
        activeTeams?.active_zone_id,
        activeTeams?.active_ward_id
      )
    );
    setCouncilID(activeTeams?.active_council_id);
    setZoneID(activeTeams?.active_zone_id);
    setWardID(activeTeams?.active_ward_id);
    const activeCouncilObj = {
      data: [{ id: activeTeams?.active_council_id, name: activeTeams?.active_council_name, status: 1 }],
    };
    const activeWardObj = {
      data: [{ id: activeTeams?.active_ward_id, name: activeTeams?.active_ward_name, status: 1 }],
    };
    const activeZoneObj = {
      data: [{ id: activeTeams?.active_ward_id, name: activeTeams?.active_zone_name, status: 1 }],
    };
    dispatch(SetActiveCouncil(activeCouncilObj));
    dispatch(SetActiveWards(activeWardObj));
    dispatch(SetActiveZones(activeZoneObj));
    // setSelectedIndex(0);
  }, [activeTeams]);

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    dispatch(ShowLoader(false));
    setShowList(true);
    // dispatch(GetTreeName())
  },[treeCensus])

  // useEffect(()=>{
  //   dispatch(GetActiveCouncil(1));
  //   // dispatch(GetBaseColorTreeById(1));
  // },[])

  useEffect(() => {
  if (loggedUser?.roles[0]?.slug === 'get-tree-census') {
    dispatch(GetMyActiveTeam());
    dispatch(ShowLoader(true));
    dispatch(GetUsersByRoleID(1, 6, 8));
    // dispatch(GetTreeName())
  } else {
    dispatch(GetUsersByRoleID(1, 6, 8));
    // dispatch(GetTreeName())
    dispatch(GetActiveCouncil(1));
    dispatch(GetActiveWards(1));
    dispatch(GetActiveZones(1));
  }
}, []);
  // useEffect(()=>{get-tree-census
  //   dispatch(ShowLoader(true));
  //   dispatch(GetActiveCouncil(1));
  //   dispatch(GetUsersByRoleID(1, 6, 8));
  //   // dispatch(GetBaseColorTreeById(1));
  // },[])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    setImageList(images || []);
  }

  const handleQcDialog = (id) => {
    setQcDialogOpen(!qcDialogOpen);
    setTreeCensusId(id);
  }

  const handleCensusViewDetailsDialog= (data) => {
    setViewCensusDetails(!viewCensusDetails);
    setDialogData(data)
  }

  const handleQcSubmit = (data,id) => {
    const obj = {};

    if(data){
      obj.qc_status = "Unapproved";
      obj.qc_remark_id = data;
    }
    else {
      obj.qc_status = "Approved";
    }

    dispatch(UpdateQCStatusOfTreeCensus(id,obj))

  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {

  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchTreeCensus(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(newPage,rowsPerPage,councilID,zoneId,wardId,addedByForm,treeNameFrom,heightFrom, heightTo, girthFrom, girthTo,formDate,toDate));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
    }
  };
  function handleClick(event) {
    event.preventDefault();
  }

  let timer = null;
  const filterByName = (event) => {
    const {value} = event.currentTarget;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId));
          setShowList(false)
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }



  const requestForReport=() => {

    
      dispatch(
        GetReportRequest(
{
"type":"census",
"from_date":formDate.split('-').reverse().join('-'),
"to_date":toDate.split('-').reverse().join('-'),
"council_id":councilID,
"zone_id":zoneID,
"ward_id":wardID,
"user_id":addedBy
}


        )
      )
  
    // console.log("GetWorkReportrequest")
    // dispatch(GetReportRequest(setReportForRequest()))
   }

  const handleCouncilChange = (e) => {
    setCouncilID(e.target.value);
    setZoneID('');
    setWardID('');
    dispatch(GetActiveZonesByCouncilId(1, e.target.value));
    dispatch(GetActiveWardsByCouncilId(1, e.target.value));
  };

  const handleZoneChange = (event) => {
    setZoneID(event.target.value);
  };

  const handleWardChange = (event) => {
    setWardID(event.target.value);
  };

  const handleAddedByChange = (event) => {
    setAddedBy(event.target.value);
  };

  const handleTreeNameChange =(event) => {
    setTreeNameId(event.target.value)
  }

  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})

const FilterSchema = Yup.object().shape({
  councilForm: Yup.string().required('Please select council'),
  toDateForm:  Yup.string().required('Please select End Date'),
  fromDateForm: Yup.string().required('Please select Start Date'),
});
// console.log('properties', properties);
const formik = useFormik({
  enableReinitialize: true,
  initialValues: {
    councilForm: councilID || '',
    wardForm: wardID || '',
    zoneForm: zoneID || '',
    addedByForm: addedBy || '',
    treeNameFrom: treeNameId || '',
    heightFrom: heightFromId||"",
    heightTo:heightToId||  "",
    girthFrom: girthFromId|| "",
    girthTo: girthToId||"",
    toDateForm: "",
    fromDateForm: "",
  },
  validationSchema: FilterSchema,
  onSubmit: (value) => {
    console.log("in submit", value);
    setAddedByForm(value.addedByForm);
    setTreeNameFrom(value.treeNameFrom)
    setHeightFrom(value.heightFrom)
    setHeightTo(value.heightTo)
    setGirthFrom(value.girthFrom)
    setGirthTo(value.girthTo)

    setFromDate(value.fromDateForm);
    setToDate(value.toDateForm);
    setNewState({ ...newState, right: false });
    dispatch(ShowLoader(true));
  dispatch(
      GetTreeCensus(1,rowsPerPage,councilID, zoneID, wardID, value.addedByForm,value.treeNameFrom,value.heightFrom,value.heightTo,value.girthFrom,value.girthTo,  value.fromDateForm, value.toDateForm),
    )
   
  },
});
const classes = useStyles()
const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
console.log("treeNamestate", treeName)
  return (
    <Page title="Base Color">
      <Container>
        {open ? <BaseColorDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}

        {viewOpen ? <ViewImageDialog isOpen={viewOpen} handleClose={handleViewOpen} data={imageList} /> : null}

        {qcDialogOpen ? (
          <QcStatusDialog
            isOpen={qcDialogOpen}
            baseColorId={treeCensusId}
            handleClose={() => handleQcDialog(null)}
            handleSubmit={(data, id) => handleQcSubmit(data, id)}
          />
        ) : null}

        {viewCensusDetails ? (
          <CencusViewDetailsDialog
            isOpen={viewCensusDetails}
            handleClose={() => handleCensusViewDetailsDialog()}
            data={dialogData}
          />
        ) : null}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: '#000000', fontWeight: 900, fontSize: '20px' }} separator=":">
            
              <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                Tree Data
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#000000', fontWeight: 400 }}>
                Census
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '400', marginTop: '-8px'  }}>
              It is showing list of trees with its details
            </Typography>
          </div>
          <Button
            to="#"
            onClick={requestForReport}
            style={{width: '20%',fontWeight: 500,fontSize: '15px', backgroundColor: '#E8762F',color: '#fff'}}
            
            // startIcon={<Iconify icon="eva:plus-fill" />}
            className='desktop-button-'
          >
          Request For Report
          </Button>
           <Button
           onClick={toggleDrawer('right', true)}
            variant="contained"
            to="#"
          
            startIcon={<Iconify icon="eva:funnel-fill" />}
          >
            Filters
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {/* <Container sx={{ pl: 0 }}>
          <Typography variant="h4" gutterBottom>
            Census QC
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              It is showing Census QC
            </Typography>
          </Typography>
        </Container> */}
        {/* <div role="presentation">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ color: '#000000', fontWeight: 900, fontSize: '20px' }}
            separator=":"
          >
            <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
              Census QC
            </Typography>
          </Breadcrumbs>
        </div>
        <Typography variant="h6" fontWeight={400} sx={{ mt: -1 }}>
          It is showing Census QC
        </Typography> */}
        {/* <Box
          display="flex"
          alignItems="flex-start"
          // flexDirection="row" This is the default
        >
          <Box alignSelf="center">
            <Box
              sx={{
                // justifyContent: 'end',
                px: 3,
                py: 1,
                mt: -4,
                mr: 2,
                backgroundColor: '#E8762F',
                color: '#fff',
                fontWeight: 500,
                width: '280px',
                borderRadius: '7px',
                textAlign: 'center',
              }}
              // component={RouterLink}
              to="#"
            >
              Total Pending Trees : <b>{totalTrees || 0}</b>
            </Box>
          </Box>
          <Button
            onClick={toggleDrawer('right', true)}
            variant="contained"
            sx={{
              // justifyContent: 'end',
              px: 3,
              py: 1,
              mt: -4,
              boxShadow: 'none',
              mr: 3,
              // backgroundColor: '#000'
            }}
            // component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:funnel-fill" />}
          >
            Filters
          </Button>
        </Box> */}
        <Box sx={{ height: '100' }}>
          {/* <Button
           variant='outlined'
            sx={{justifyContent:'end', display:'flex', position: 'fixed',right: 0,top:'100px',border:'2px solid black',backgroundColor:'black',zIndex:'999', 
            "&.MuiButtonBase-root:hover": {
              bgcolor: "black",
              border:'2px solid black'
            }
          }}
            onClick={toggleDrawer("right", true)} 
           
          >
        <FilterAltRoundedIcon sx={{color:'white'}}/>
          </Button>  */}
          <Drawer
            sx={{
              '& .MuiDrawer-paper': {
                width: '300px',
                maxWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
            anchor={'right'}
            open={newState.right}
            onClose={toggleDrawer('right', false)}
            // sx={{
            //   display: { xs: 'block', sm: 'none' },
            //   '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            // }}
          >
            <div>
            <Grid container spacing={1} style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                <Grid item xs={12}>
                  <TextField
                    select
                    // disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
                    id="councilForm"
                    label="Council*"
                    displayEmpty
                    value={councilID}
                    style={{ width: '100%' }}
                    size="small"
                    onChange={(e) => {
                      handleCouncilChange(e);
                      formik.handleChange(e);
                    }}
                    // onChange={handleCouncilChange}
                    error={Boolean(touched.councilForm && errors.councilForm)}
                    helperText={touched.councilForm && errors.councilForm}
                    inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                  }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Council*</em>
                    </MenuItem>
                    {council?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    select
                    disabled={loggedUser?.roles[0]?.slug === 'qc_base_color_offsite'}
                    id="zoneForm"
                    label="Zone"
                    displayEmpty
                    value={zoneID}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    onChange={(e) => {
                      handleZoneChange(e);
                      formik.handleChange(e);
                    }}
                    // onChange={handleZoneChange}
                    // error={Boolean(touched.zoneForm && errors.zoneForm)}
                    // helperText={touched.zoneForm && errors.zoneForm}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Zone*</em>
                    </MenuItem>
                    {councilID
                      ? zones?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    select
                    disabled={loggedUser?.roles[0]?.slug === 'qc_base_color_offsite'}
                    id="wardForm"
                    label="Ward"
                    displayEmpty
                    value={wardID}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    onChange={(e) => {
                      handleWardChange(e);
                      formik.handleChange(e);
                    }}
                    // onChange={handleWardChange}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Ward*</em>
                    </MenuItem>
                    {councilID
                      ? wards?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))
                      : null}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    select
                    id="addedBy"
                    label="Added By"
                    displayEmpty
                    value={addedBy}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // placeholder='*Status'
                    onChange={(e) => {
                      handleAddedByChange(e);
                      formik.handleChange(e);
                    }}
                    // onChange={handleAddedByChange}
                    // {...getFieldProps("addedByForm")}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Added By</em>
                    </MenuItem>
                    <MenuItem value="">
                      <em>----Null----</em>
                    </MenuItem>
                    {userByRoleID?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.first_name} {option.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    select
                    id="treeNameFrom"
                    label="Tree Name"
                    displayEmpty
                    value={treeNameId}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    onChange={(e) => {
                      handleTreeNameChange(e);
                      formik.handleChange(e);
                    }}
                    inputProps={{
                      classes: {
                        icon: classes.icon,
                      },
                    }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Tree Name</em>
                    </MenuItem>
                    <MenuItem value="">
                      <em>----Null----</em>
                    </MenuItem>
                    {treeName?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={6}> 
                  <TextField
                    id="heightFrom"
                    type="text"
                    autoComplete="Tree No"
                    label="Height Start"
                    value={values.heightFrom}
                    style={{ width: '100%', marginTop: 10, marginLeft:10 }}
                    size="small"
                    {...getFieldProps('heightFrom')}
                  />
                 </Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="heightTo"
                    type="text"
                    autoComplete="Height Start"
                    // placeholder="Height Start*"
                    label="Height End"
                    style={{ width: '100%', marginTop: 10 }}
                    size="small"
                    value={values.heightTo}
                    {...getFieldProps('heightTo')}
                  />
                   </Grid>
               
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}> 
                  <TextField
                    id="girthFrom"
                    type="text"
                    autoComplete="Tree No"
                    placeholder="Tree No*"
                    label="Girth Start"
                    style={{ width: '100%', marginTop: 10, marginLeft:10 }}
                    size="small"
                    value={values.girthFrom}
                    {...getFieldProps('girthFrom')}

                  />
                 </Grid>
                  <Grid item xs={6}>
                  <TextField
                    id="girthTo"
                    type="text"
                    autoComplete="Tree No"
                    label="Girth End"
                    style={{ width: '100%', marginTop: 10, }}
                    size="small"
                    value={values.girthTo}
                    {...getFieldProps('girthTo')}
                  />
                   </Grid>
               
                </Grid>
                
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="fromDate"
                    type="date"
                    label="Start Date*"
                    margin="normal"
                    name="fromDateForm"
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // label="Plantation Date"
                    value={values.fromDateForm || ''}
                    error={Boolean(touched.fromDateForm && errors.fromDateForm)}
                    helperText={touched.fromDateForm && errors.fromDateForm}
                    // }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ max: todayDate }}
                    {...getFieldProps('fromDateForm')}
                  />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    id="toDate"
                    label="End Date*"
                    type="date"
                    margin="normal"
                    name="toDateForm"
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // label="Plantation Date"
                    value={values.toDateForm || ''}
                    error={Boolean(touched.toDateForm && errors.toDateForm)}
                    helperText={touched.toDateForm && errors.toDateForm}

                    // }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ max: todayDate }}
                    {...getFieldProps('toDateForm')}
                  />
                </Grid>

                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: 5}}
                >
                  Apply
                </Button>
              </Grid>
            </div>
            {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
          </Drawer>
        </Box>
      </Stack>

        <Card>
          {/* <TeamListToolbar
            numSelected={0}
            placeHolder={'Search Base Color...'}
            onFilterName={filterByName}
            handleCoucilChange={(e) => handleCoucilChange(e)}
            handleWardChange={(e) => handleWardChange(e)}
            handleZoneChange={(e) => handleZoneChange(e)}
            coucilId={coucilId}
            zoneId={zoneId}
            wardId={wardId}
          /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table  size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />
                {!treeCensus ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8} fontWeight={700}>
                      Please select council to get census data
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableBody>
                  {showList
                    ? treeCensus?.data?.map((option, index) => {
                        return (
                          <TableRow hover>
                            <TableCell align="left">
                              <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                            </TableCell>
                            <TableCell align="left" ><b>{option.tree_number ? option.tree_number : '-'}</b></TableCell>
                            <TableCell align="left">{option.tree_name?.name}</TableCell>
                            <TableCell align="left">
                              {option.added_by?.first_name} {option.added_by?.last_name}{' '}
                            </TableCell>
                            <TableCell align="left">{option.added_on_date}</TableCell>
                            <TableCell align="left">{option.age}</TableCell>
                            <TableCell align="left">{option.location_accuracy}</TableCell>
                            <TableCell align="left">
                            {option.qc_status === 'Pending'?<StatusPendngButton qcStatus={option.qc_status}/>: ''}
                              {option.qc_status === 'Approved'?<StatusApprovedButton qcStatus={option.qc_status}/>: ''}
                              {option.qc_status === 'Unapproved'?<StatusUnapprovedButton qcStatus={option.qc_status}/>: ''}
                          </TableCell>
                            <TableCell align="left">{option.referred_to_expert === 1 ? <b style={{color: 'green'}}>Yes</b> : <b style={{color: '#E8762F'}}>No</b>}</TableCell>
                           
                            <TableCell align="right">
                              <TreeCensusMenu
                                permissions={userPermissions}
                                treeCensusId={option.id}
                                treeCensusName={option.property?.owner_name}
                                qcStatus={option.qc_status}
                                councilId={coucilId}
                                zoneId={zoneId}
                                wardId={wardId}
                                pageNumber={page}
                                handleEdit={() => handleEdit(option)}
                                handleApprove={() => handleQcSubmit(null, option.id)}
                                handleQcDialog={() => handleQcDialog(option.id)}
                                handleCensusViewDialog={() => handleCensusViewDetailsDialog(option)}
                                handleDelete={() => handleDelete(option)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        
          {treeCensus ? (
            <Pagination
              count={showList ? pageInfo.last_page : 0}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
              sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
            />
          ) : null}
        </Card>
      </Container>
    </Page>
  );
}
