
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
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
  Pagination,
  Link,
  IconButton,
  Modal,
  TextField,
  Grid,
  MenuItem,
  FormControlLabel,
  Drawer,
  Box,

} from '@mui/material';
import moment from 'moment';
import axios from "axios"
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
import BaseColorMoreMenu from '../../sections/@dashboard/tree/BaseColorMoreMenu';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import { GetBaseColorTrees, DeleteBaseColorTrees, SearchBaseColorTrees, AddBaseColorTrees, UpdateQCStatusOfBaseColorTrees } from '../../actions/BaseColorAction';
import { GetActiveCouncil, SetActiveCouncil } from '../../actions/CouncilAction';
import { GetUsers, GetUsersByRoleID } from '../../actions/UserAction';
import { GetActiveZonesByCouncilId, GetActiveZones, SetActiveZones } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId, GetActiveWards, SetActiveWards} from '../../actions/WardsActions';
import { GetMyActiveTeam } from '../../actions/TeamsAction';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';
import StatusPendngButton from '../../components/statusbutton/StatusPendngButton';
import StatusApprovedButton from '../../components/statusbutton/StatusApprovedButton';
import StatusUnapprovedButton from '../../components/statusbutton/StatusUnapprovedButton';
import ImageCarousel from '../../components/ImageCarousel';
import FullLoader from '../../components/Loader/FullLoader';
import { ShowLoader } from '../../actions/CommonAction';
import {GetReportRequest} from "../../actions/WorkReportAction";
import {SetNewAlert } from "../../actions/AlertActions"


// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'locationType', label: 'Location Type', alignRight: false },
  { id: 'propertyType', label: 'Property Type', alignRight: false },
  { id: 'propertyNumber', label: 'Property Number', alignRight: false },
  { id: 'propertyAddress', label: 'Property Address', alignRight: false },
  { id: 'treeLocation', label: 'Tree Location', alignRight: false },
  { id: 'locationAccuracyNeeded', label: 'Accuracy Captured', alignRight: false },
  { id: 'ownerName', label: 'Owner Name', alignRight: false },
  { id: 'tenantName', label: 'Tenant Name', alignRight: false },
  { id: 'images', label: 'Images', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'addedOn', label: 'Added On', alignRight: false },
  { id: 'qcStatus', label: 'QC Status', alignRight: false },
  { id: 'qcRemarks', label: 'QC Remarks', alignRight: false },
  { id: 'qcBy', label: 'QC By', alignRight: false },
  { id: 'qcDate', label: 'QC Date', alignRight: false },
  { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function BaseColor() {
  const dispatch = useDispatch();
  const [councilID, setCouncilID] = React.useState('');
  const [zoneID, setZoneID] = React.useState('');
  const [wardID, setWardID] = React.useState('');
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [count, setCount] = React.useState(10);
  const [open, setOpen ] = React.useState(false);
  const [viewOpen, setViewOpen ] = React.useState(false);
  const [dialogData,setDialogData] = React.useState(null);
  const [search,setSearch] = React.useState(false);
   const [searchValue,setSearchValue] = React.useState("");
   const [stateName, setStateName] = React.useState('');
   const [zoneId,setZoneId] = React.useState('');
   const [wardId,setWardId] = React.useState('');
   const [selectedIndex, setSelectedIndex] = React.useState(0);
   const [coucilId,setCouncilId] = React.useState('');
   const [imageList,setImageList] = React.useState([]);
   const [showList,setShowList] = React.useState(false);  
   const [qcDialogOpen,setQcDialogOpen] = React.useState(false);
   const [addedBy, setAddedBy] = React.useState('');
   const [baseColorId,setBaseColorId] = React.useState("");
   const userPermissions = [];
   const todayDate = moment(new Date()).format('YYYY-MM-DD');
   const [openImageList, setOpenImageList] = React.useState(false);
   const [addedByForm, setAddedByForm] = React.useState();
   const [formDate, setFromDate] = React.useState();
   const [toDate, setToDate] = React.useState();
   const handleOpenImageList = (e) => setOpenImageList(true);
   const handleCloseImageList = () => setOpenImageList(false);
   const [councilName,setCouncilName] =  React.useState();
   const [buttonClick, setButtonClick] = React.useState(true); 
// console.log("coucilId", coucilId);
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
    baseColorTrees,
    userByRoleID,
    activeTeams,
    editBaseColorTreesLog,
    deleteBaseColorTreesLog,
    updateQCStatusLog,
    pageInfo,
    loggedUser,
    showLoader
  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    zones:state.zones.activeZonesByCID,
    wards:state.wards.activeWardsByCID,
    activeTeams: state.teams.activeTeams,
    baseColorTrees:state.baseColor.baseColorTrees,
    userByRoleID: state.users.userByRoleID,
    editBaseColorTreesLog:state.baseColor.editBaseColorTreesLog,
    deleteBaseColorTreesLog:state.baseColor.deleteBaseColorTreesLog,
    updateQCStatusLog:state.baseColor.updateQCStatusLog,
    pageInfo:state.baseColor.pageInfo,
    loggedUser:state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }));
