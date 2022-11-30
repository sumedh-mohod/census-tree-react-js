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
  CircularProgress,
  Breadcrumbs,
  Card,
  Backdrop
} from '@mui/material';
import './BaseColorPendingQC.css';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import moment from 'moment';
import ImageGallery from 'react-image-gallery';
import { useDispatch, useSelector } from 'react-redux';
import FullLoader from '../../components/Loader/FullLoader';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import TreeDetailsDialog from '../../components/DialogBox/TreeDetailsDialog';
import {
  GetTreeCensusPendingQCStatus,
  UpdateQCStatusOfTreeCensus,
  ReferToExpert,
} from '../../actions/TreeCensusAction';
import { GetActiveCouncil, SetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZonesByCouncilId, GetActiveZones, SetActiveZones } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId, GetActiveWards, SetActiveWards } from '../../actions/WardsActions';
import { GetUsers, GetUsersByRoleID } from '../../actions/UserAction';
import Page from '../../components/Page';
import { GetMyActiveTeam } from '../../actions/TeamsAction';
import { GetBaseColorPendingQCStatus, UpdateQCStatusOfBaseColorTrees } from '../../actions/BaseColorAction';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';
import { ShowLoader } from '../../actions/CommonAction';
import ImageCarousel from '../../components/ImageCarousel';

