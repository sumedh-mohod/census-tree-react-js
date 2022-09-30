import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Stack,
  Button,
  Typography,
  Grid,
  Box,
  Container,
  Drawer,
  Divider,
  TextField,
  form,
  Modal,
  Select,
  MenuItem, 
  FormControlLabel,
  Checkbox,
  CircularProgress,
  Card,
  Breadcrumbs,
 
} from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ImageGallery from 'react-image-gallery';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { CheckBox } from '@mui/icons-material';
import TreeDetailsDialog from '../components/DialogBox/TreeDetailsDialog';
import { GetTreeCensusPendingQCStatus, UpdateQCStatusOfTreeCensus, ReferToExpert } from '../actions/TreeCensusAction';
import { GetActiveCouncil, SetActiveCouncil } from '../actions/CouncilAction';
import { GetActiveZones, GetActiveZonesByCouncilId, SetActiveZones } from '../actions/ZonesAction';
import { GetActiveWards, GetActiveWardsByCouncilId, SetActiveWards } from '../actions/WardsActions';
import { GetUsers, GetUsersByRoleID } from '../actions/UserAction';
// import { ImageCarousel } from "./ImageCarousel";
import Iconify from '../components/Iconify';
import Page from '../components/Page';
import ImageCarousel from '../components/ImageCarousel';
import { GetMyActiveTeam } from '../actions/TeamsAction';
import { ShowLoader } from '../actions/CommonAction';
import './TreeData/BaseColorPendingQC.css';
import FullLoader from '../components/Loader/FullLoader';

