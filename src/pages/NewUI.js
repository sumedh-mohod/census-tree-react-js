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
  Breadcrumbs,
} from '@mui/material';
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

import Iconify from '../components/Iconify';
import Page from '../components/Page';
import { GetMyActiveTeam } from '../actions/TeamsAction';
import { ShowLoader } from '../actions/CommonAction';

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
  const userPermissions = [];
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
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

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return showLoader ? (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <CircularProgress color="success" />
    </div>
  ) : (
    <Page title="Census QC" style={{ paddingBottom: '0px' }}>
      <Container>
        <div role="presentation">
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
        </Typography>
        <Button
          onClick={toggleDrawer('right', true)}
          variant="contained"
          sx={{
            justifyContent: 'end',
            display: 'flex',
            px: 3,
            py: 1,
            float: 'right',
            mt: -4,
          }}
          // component={RouterLink}
          to="#"
          startIcon={<Iconify icon="eva:funnel-fill" />}
        >
          Filters
        </Button>
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
                  style={{ width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: 5 }}
                >
                  Apply
                </Button>
              </Grid>
            </div>
            {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
          </Drawer>
        </Box>
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
          <Grid container style={{ height: 'calc(100vh - 118px)', marginBottom: '-80px', marginTop: '30px', overflowY: 'hidden' }}>
            <Grid item xs={4} style={{ height: '100%', overflowY: 'auto', paddingRight: '5%' }}>
              <Box sx={{ width: '100%', height: '100%', paddingRight: '5%', borderRight: '2px solid slategray' }}>
                <Typography variant="h4" gutterBottom align="center">
                  Total Pending Trees: {totalTrees}
                </Typography>
                <table style={{ fontFamily: 'arial, sans-serif', borderCollapse: 'collapse', width: '100%' }}>
                  <tr>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>#</th>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>Tree Number</th>
                    <th style={{ border: '1px solid #dddddd', textAlign: 'center', padding: '4px' }}>Tree Name</th>
                  </tr>

                  {treeCensusPendingQCStatus?.data?.map((tree, index) => (
                    <tr style={{ backgroundColor: index === selectedIndex ? 'grey' : '' }}>
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
            {/* <Divider orientation='vertical' sx={{ mr:3}} flexItem/> */}
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
          </Grid>
        )}
      </Container>
    </Page>
  );
}
