import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import moment from 'moment';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import Icon from '@mui/material/Icon';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { Stack, Avatar, Checkbox, Container, Drawer } from '@mui/material';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import Page from '../../components/Page';
import CouncilList from './CouncilList';
import Teamczw from './Teamczw';
import WorkTypeList from './WorkTypeList';
import UserTypeList from './UserTypeList';
import TeamAllocation from './TeamAllocation';
import { GetWorkTypeWorkReports, GetWorkReports } from '../../actions/WorkReportAction';

export default function WorkingReports(props) {
  const [zoneId, setZoneId] = useState('');
  const [wardId, setWardId] = useState('');
  const [treeNumber, setTreeNumber] = useState('');
  const [coucilId, setCouncilId] = useState('');
  const [showList, setShowList] = useState(false);
  const [editUser, setEditUser] = useState(false);
  const [reportType, setReportType] = useState('');
  const [council, setCouncil] = useState('');
  const [workType, setWorkType] = useState('');
  const [user, setUser] = useState('');
  const [showWorkType, setShowWorkType] = useState(false);
  const [showCouncil, setShowCouncil] = useState(false);
  const [showUser, setShowUser] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setTodate] = useState('');
  const [showListUser, setShowListUser] = useState(false);
  const [councilfield, setCouncilField] = useState(false);
  const [showWorkTypeTable, setShowWorkTypeTable] = useState(false);
  const [showMessage, setShowMessage] = useState(true);
  const [teamAllocation, setTeamAllocation] = useState(false);
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
  const [userBy, setUserBy] = React.useState('');
  const [teamCzw, setTeamczw] = React.useState(false);
  const [userField, setUserField] = React.useState(false);

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const dispatch = useDispatch();

  const handleWorkTypeChange = (event) => {
    setWorkType(event.target.value);
  };

  const handleCouncilChange = (event) => {
    setCouncil(event.target.value);
  };

  const handleUserChange = (event) => {
    setUser(event.target.value);
  };

  const reportValues = [
    {
      value: 'by_work_types',
      label: 'By Work Type',
    },
    {
      value: 'by_councils',
      label: 'By Councils',
    },
    {
      value: 'by_users',
      label: 'By Users',
    },
    {
      value: 'by_councils',
      label: 'Team CZW',
    },
    {
      value: 'team_allocation',
      label: 'Team-User Allocation',
    },
  ];

  const { workReports, pageInfo, userByRoleID } = useSelector((state) => ({
    workReports: state.workReports.workReports,
    pageInfo: state.workReports.pageInfo,
    userByRoleID: state.users.userByRoleID,
  }));
  console.log('userByRoleID', userByRoleID);
  const handleTypeChange = (event) => {
    console.log('work type Check');
    console.log('eventtype check', event.target.value);
    setReportType(event.target.value);
    console.log('value', event.target.value);
    if (event.target.value === 'by_work_types') {
      setShowWorkTypeTable(true);
      setShowTable(false);
      setTeamczw(false);
      setShowListUser(false);
      setTeamAllocation(false);
    } else if (event.target.value === 'by_councils') {
      setShowTable(true);
      setTeamczw(false);
      setShowWorkTypeTable(false);
      setShowListUser(false);
      setTeamAllocation(false);
    } else if (event.target.value === 'by_users') {
      setShowListUser(true);
      setShowTable(false);
      setTeamczw(false);
      setShowWorkTypeTable(false);
      setTeamAllocation(false);
    } else if (event.target.value === 'team_czw') {
      setShowListUser(false);
      setShowTable(false);
      setTeamczw(true);
      setShowWorkTypeTable(false);
      setTeamAllocation(false);
    } else if (event.target.value === 'team_allocation') {
      setTeamAllocation(true);
      setShowListUser(false);
      setShowTable(false);
      setShowWorkTypeTable(false);
      setTeamczw(false);
    }
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const FilterSchema = Yup.object().shape({
    reportType: Yup.string().required('Please select report type'),

    toDateForm: Yup.string().required('Please select from date'),
    fromDateForm: Yup.string().required('Please select to date'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      reportType: '',
      // councilForm: councilID || "",
      userByForm: userBy || '',
      toDateForm: '',
      fromDateForm: '',
    },
    validationSchema: FilterSchema,
    onSubmit: (value) => {
      console.log('in submit');
      console.log('VALUE', value);
      // setState({ ...state, "right": false });
      const convertedFromDate = value.fromDateForm.split('-').reverse().join('-');
      const convertedToDate = value.toDateForm.split('-').reverse().join('-');
      if (value.reportType === 'by_work_types') {
        dispatch(GetWorkTypeWorkReports(value.reportType, value.userByForm, convertedFromDate, convertedToDate, 1, 10));
      } else {
        dispatch(GetWorkReports(value.reportType, value.userByForm, convertedFromDate, convertedToDate, 1, 10));
      }

      setFromDate(convertedFromDate);
      setTodate(convertedToDate);
      setReportType(value.reportType);

      if (value.reportType === 'by_work_types') {
        setShowWorkTypeTable(true);
        setShowMessage(false);
        setShowTable(false);
        setShowListUser(false);
        setTeamAllocation(false);
      } else if (value.reportType === 'by_councils') {
        setShowTable(true);
        setShowMessage(false);
        setShowWorkTypeTable(false);
        setShowListUser(false);
        setTeamAllocation(false);
      } else if (value.reportType === 'team_czw') {
        setShowTable(true);
        setShowMessage(false);
        setShowWorkTypeTable(false);
        setShowListUser(false);
        setTeamAllocation(false);
      } else if (value.reportType === 'by_users') {
        setShowListUser(true);
        setShowMessage(false);
        setShowTable(false);
        setShowWorkTypeTable(false);
        setTeamAllocation(false);
      } else if (value.reportType === 'team_allocation') {
        setTeamAllocation(true);
        setShowListUser(false);
        setShowMessage(false);
        setShowTable(false);
        setShowWorkTypeTable(false);
      }
    },
  });

  const handleUserByChange = (event) => {
    setUserBy(event.target.value);
  };

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  return (
    <div>
      <Page title="Maps">
        <Container>
          <div role="presentation">
            <Breadcrumbs aria-label="breadcrumb" style={{ color: '#000000' }} separator=">">
              <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                Reports
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                Work Reports
              </Typography>
              {showTable ? (
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  Council Report
                </Typography>
              ) : showListUser ? (
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  User Report
                </Typography>
              ) : showWorkTypeTable ? (
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  Work Report
                </Typography>
              ) : teamAllocation ? (
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  Team Allocation Report
                </Typography>
              ) : teamCzw ? (
                <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                  Team CZW
                </Typography>
              ) : (
                ''
              )}
            </Breadcrumbs>
          </div>
          <Button
            variant="outlined"
            sx={{
              justifyContent: 'end',
              display: 'flex',
              position: 'fixed',
              right: 0,
              top: '100px',
              border: '2px solid black',
              backgroundColor: 'black',
              zIndex: '999',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'black',
                border: '2px solid black',
              },
            }}
            onClick={toggleDrawer('right', true)}
          >
            <FilterAltRoundedIcon sx={{ color: 'white' }} />
          </Button>
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
                    id="reportType"
                    label="Report Type"
                    displayempty
                    value={reportType}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // placeholder='*Status'
                    onChange={handleTypeChange}
                    // onChange={handleAddedByChange}
                    error={Boolean(touched.reportType && errors.reportType)}
                    helperText={touched.reportType && errors.reportType}
                    {...getFieldProps('reportType')}
                  >
                    <MenuItem disabled value="">
                      <em>Select Report Type</em>
                    </MenuItem>
                    {reportValues?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  {reportType.team_allocation ? (
                    <Grid item xs={12}>
                      <TextField
                        select
                        id="userBy"
                        label="User"
                        displayEmpty
                        value={userBy}
                        style={{ width: '100%', marginTop: 5 }}
                        size="small"
                        // placeholder='*Status'
                        onChange={(e) => {
                          handleUserByChange(e);
                          formik.handleChange(e);
                        }}
                        // onChange={handleAddedByChange}
                        // error={Boolean(touched.addedByForm && errors.councilForm)}
                        //   helperText={touched.councilForm && errors.councilForm}
                        // {...getFieldProps("addedByForm")}
                      >
                        <MenuItem disabled value="">
                          <em>Select User </em>
                        </MenuItem>
                        {userByRoleID?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.first_name} {option.last_name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  ) : (
                    <></>
                  )}
                </Grid>
                {/* {showListUser &&
   <Grid item xs={12}>
             <TextField
              select
              id="council"
              label="Council"
              displayEmpty
              value={council}
              style={{width:'100%',marginTop:5}}
              size="small"
              // placeholder='*Status'
              onChange={handleCouncilChange}
              // onChange={handleAddedByChange}
              // error={Boolean(touched.addedByForm && errors.councilForm)}
              //   helperText={touched.councilForm && errors.councilForm}
                // {...getFieldProps("addedByForm")}
            >
               <MenuItem disabled value="">
            <em>Select Council</em>
            </MenuItem>
            {reportValues?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
} */}
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
                    // }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    inputProps={{ max: todayDate }}
                    error={Boolean(touched.fromDateForm && errors.fromDateForm)}
                    helperText={touched.fromDateForm && errors.fromDateForm}
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
                    error={Boolean(touched.toDateForm && errors.toDateForm)}
                    helperText={touched.toDateForm && errors.toDateForm}
                    {...getFieldProps('toDateForm')}
                  />
                </Grid>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  style={{ width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: 5 }}
                >
                  Get Data
                </Button>
              </Grid>

              {/* <Button variant="contained" style={{marginLeft: 50, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}  onClick={handleSubmit}>Get Data</Button> */}
            </div>
          </Drawer>
          {/* {showWorkType && showCouncil  && showUser && */}

          {/* <UserTypeList/> */}
          {/* } */}
          {showTable && <CouncilList reportType={reportType} fromDate={fromDate} toDate={toDate} />}

          {teamCzw && <Teamczw reportType={reportType} fromDate={fromDate} toDate={toDate} />}

          {showListUser && <UserTypeList reportType={reportType} fromDate={fromDate} toDate={toDate} />}

          {showWorkTypeTable && <WorkTypeList reportType={reportType} fromDate={fromDate} toDate={toDate} />}
          {teamAllocation && <TeamAllocation reportType={reportType} fromDate={fromDate} toDate={toDate} />}
          {showMessage && (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                width: '100%',
                marginTop: 40,
              }}
            >
              <h2>Please Select Filter</h2>
            </div>
          )}
        </Container>
      </Page>
    </div>
  );
}