// console.log("wards", wards);
  loggedUser.roles[0].permissions.map((item, index)=>(
    userPermissions.push(item.name)
  ))

  const councilArr = council?.find((val) => val.id === councilID);

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
        dispatch(GetBaseColorTrees(state.pageNumber,rowsPerPage,cId,zId,wId))
      }
      
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
    // console.log("First Run Function");
    dispatch(ShowLoader(false));
    dispatch(
      GetBaseColorTrees(
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

  // const firstRun = React.useRef(true);
  // useEffect(()=>{
  //   if (firstRun.current) {
  //     firstRun.current = false;
  //     return;
  //   }
  //   setShowList(true);
  //   dispatch(GetBaseColorTrees(page,rowsPerPage,coucilId,zoneId,wardId));
  // },[editBaseColorTreesLog,deleteBaseColorTreesLog,updateQCStatusLog])


  const thirdRun = React.useRef(true);
  useEffect(() => {
    if (thirdRun.current) {
      thirdRun.current = false;
      return;
    }
    setShowList(true);
    dispatch(ShowLoader(false));
  }, [baseColorTrees]);

  useEffect(() => {

    if (loggedUser?.roles[0]?.slug === 'get-base-color-trees') {
      dispatch(GetMyActiveTeam());
      dispatch(ShowLoader(true));
      dispatch(GetUsersByRoleID(1, 3, 5));
    } else {
      dispatch(GetUsersByRoleID(1, 3, 5));
      dispatch(GetActiveCouncil(1));
      dispatch(GetActiveWards(1));
      dispatch(GetActiveZones(1));
    }
  }, []);

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
    setBaseColorId(id);
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

    dispatch(UpdateQCStatusOfBaseColorTrees(id,obj))

  }

  // console.log('baseColorTrees',baseColorTrees);
  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {
    dispatch(DeleteBaseColorTrees(data.id,data.status?0:1));
  };

  const handleAddedByChange = (event) => {
    // console.log("handleAddedByChange", handleAddedByChange);
    setAddedBy(event.target.value);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchBaseColorTrees(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetBaseColorTrees(newPage,rowsPerPage,councilID,zoneId,wardId,addedByForm,formDate,toDate));
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
          dispatch(SearchBaseColorTrees(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetBaseColorTrees(1,rowsPerPage,coucilId,zoneId,wardId));
          setShowList(false)
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }

const requestForWithoutFilter = () =>{
  // buttonClick(false)
  console.log("ClickButton true")
    dispatch(SetNewAlert({
    msg: "Please Select the Filter",
    alertType: "danger",
  }))

}
  const requestForReport=() => {
    const requestObj=  {
      "type":"base_color",
      "from_date":formDate.split('-').reverse().join('-'),
      "to_date":toDate.split('-').reverse().join('-'),
      "council_id":councilID,
      }
    if(zoneID){
      requestObj.zone_id=zoneID
    }
    if(wardID){
      requestObj.word_id=wardID
    }
    if(addedBy){
      requestObj.user_id=addedBy
    }
    
    dispatch(
     
      GetReportRequest(requestObj)
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

    council.map((value, index) => {
      if (value.id === e.target.value) {
        setCouncilName(value.name);
      }
      return null;
    });
  };

  const handleZoneChange = (event) => {
    setZoneID(event.target.value);
  };

  const handleWardChange = (event) => {
    setWardID(event.target.value);
  };

  // console.log('council...', council)
  // console.log('coucilId', coucilId);
  // console.log('zones', zones);


  const FilterSchema = Yup.object().shape({
    councilForm: Yup.string().required('Please select council'),
    toDateForm:  Yup.string().required('Please select End Date'),
    fromDateForm: Yup.string().required('Please select Start Date'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      councilForm:  councilArr?.id || councilID,
      wardForm: wardID || '',
      zoneForm: zoneID || '',
      addedByForm: addedBy || '',
      fromDateForm: councilArr?.project_start_date || "",
      toDateForm: councilArr?.project_end_date || "",
    },
    validationSchema: FilterSchema,
    onSubmit: (value) => {
      setAddedByForm(value.addedByForm);
      setFromDate(value.fromDateForm);
      setToDate(value.toDateForm);
      setNewState({ ...newState, right: false });
      dispatch(ShowLoader(true));
      dispatch(
        GetBaseColorTrees(1,rowsPerPage,councilID, zoneID, wardID, value.addedByForm,  value.fromDateForm, value.toDateForm),
      );
      setButtonClick(false)
    },
  });

  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})
// console.log("baseColorTrees",baseColorTrees)
const classes = useStyles()
const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <Page title="User">
       <FullLoader showLoader={showLoader}/>
      <Container>
        {open ? <BaseColorDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}

        {viewOpen ? <ViewImageDialog isOpen={viewOpen} handleClose={handleViewOpen} data={imageList} /> : null}

        {qcDialogOpen ? (
          <QcStatusDialog
            isOpen={qcDialogOpen}
            baseColorId={baseColorId}
            handleClose={() => handleQcDialog(null)}
            handleSubmit={(data, id) => handleQcSubmit(data, id)}
          />
        ) : null}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: '#000000', fontWeight: 900, fontSize: '20px'}} separator=":">
              
              <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                Tree Data
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#000000', fontWeight: 400 }}>
                Base Color
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '400', marginTop: '-8px' }}>
              It is showing list of trees with its details
            </Typography>
          </div>
          <Button
            to="#"
            onClick={()=> (buttonClick ? requestForWithoutFilter() : requestForReport())}
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
                    // disabled={loggedUser?.roles[0]?.slug === 'base_color'}
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
                    // disabled={loggedUser?.roles[0]?.slug === 'base_color'}
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
                    {userByRoleID?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.first_name} {option.last_name}
                      </MenuItem>
                    ))}
                  </TextField>
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
                    value={values.toDateForm || todayDate}
                     error={Boolean(touched.fromDateForm && errors.fromDateForm)}
                    helperText={touched.fromDateForm && errors.fromDateForm}
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
                    value={values.toDateForm || todayDate}
                    error={Boolean(touched.toDateForm && errors.toDateForm)}
                    helperText={touched.toDateForm && errors.toDateForm}
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

        <Card sx={{ mt: 2 }}>
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
            callType="BaseColor"
          /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table  size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />
                {!baseColorTrees ? (
                  <TableRow>
                    <TableCell align="right" colSpan={8} fontWeight={700}>
                      Please select council to get base color data
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableBody>
                  {showList
                    ? baseColorTrees?.map((option, index) => {
                        return (
                          <TableRow hover>
                            <TableCell align="left">
                              <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                            </TableCell>
                            <TableCell align="left">{option.location_type?.location_type}</TableCell>
                            <TableCell align="left">{option.property_type?.property_type}</TableCell>
                            <TableCell align="left">
                              {option.property?.property_number ? option.property?.property_number : '-'}
                            </TableCell>
                            <TableCell align="left">
                              {option.property?.address ? option.property?.address : '-'}
                            </TableCell>
                            <TableCell align="left">{option.location}</TableCell>
                            <TableCell align="left">{option.location_accuracy}</TableCell>
                            <TableCell align="left">{option.property?.owner_name}</TableCell>
                            <TableCell align="left">
                              {option.property?.tenant_name ? option.property?.tenant_name : '-'}
                            </TableCell>
                            <TableCell align="left">
                              {/* <Link to="#" onClick={handleViewOpen} style={{cursor:'pointer'}}>View</Link> */}
                              <IconButton
                                aria-label="delete"
                                size="large"
                                // onClick={() => handleViewOpen(option.images)}
                                onClick={(e) => {
                                  setImageList(option.images || []);
                                  handleOpenImageList(e);
                                }}
                                sx={{color: '#214c50'}}
                              >
                                <Visibility />
                              </IconButton>
                            </TableCell>
                            <TableCell align="left">
                              {option.added_by?.first_name} {option.added_by?.last_name}
                            </TableCell>
                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                              {option.added_on_date}
                            </TableCell>
                            <TableCell align="left">
                              {option.qc_status === 'Pending'?<StatusPendngButton qcStatus={option.qc_status}/>: ''}
                              {option.qc_status === 'Approved'?<StatusApprovedButton qcStatus={option.qc_status}/>: ''}
                              {option.qc_status === 'Unapproved'?<StatusUnapprovedButton qcStatus={option.qc_status}/>: ''}
                              {/* {option.qc_status ? option.qc_status : '-'} */}
                              </TableCell>
                            <TableCell align="left">{option.qc_remark ? option.qc_remark?.remark : '-'}</TableCell>
                            <TableCell align="left">
                              {option.qc_by ? option.qc_by?.first_name : '-'}{' '}
                              {option.qc_by ? option.qc_by?.last_name : '-'}
                            </TableCell>
                            <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                              {option.qc_date ? option.qc_date : '-'}
                            </TableCell>
                            <TableCell align="right">
                              <BaseColorMoreMenu
                                baseColorId={option.id}
                                baseColorName={option.property?.owner_name}
                                permissions={userPermissions}
                                qcStatus={option.qc_status}
                                councilId={coucilId}
                                zoneId={zoneId}
                                wardId={wardId}
                                pageNumber={page}
                                handleEdit={() => handleEdit(option)}
                                handleApprove={() => handleQcSubmit(null, option.id)}
                                handleQcDialog={() => handleQcDialog(option.id)}
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
            <Modal
              open={openImageList}
              onClose={handleCloseImageList}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Container style={{ width: '526px' }}>
                <ImageCarousel imagelist={imageList} />
              </Container>
              {/* <Box sx={style}>
                                <img src={val.original} alt="gallery" height="650px" width="100%" />
                              </Box> */}
            </Modal>
          </Scrollbar>
          {baseColorTrees ? (
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