export default function BaseColorPendingQC() {
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
  const [baseColorId, setBaseColorId] = useState('');
  const [totalTrees, setTotalTrees] = React.useState('');
  const [showData, setShowData] = React.useState(false);
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
    baseColorPendingQCStatus,
    updateQCStatusLog,
    activeTeams,
    loggedUser,
    showLoader,
  } = useSelector((state) => ({
    users: state.users.users,
    council: state.council.activeCouncil,
    zones: state.zones.activeZonesByCID,
    wards: state.wards.activeWardsByCID,
    userByRoleID: state.users.userByRoleID,
    baseColorPendingQCStatus: state.baseColor.baseColorPendingQCStatus,
    updateQCStatusLog: state.baseColor.updateQCStatusLog,
    activeTeams: state.teams.activeTeams,
    loggedUser: state.auth.loggedUser,
    showLoader: state.common.showLoader,
  }));

  loggedUser.roles[0].permissions.map((item, index) => userPermissions.push(item.name));

  //    if(users){
  //     selectedUsers= users.filter(
  //       (currentValue) => {if(currentValue.assigned_roles.includes("Base Color User") || currentValue.assigned_roles.includes("Base Color QC - Offsite")){
  //         return currentValue;
  //       }
  //       return null;
  //   });
  //   console.log("selectedUsers", selectedUsers)
  // }

  const firstRun = React.useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    // console.log("First Run Function");

    dispatch(
      GetBaseColorPendingQCStatus(
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

    if (selectedIndex + 1 === baseColorPendingQCStatus?.data.length) {
      setSelectedIndex(0);
      setTotalTrees(totalTrees - 1);
      setUpdateClick(false);
      // console.log("Second Run Function");
      dispatch(GetBaseColorPendingQCStatus(councilID, zoneID, wardID,fromDate,toDate,addedBy));
    } else {
      setSelectedIndex(selectedIndex + 1);
      setTotalTrees(totalTrees - 1);
      setUpdateClick(false);
      const imageList = [];
      if (baseColorPendingQCStatus?.data.length !== 0) {
        baseColorPendingQCStatus?.data[selectedIndex + 1].images?.map((value2, index) => {
          const imageUrl = { original: value2.image_url };
          imageList.push(imageUrl);
          return null;
        });
      }
      setImageList(imageList);
    }
  }, [updateQCStatusLog]);

  const thirdRun = React.useRef(true);
  useEffect(() => {
    if (thirdRun.current) {
      thirdRun.current = false;
      return;
    }
    const imageList = [];
    if (baseColorPendingQCStatus?.data.length !== 0) {
      baseColorPendingQCStatus?.data[selectedIndex].images?.map((value2, index) => {
        const imageUrl = { original: value2.image_url };
        imageList.push(imageUrl);
        return null;
      });
    }
    dispatch(ShowLoader(false));
    setShowData(true);
    setImageList(imageList);
    setTotalTrees(baseColorPendingQCStatus?.pending_qc_count);
  }, [baseColorPendingQCStatus]);

  useEffect(() => {
    if (loggedUser?.roles[0]?.slug === 'qc_base_color_offsite') {
      dispatch(GetMyActiveTeam());
      dispatch(ShowLoader(true));
      dispatch(GetUsersByRoleID(1, 3, 5));
    } else {
      dispatch(GetUsersByRoleID(1, 3, 5));
      dispatch(GetActiveCouncil(1));
      dispatch(GetActiveWards(1));
      dispatch(GetActiveZones(1));
    }

    // dispatch(GetBaseColorTreeById(1));
  }, []);
  
  const handleDialogOpen = (id) => {
    // console.log('clicked');
    setDialogOpen(true);
    setUpdateClick(true);
    setBaseColorId(id);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
    setUpdateClick(false);
    setBaseColorId(null);
  };

  // console.log("BASE COLOR PENDING QC STATUS",baseColorPendingQCStatus);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    border: 'none',
    p: 4,
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleApproveNext = () => {
    // console.log("HANDLE APPROVE CALLED");
    dispatch(
      UpdateQCStatusOfBaseColorTrees(baseColorPendingQCStatus?.data[selectedIndex].id, {
        qc_status: 'Approved',
      })
    );
  };

  const handleQcSubmit = (data, id) => {
    const obj = {};

    if (data) {
      obj.qc_status = 'Unapproved';
      obj.qc_remark_id = data;
    } else {
      obj.qc_status = 'Approved';
    }

    dispatch(UpdateQCStatusOfBaseColorTrees(id, obj));
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

  // console.log("PENDING QC STATUS",baseColorPendingQCStatus);

  const properties = {
    // thumbnailPosition: "left",
    useBrowserFullscreen: false,
    showPlayButton: false,
    showBullets: false,
    showIndex: false,
    // renderItem: this.myRenderItem.bind(this),
    items: imageList,
  };
  // console.log('imageList', imageList);
  const FilterSchema = Yup.object().shape({
    councilForm: Yup.string().required('Please select council'),
    wardForm: Yup.string().required('Please select ward'),
    zoneForm: Yup.string().required('Please select zone'),
  });
  // console.log('properties', properties);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      councilForm: councilID || '',
      wardForm: wardID || '',
      zoneForm: zoneID || '',
      addedByForm: addedBy || '',
      toDateForm: null,
      fromDateForm: null,
    },
    validationSchema: FilterSchema,
    onSubmit: (value) => {
      // console.log("VALUE",value);
      setState({ ...state, right: false });
      setFromDate(value.fromDateForm);
      setToDate(value.toDateForm);
      setAddedBy(value.addedByForm);
      dispatch(ShowLoader(true));
      dispatch(
        GetBaseColorPendingQCStatus(councilID, zoneID, wardID, value.fromDateForm, value.toDateForm, value.addedByForm)
      );
    },
  });

  // console.log("ZONES",baseColorPendingQCStatus.data[0].location_accuracy);
  // console.log("WARDS",wards);
  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})