export default function NewUI() {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const dispatch = useDispatch();
  const [councilID, setCouncilID] = React.useState('');
  const [zoneID, setZoneID] = React.useState('');
  const [wardID, setWardID] = React.useState('');
  const [fromDate, setFromDate] = React.useState('');
  const [toDate, setToDate] = React.useState('');
  const [addedBy, setAddedBy] = React.useState('');
  const [updateClick, setUpdateClick] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [imageList, setImageList] = React.useState([]);
  const [totalTrees, setTotalTrees] = React.useState('');
  const [checked, setChecked] = React.useState(0);
  const [showData, setShowData] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const userPermissions = [];
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  const [open, setOpen] = React.useState(false);
  const handleOpen = (e) => setOpen(true);
  const handleClose = () => setOpen(false);
  let selectedUsers;


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const {
    users,
    council,
    zones,
    wards,
    userByRoleID,
    treeCensusPendingQCStatus,
    referToExpertLog,
    updateQCStatusLog,
    activeTeams,
    updateCensusTreeLog,
    loggedUser,
    showLoader,
  } = useSelector((state) => ({
    users: state.users.users,
    council: state.council.activeCouncil,
    zones: state.zones.activeZonesByCID,
    wards: state.wards.activeWardsByCID,
    userByRoleID: state.users.userByRoleID,
    treeCensusPendingQCStatus: state.treeCensus.treeCensusPendingQCStatus,
    referToExpertLog: state.treeCensus.referToExpertLog,
    updateQCStatusLog: state.treeCensus.updateQCStatusLog,
    activeTeams: state.teams.activeTeams,
    updateCensusTreeLog: state.treeCensus.updateCensusTreeLog,
    loggedUser: state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }));

  loggedUser.roles[0].permissions.map((item, index) => userPermissions.push(item.name));

  // console.log("in new", users);
  //     if(users){
  //     selectedUsers= users.filter(
  //       (currentValue) => {if(currentValue.assigned_roles.includes("Census User") || currentValue.assigned_roles.includes("Census QC - Offsite")){
  //         return currentValue;
  //       }
  //       return null;
  //   });
  //     console.log(":::::::::", selectedUsers);
  // }
console.log('index....', index);
  const firstRun = React.useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }

    dispatch(
      GetTreeCensusPendingQCStatus(
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
    setSelectedIndex(0);
  }, [activeTeams]);
  

  const secondRun = React.useRef(true);
  useEffect(() => {
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }

    if (selectedIndex + 1 === treeCensusPendingQCStatus?.data.length) {
      setSelectedIndex(0);
      setTotalTrees(totalTrees - 1);
      setUpdateClick(false);
      dispatch(GetTreeCensusPendingQCStatus(councilID, zoneID, wardID));
    } else {
      setSelectedIndex(selectedIndex + 1);
      setTotalTrees(totalTrees - 1);
      setUpdateClick(false);
      const imageList = [];
      if (treeCensusPendingQCStatus?.data.length !== 0) {
        treeCensusPendingQCStatus?.data[selectedIndex + 1].images?.map((value2, index) => {
          const imageUrl = { original: value2.image_url };
          imageList.push(imageUrl);
          return null;
        });
      }
      setImageList(imageList);
    }
  }, [updateQCStatusLog, updateCensusTreeLog, referToExpertLog]);
  console.log("imageList",imageList);

  const thirdRun = React.useRef(true);
  useEffect(() => {
    if (thirdRun.current) {
      thirdRun.current = false;
      return;
    }
    const imageList = [];
    if (treeCensusPendingQCStatus?.data.length !== 0) {
      treeCensusPendingQCStatus?.data[selectedIndex].images?.map((value2, index) => {
        const imageUrl = { original: value2.image_url };
        imageList.push(imageUrl);
        return null;
      });
    }
    setImageList(imageList);
    dispatch(ShowLoader(false));
    setShowData(true);
    setTotalTrees(treeCensusPendingQCStatus?.pending_qc_count);
  }, [treeCensusPendingQCStatus]);

  useEffect(() => {
    if (loggedUser?.roles[0]?.slug === 'qc_census_offsite') {
      dispatch(GetMyActiveTeam());
      dispatch(ShowLoader(true));
      dispatch(GetUsersByRoleID(1, 6, 8));
    } else {
      dispatch(GetUsersByRoleID(1, 6, 8));
      dispatch(GetActiveCouncil(1));
      dispatch(GetActiveWards(1));
      dispatch(GetActiveZones(1));
    }
  }, []);
  //  treeCensusPendingQCStatus.data.map((tree, index) =>(
  //     console.log(index, tree.tree_number, tree.tree_name.name)
  //     // console.log(tree.tree_number)
  //     // console.log(tree.tree_name.name)
  //     ));
  // console.log("userByRoleID",userByRoleID)
  const handleDialogOpen = () => {
    setDialogOpen(true);
    setUpdateClick(true);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setUpdateClick(false);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 0,
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleReferToExpert = () => {
    dispatch(
      ReferToExpert(
        {
          referred_to_expert: 1,
        },
        treeCensusPendingQCStatus?.data[selectedIndex].id
      )
    );
  };

  const handleApproveNext = () => {
    // console.log("HANDLE APPROVE CALLED");
    dispatch(
      UpdateQCStatusOfTreeCensus(treeCensusPendingQCStatus?.data[selectedIndex].id, {
        qc_status: 'Approved',
      })
    );
  };

  const handleRowClick = (tree) => {
    // console.log(tree);
  };

  const handleCouncilChange = (e) => {
    setCouncilID(e.target.value);
    setZoneID('');
    setWardID('');
    dispatch(GetActiveZonesByCouncilId(1, e.target.value));
    dispatch(GetActiveWardsByCouncilId(1, e.target.value));
    // console.log("Council change", e.target.value, zones, wards)
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

  // console.log("PENDING QC STATUS",treeCensusPendingQCStatus);

  const properties = {
    // thumbnailPosition: "left",
    useBrowserFullscreen: false,
    showPlayButton: false,
    showBullets: true,
    showIndex: true,
    // renderItem: this.myRenderItem.bind(this),
    items: imageList,
  };
  const FilterSchema = Yup.object().shape({
    councilForm: Yup.string().required('Please select council'),
    wardForm: Yup.string().required('Please select ward'),
    zoneForm: Yup.string().required('Please select zone'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      councilForm: councilID || ' ',
      wardForm: wardID || ' ',
      zoneForm: zoneID || ' ',
      addedByForm: addedBy || '',
      toDateForm: null,
      fromDateForm: null,
    },
    validationSchema: FilterSchema,
    onSubmit: (value) => {
      // console.log("in submit");
      // console.log("VALUE",value);
      dispatch(ShowLoader(true));
      dispatch(
        GetTreeCensusPendingQCStatus(
          councilID,
          zoneID,
          wardID,
          value.fromDateForm,
          value.toDateForm,
          value.addedByForm,
          checked
        )
      );
      setState({ ...state, right: false });
    },
  });

  const handleHeritage = (e) => {
    setChecked(!checked * 1);
  };
  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})