const classes = useStyles()
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Page title="User" sx={{ mt: -2 }}>
      <Container>
      <FullLoader showLoader={showLoader}/>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={0.5}>
          <Typography variant="h4" gutterBottom>
            Base Color QC
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              It is showing Base Color QC
            </Typography>
          </Typography>
        
          <Button
            to="#"
            style={{ width: '30%', fontWeight: 500, fontSize: '15px', backgroundColor: '#E8762F', color: '#fff' }}
            // startIcon={<Iconify icon="eva:plus-fill" />}
            className="desktop-button"
          >
            Total Pending Trees : <b style={{ marginLeft: '5px' }}>{totalTrees || 0}</b>
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
        <Box sx={{ height: '100', mr: 3 }} xs={12}>
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
          >
            <div>
              <Grid container spacing={1} style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                <Grid item xs={12}>
                  <TextField
                    select
                    disabled={loggedUser?.roles[0]?.slug === 'qc_base_color_offsite'}
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
                    // helperText={
                    //     errors.toDateForm && touched.toDateForm

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
                  style={{ width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: 5 }}
                >
                  Apply
                </Button>
              </Grid>
            </div>
            {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
          </Drawer>
        </Box>
      </Stack>
      {(baseColorPendingQCStatus?.data && baseColorPendingQCStatus?.data.length === 0) || !showData ? (
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
            <Typography>Please filter Base Color QC data and here You will see the Base Color QC list</Typography>
          </Typography>
        </Grid>
      ) : (
        <Container>
          <Card style={{ height: '375px', padding: '10px 0px 0px 0px' }}>
            <Scrollbar>
              <Container>
                <div className="wrapper" >
                  <div className="one">
                    <div className="wrapper">
                      <div className="one mob-cen">
                        Location Type: <br />
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].location_type?.location_type
                            ? baseColorPendingQCStatus?.data[selectedIndex].location_type?.location_type
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        {' '}
                        Accuracy Captured:
                        <br />
                        <b>
                          {' '}
                          {baseColorPendingQCStatus?.data[selectedIndex].location_accuracy
                            ? baseColorPendingQCStatus?.data[selectedIndex].location_accuracy
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        Property Type: <br />
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].property_type
                            ? baseColorPendingQCStatus.data[selectedIndex].property_type?.property_type
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        {' '}
                        Property Number: <br />
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].property?.property_number
                            ? baseColorPendingQCStatus.data[selectedIndex].property?.property_number
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        {' '}
                        Owner Name: <br />
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].property?.owner_name
                            ? baseColorPendingQCStatus?.data[selectedIndex].property?.owner_name
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        Tenant Name : <br />
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].property?.tenant_name
                            ? baseColorPendingQCStatus?.data[selectedIndex].property?.tenant_name
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        Added by : <br />
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].added_by
                            ? `${baseColorPendingQCStatus?.data[selectedIndex].added_by?.first_name} ${baseColorPendingQCStatus?.data[selectedIndex].added_by?.last_name}`
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        Added On : <br />{' '}
                        <b>
                          {baseColorPendingQCStatus?.data[selectedIndex].added_on_date
                            ? baseColorPendingQCStatus?.data[selectedIndex].added_on_date
                            : '-'}
                        </b>
                      </div>
                      <div className="one mob-cen">
                        {userPermissions.includes('unapprove-base-color-tree') ? (
                          <Button
                            style={{ backgroundColor: '#E85454', color: '#fff', padding: '5px 20px', width: '100%' }}
                            onClick={() => handleDialogOpen(baseColorPendingQCStatus?.data[selectedIndex].id)}
                          >
                            Unapprove & Next
                          </Button>
                        ) : null}
                      </div>
                      <div className="one mob-cen">
                        <Button
                          variant="contained"
                          sx={{ padding: '5px 20px', width: '100%' }}
                          onClick={handleApproveNext}
                        >
                          Approve & Next
                        </Button>
                      </div>
                      {updateClick ? (
                        <QcStatusDialog
                          isOpen={updateClick}
                          baseColorId={baseColorId}
                          handleClose={() => handleDialogClose()}
                          handleSubmit={(data, id) => handleQcSubmit(data, id)}
                        />
                      ) : null}
                    </div>
                  </div>
                  <div className="two">
                    <div className="wrapper">
                      {imageList?.map((val, index) => {
                        return (
                          <div
                            className="one "
                            key={index}
                            style={{ border: 'none', display: 'flex', padding: '5px', cursor: 'pointer' }}
                            onClick={(e) => handleOpen(e)}
                            onKeyDown={(e) => handleOpen(e)}
                            role="button"
                            tabIndex={0}
                          >
                            <img
                              src={val.original}
                              alt="gallery"
                              height="160px"
                              width="150px"
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
                        <ImageCarousel imagelist={imageList} />
                      </Container>
                      {/* <Box sx={style}>
                                <img src={val.original} alt="gallery" height="100%" width="100%" />
                              </Box> */}
                    </Modal>
                  </div>
                </div>
              </Container>
            </Scrollbar>

          </Card>
        </Container>
      )}
    </Page>
  );
}