const classes = useStyles()
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="Census QC" sx={{ mt: -2 }}>
        <FullLoader showLoader={showLoader}/>
       <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
          Census QC
            <Typography variant="h6" style={{ fontWeight: 400 }}>
            It is showing Census QC
            </Typography>
          </Typography>
          <Button
            to="#"
            style={{width: '30%',fontWeight: 500,fontSize: '15px', backgroundColor: '#E8762F',color: '#fff'}}
            
            // startIcon={<Iconify icon="eva:plus-fill" />}
            className='desktop-button-'
          >
            Total Pending Trees :  <b style={{marginLeft: '5px'}}>{totalTrees || 0}</b>
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
      </Container>
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
            open={state.right}
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
                    disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
                    id="councilForm"
                    label="Council"
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
                    disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
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
                    error={Boolean(touched.zoneForm && errors.zoneForm)}
                    helperText={touched.zoneForm && errors.zoneForm}
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
                    disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
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
                    error={Boolean(touched.wardForm && errors.wardForm)}
                    helperText={touched.wardForm && errors.wardForm}
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
                    // error={Boolean(touched.addedByForm && errors.councilForm)}
                    //   helperText={touched.councilForm && errors.councilForm}
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
                    fullWidth
                    id="fromDate"
                    type="date"
                    label="Start Date"
                    margin="normal"
                    name="fromDateForm"
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // label="Plantation Date"
                    value={values.fromDateForm || ''}
                    // helperText={
                    //     errors.toDateForm && touched.toDateForm

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
                    label="End Date"
                    type="date"
                    margin="normal"
                    name="toDateForm"
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // label="Plantation Date"
                    value={values.toDateForm || ''}
                    F // }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ max: todayDate }}
                    {...getFieldProps('toDateForm')}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox onChange={handleHeritage} />} label="Show only Heritage Trees" />
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
      
      {(treeCensusPendingQCStatus?.data && treeCensusPendingQCStatus?.data.length === 0) || !showData ? (
        <Grid
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '20%',
            // margin: 'auto '
          }}
        >
          {/* <Typography><Iconify icon="eva:funnel-fill" /></Typography> */}
          <Typography align="center">
            <Typography sx={{ color: '#214C50', fontSize: '50px', mb: -2 }}>
              <Iconify icon="eva:funnel-fill" />
            </Typography>
            <b style={{ fontSize: '20px' }}>Filter Data</b>
            <Typography>Please filter Census QC data and here You will see the Census QC list</Typography>
          </Typography>
        </Grid>
      ) : (
        <>
          <Container>
            <Card style={{ padding: '0px 0px 10px 0px' }} >
              <Container>
                <div className="wrapper" style={{paddingTop: '10px'}}>
                  <div className="one" style={{paddingTop: '0px'}}>
                    <div className="wrapper">
                      <div className="one">
                        Tree Number: <br />
                        <Button variant="contained" >
                          {treeCensusPendingQCStatus?.data[selectedIndex].tree_number || '-'}
                        </Button>
                      </div>
                      <div className="one">
                        Tree Name(Botanical Name): <br />
                        <b>
                          {' '}
                          {treeCensusPendingQCStatus?.data[selectedIndex].tree_name?.name || '-'}(
                          {treeCensusPendingQCStatus?.data[selectedIndex].tree_name?.botanical_name})
                        </b>
                      </div>
                      <div className="one">
                        Tree Type: <br />
                        <b> {treeCensusPendingQCStatus?.data[selectedIndex].tree_type.tree_type || '-'}</b>
                      </div>
                      <div className="wrapper">
                        <div className="one border-bottom" style={{ borderBottom: '1px solid #e9e8e8' }}>
                          Location Type: <br />
                          <b>{treeCensusPendingQCStatus?.data[selectedIndex].location_type?.location_type || '-'}</b>
                        </div>
                        <div className="one border-bottom">
                          LAN: <br />
                          <b>
                            {' '}
                            {treeCensusPendingQCStatus?.data[selectedIndex].location_accuracy
                              ? treeCensusPendingQCStatus?.data[selectedIndex].location_accuracy
                              : '-'}
                          </b>
                        </div>
                      </div>
                    
                      <div className="one">
                        {' '}
                        Added By: <br />
                        <b>
                          {' '}
                          {treeCensusPendingQCStatus?.data[selectedIndex].added_by?.first_name}{' '}
                          {treeCensusPendingQCStatus?.data[selectedIndex].added_by?.last_name}
                        </b>
                      </div>
                      <div className="one">
                        Added On : <br />
                        <b> {treeCensusPendingQCStatus?.data[selectedIndex].added_on_date || '-'}</b>
                      </div>
                      <div className="wrapper">
                        <div className="one border-bottom">
                          Girth : <br />
                          <b>{treeCensusPendingQCStatus?.data[selectedIndex].girth || '-'}</b>
                        </div>
                        <div className="one border-bottom">
                          Canopy : <br />
                          <b> {treeCensusPendingQCStatus?.data[selectedIndex].canopy || '-'}</b>
                        </div>
                      </div>
                      <div className="wrapper">
                        <div className="one border-bottom border-left">
                          Height : <br /> <b> {treeCensusPendingQCStatus?.data[selectedIndex].height || '-'}</b>
                        </div>
                        <div className="one border-bottom">
                          Area(sq.Fit) : <br />{' '}
                          <b>
                            {' '}
                            {treeCensusPendingQCStatus?.data[selectedIndex].property?.area
                              ? treeCensusPendingQCStatus.data[selectedIndex].property.area
                              : '-'}
                          </b>
                        </div>
                      </div>

                      
                      <div className="one">
                        <Button
                          onClick={handleDialogOpen}
                          style={{
                            backgroundColor: '#E85454',
                          
                            width: '100%',
                            color: '#fff',
                            padding: '5px 40px',
                          }}
                        >
                          Unapproved & Next
                        </Button>
                      </div>
                      <div className="one">
                        <Button
                          onClick={handleReferToExpert}
                          sx={{
                        
                            width: '100%',
                            padding: '5px 20px',
                            alignContent: 'center',
                            backgroundColor: '#E8762F',
                            color: '#fff',
                            
                          }}
                        >
                          Refer To An Expert
                        </Button>
                      </div>
                      {updateClick ? (
                      <TreeDetailsDialog
                        isOpen={updateClick}
                        handleClose={handleDialogClose}
                        data={treeCensusPendingQCStatus.data[selectedIndex]}
                      />
                    ) : null}
                      {/* <div className="wrapperb" style={{marginTop: '20px'}}>
                     
                      </div> */}
                    </div>
                    <Container style={{ paddingLeft: '15px', paddingRight: '15px' }}>
                      <Button variant="contained" sx={{ boxShadow: 'none', width: '100%' }} onClick={handleApproveNext}>
                        Approve & Next
                      </Button>
                    </Container>
                  </div>

                  <div className="two">
                    <div className="wrappera">
                      {/* <ImageGallery {...properties} style={{ height: '300px', maxHeight: '300px !important' }} /> */}
                      {imageList?.map((val, index) => {
                        return (
                          <div className="one" key={index} style={{ border: 'none', display: 'flex', padding: '5px', cursor: 'pointer'  }} onClick={(e)=>{handleOpen(e);setIndex(index)}} 
                          onKeyDown={(e)=>handleOpen(e)} role='button' tabIndex={0}>
                           
                            <img
                              src={val.original}
                              alt="gallery"
                              height="100px"
                              width="90px"
                              style={{ borderRadius: '7px' }}
                           
                            />
                          
                            
                            {/* <button
                              onClick={handleOpen}
                              style={{ background: 'none', border: 'none', position: 'absolute', color: '#fff' }}
                            >
                              <Iconify icon="eva:expand-outline" height="50px" width="50px" />
                            </button> */}
                           
                          </div>
                        );
                      })}
                    </div>
                    <Modal
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="modal-modal-title"
                              aria-describedby="modal-modal-description"
                            >
                             <Container style={{width: '526px'}}>
                             <ImageCarousel imagelist={imageList} activeindex={index}/>
                             </Container>
                              {/* <Box sx={style}>
                                <img src={val.original} alt="gallery" height="650px" width="100%" />
                              </Box> */}
                            </Modal>
                    <div className="wrapper" style={{ border: 'none' }}>
                    <div className="one">
                        Property Type: <br />
                        <b>
                          {' '}
                          {treeCensusPendingQCStatus?.data[selectedIndex].property_type
                            ? treeCensusPendingQCStatus.data[selectedIndex].property_type?.property_type
                            : '-'}
                        </b>
                      </div>
                      <div className="one">
                        {' '}
                        Property Number:
                        <br />
                        <b>
                          {' '}
                          {treeCensusPendingQCStatus?.data[selectedIndex].property?.property_number
                            ? treeCensusPendingQCStatus.data[selectedIndex].property?.property_number
                            : '-'}
                        </b>
                      </div>
                      <div className="one">
                        Owner Name: <br />
                        <b> {treeCensusPendingQCStatus?.data[selectedIndex].property?.owner_name || '-'}</b>
                      </div>
                      <div className="one">
                        {' '}
                        Tenant Name: <br />
                        <b>{treeCensusPendingQCStatus?.data[selectedIndex].property?.tenant_name || '-'}</b>
                      </div>
                      <div className="one">
                        Tree Conditions : <br />{' '}
                        <b>{treeCensusPendingQCStatus?.data[selectedIndex].tree_condition.condition || '-'} </b>
                      </div>
                      <div className="one">
                        Plantation Date : <br />{' '}
                        <b>{treeCensusPendingQCStatus?.data[selectedIndex].plantation_date || '-'}</b>
                      </div>
                      {/* <div className="one" style={{ border: 'none' }}>
                        <table className="bor" style={{ marginLeft: '30px' }}>
                          <tr className="border-bottom">
                            <th style={{ textAlign: 'center', padding: '4px' }} className="border-bottom">
                              #
                            </th>
                            <th style={{ textAlign: 'center', padding: '4px' }} className="border-bottom">
                              Tree Number
                            </th>
                            <th style={{ textAlign: 'center', padding: '4px' }} className="border-bottom">
                              {' '}
                              Name
                            </th>
                          </tr>

                          {treeCensusPendingQCStatus?.data?.map((tree, index) => (
                            <tr style={{backgroundColor:index===selectedIndex?"#dddbdb":""}}>
                              <td style={{ textAlign: 'center', padding: '4px' }} className="border-bottom">
                                <b>{index + 1}</b>
                              </td>
                              <td style={{ textAlign: 'center', padding: '4px' }} className="border-bottom">
                                <b>{tree.tree_number}</b>
                              </td>
                              <td style={{ textAlign: 'center', padding: '4px' }} className="border-bottom">
                                {tree.tree_name.name}
                              </td>
                            </tr>
                          ))}
                        </table>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Container>
            </Card>
          </Container>

          {/* <Grid
            container
            style={{ height: 'calc(100vh - 118px)', marginBottom: '-80px', marginTop: '30px', overflowY: 'hidden' }}
          >
            <Grid item xs={4} style={{ height: '100%', overflowY: 'auto', paddingRight: '5%' }}>
              <Box sx={{ width: '100%', height: '100%', paddingRight: '5%', borderRight: '2px solid slategray' }}>
                <Typography variant="h4" gutterBottom align="center">
                  Total Pending Trees: {totalTrees}
                </Typography>
                <table
                  style={{
                    fontFamily: 'arial, sans-serif',
                    borderCollapse: 'collapse',
                    width: '100%',
                    borderRadius: '5px',
                  }}
                >
                  <tr style={{ borderRadius: '5px' }}>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>#</th>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>Tree Number</th>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>Tree Name</th>
                  </tr>

                  {treeCensusPendingQCStatus?.data?.map((tree, index) => (
                    <tr>
                      <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>{index + 1}</td>
                      <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>
                        {tree.tree_number}
                      </td>
                      <td style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>
                        {tree.tree_name.name}
                      </td>
                    </tr>
                  ))}
                </table>
              </Box>
            </Grid>
            <Grid item xs={8} style={{ height: '100%', overflowY: 'auto', paddingRight: '16px' }}>
              <Stack spacing={2}>
                <Box sx={{ height: 'auto', width: '100%', mr: 5 }}>
                  <ImageGallery {...properties} style={{ height: '300px', maxHeight: '300px !important' }} />
                </Box>
                <Box sx={{ height: 400, width: '100%' }}>
                  <Box sx={{ width: '100%' }}>
                    <Typography variant="h4" gutterBottom>
                      Tree Details:
                    </Typography>
                    {treeCensusPendingQCStatus?.data && treeCensusPendingQCStatus?.data?.length !== 0 ? (
                      <>
                        <table>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px' }}>Tree Number:</td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px' }}>
                              {' '}
                              {treeCensusPendingQCStatus?.data[selectedIndex].tree_number}
                            </td>
                          </tr>

                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Tree Name:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].tree_name?.name}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Botanical Name:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].tree_name?.botanical_name}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Tree Type:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].tree_type.tree_type}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Location Type:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].location_type?.location_type}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Accuracy Captured:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].location_accuracy
                                ? treeCensusPendingQCStatus?.data[selectedIndex].location_accuracy
                                : '-'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Age:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].age
                                ? treeCensusPendingQCStatus?.data[selectedIndex].age
                                : '-'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Property Type:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].property_type
                                ? treeCensusPendingQCStatus.data[selectedIndex].property_type?.property_type
                                : '-'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Property Number:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].property?.property_number
                                ? treeCensusPendingQCStatus.data[selectedIndex].property?.property_number
                                : '-'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Owner Name:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].property?.owner_name}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Tenant Name:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].property?.tenant_name}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Area(Sq feet):{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].property?.area
                                ? treeCensusPendingQCStatus.data[selectedIndex].property.area
                                : '-'}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Plantation Date:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].plantation_date}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Tree Condition:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].tree_condition.condition}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Added By:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].added_by?.first_name}{' '}
                              {treeCensusPendingQCStatus?.data[selectedIndex].added_by?.last_name}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Added On:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].added_on_date}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Girth:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].girth}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Height:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].height}
                            </td>
                          </tr>
                          <tr>
                            <td style={{ fontWeight: 700, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              Canopy:{' '}
                            </td>
                            <td style={{ fontWeight: 400, textAlign: 'left', padding: '10px', paddingTop: '0px' }}>
                              {treeCensusPendingQCStatus?.data[selectedIndex].canopy}
                            </td>
                          </tr>
                        </table>
                      </>
                    ) : null}
                    <Box sx={{ height: 200, width: '100%', mt: 5 }}>
                      <Stack direction="row" spacing={4}>
                        {userPermissions.includes('approve-census-tree') ? (
                          <Button size="small" variant="contained" onClick={handleApproveNext}>
                            Approve & Next
                          </Button>
                        ) : null}
                        {userPermissions.includes('update-census-tree') ? (
                          <Button size="small" variant="contained" onClick={handleDialogOpen}>
                            Unapprove & Update
                          </Button>
                        ) : null}
                        <Button size="small" variant="contained" onClick={handleReferToExpert}>
                          Refer To Expert
                        </Button>
                      </Stack>
                    </Box>

                    {updateClick ? (
                      <TreeDetailsDialog
                        isOpen={updateClick}
                        handleClose={handleDialogClose}
                        data={treeCensusPendingQCStatus.data[selectedIndex]}
                      />
                    ) : null}
                  </Box>
                </Box>
              </Stack>
            </Grid>
          </Grid> */}
        </>
      )}
    </Page>
  );
}
