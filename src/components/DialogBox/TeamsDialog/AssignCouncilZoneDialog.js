import React, { useEffect } from 'react';
import * as Yup from 'yup';
import CircularProgress from '@mui/material/CircularProgress';

import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
// import MenuItem from '@mui/material/MenuItem';
import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { AddCZWToTeam } from '../../../actions/TeamsAction';
import { ShowLoader , ShowLoadingButton} from '../../../actions/CommonAction';
import AssignNewZoneWardConfirmationDialog from './AssignNewZoneWardConfirmationDialog';
import { GetActiveCouncil } from '../../../actions/CouncilAction';
import { GetZones, GetActiveZones, GetActiveZonesByCouncilId } from '../../../actions/ZonesAction';
import { GetWards, GetActiveWards, GetActiveWardsByCouncilId } from '../../../actions/WardsActions';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
  
}));

const Input = styled('input')({
  display: 'none',
});

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;
  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function AssignCouncilZoneDialog(props) {
  
  const dispatch = useDispatch();
  
  const CouncilNameValue = [
    {
      value: 'liberty Council',
      label: 'Liberty Council',
    },
    {
      value: 'Board of Eternity',
      label: 'Board of Eternity',
    },
    {
      value: 'Living Council',
      label: 'Living Council',
    },
  ];
  const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
  ];
  
  const { isOpen, data, isOpenConfirm,teamId } = props;
  const [open, setOpen] = React.useState(false);
  const [gender, setGender] = React.useState('');
  const [councilName, setCouncilName] = React.useState('');
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [ZoneName, setZoneName] = React.useState([]);
  const [WardName, setWardName] = React.useState([]);
  const [topModalOpen, setTopModalOpen] = React.useState(false);
  const [reqObj, setReqObj] = React.useState(null)
  const [id, setId] = React.useState(null)
  const [showSubMenu, setShowSubMenu] = React.useState(false)
  const [showInitial, setShowInitial] = React.useState(false)
  
  const {
    council,
    zones,
    wards,
    activeZonesByCID,
    activeWardsByCID,
    assignCWZToTeamLog,
    deleteCWZFromteamLog,
    showLoader,
    alerts,
    showLoadingButton

  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    zones:state.zones.activeZones,
    wards:state.wards.activeWards,
    activeWardsByCID:state.wards.activeWardsByCID,
    activeZonesByCID:state.zones.activeZonesByCID,
    assignCWZToTeamLog:state.teams.assignCWZToTeamLog,
    deleteCWZFromteamLog:state.teams.deleteCWZFromteamLog,
    showLoader: state.common.showLoader,
    alerts: state.alerts,
    showLoadingButton: state.common.showLoadingButton,
    
  }));

  useEffect(()=>{
    dispatch(GetActiveCouncil(1));
    
  },[])

  useEffect(()=>{
    if(data){
      setShowSubMenu(true);
      dispatch(GetActiveZones(1));
      dispatch(GetActiveWards(1));
    }
  },[data])


  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setShowInitial(false);
    props.handleClose()
  },[assignCWZToTeamLog])
  
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };
  const handleCouncilName = (event) => {
    dispatch(GetActiveZonesByCouncilId(1,event.target.value))
    dispatch(GetActiveWardsByCouncilId(1,event.target.value))
    setShowSubMenu(true);
    setCouncilName(event.target.value);
    setShowInitial(true)
  };
  const handleConfirmationDialogClick = () => {
    setOpen(open)
  }
  const handleClose = () => {
    setShowInitial(false);
    props.handleClose();
  };
  const handleZoneChange = (event) => {
    setZoneName(event.target.value);
  };

  const handleWardChange = (event) => {
    setWardName(event.target.value);
  };

  const DistrictsSchema = Yup.object().shape({
    council: Yup.string().required('Council is required'),
    zones: Yup.string().required('Zone is required'),
    wards: Yup.string().required('Ward is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      council:data? data.council_id : "",
      // eslint-disable-next-line no-nested-ternary
      zones:data?showInitial?"":data.zone_id:"",
      // eslint-disable-next-line no-nested-ternary
      wards:data?showInitial?"": data.ward_id:""
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      handleTopModalClose();

      if(data){
        setReqObj({
          "name":value.districts,
          "state_id":value.state
        })
  
        setId(data.id);
      }

      else {

        setReqObj({
          "team_id": teamId,
          "council_id": value.council,
          "zone_id": value.zones,
          "ward_id": value.wards
        })
      }
      

      // if(data){
      //   dispatch(AddCZWToTeam({
      //     "name":value.districts,
      //     "state_id":value.state
      //   },data.id))
      // }
      // else {
      //   dispatch(AddCZWToTeam({
      //     "team_id": teamId,
      //     "council_id": value.council,
      //     "zone_id": value.zones,
      //     "ward_id": value.wards
      //   }))
      // }
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps,handleChange } = formik;
  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})
const classes = useStyles()

  const handleTopModalClose = () => {
    setTopModalOpen(!topModalOpen)
  }

  const handleTopModalAnswer = (answer) => {
    if(answer){
      if(data){
        dispatch(ShowLoadingButton(true));
           dispatch(AddCZWToTeam(reqObj,id))
      }
      else {
        dispatch(AddCZWToTeam(reqObj))
        dispatch(ShowLoadingButton(true));
      }
    }
    setTopModalOpen(!topModalOpen)  
  }

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
     <AssignNewZoneWardConfirmationDialog
        isOpenConfirm={topModalOpen}
        handleClose = {(answer)=>handleTopModalAnswer(answer)}
       />
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={handleClose}
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>Assign C-Z-W</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                select
                id="council"
                name="council"
                displayEmpty
                label="Council*"
                value={values.council}
                style={{width:'83%', marginLeft: 40, marginTop:5}}
                defaultValue={data ? data.councilName : ''}
                onChange={(e) => {
                  handleCouncilName(e)
                  formik.handleChange(e);
                }}
                // renderValue={(selected) => {
                //   if (selected.length === 0) {
                //     return <em>Select Council Name</em>;
                //   }
                //   return selected
                // }}
                error={Boolean(touched.council && errors.council)}
                helperText={touched.council && errors.council}
                
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
              >
                 <MenuItem disabled value="">
              <em>Select Council Name*</em>
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
          // multiple
          displayEmpty
          label="Zone*"
          value={ZoneName}
          onChange={handleZoneChange}
          style={{ width: '83%', marginLeft: 40,  marginTop:5 }}
          error={Boolean(touched.zones && errors.zones)}
          helperText={touched.zones && errors.zones}
          {...getFieldProps("zones")}
          // MenuProps={MenuProps}
          // inputProps={{ 'aria-label': 'Without label' }}
          
          inputProps={{
            classes: {
                icon: classes.icon,
            },
        }}
        >
          <MenuItem disabled value="">
            <em>Select Zone*</em>
          </MenuItem>
                {showSubMenu?activeZonesByCID?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
        </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
          select
          displayEmpty
          label="Ward*"
          value={WardName}
          onChange={handleWardChange}
          style={{ width: '83%', marginLeft: 40, marginTop:5}}
          error={Boolean(touched.wards && errors.wards)}
          helperText={touched.wards && errors.wards}
          {...getFieldProps("wards")}
          // MenuProps={MenuProps}
          // inputProps={{ 'aria-label': 'Without label' }}
          
          inputProps={{
            classes: {
                icon: classes.icon,
            },
        }}
        >
          <MenuItem disabled value="">
            <em>Select Ward*</em>
          </MenuItem>
          {showSubMenu?activeWardsByCID?.map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.name}
                  </MenuItem>
                )):null}
        </TextField>
            </Grid>
          </Grid>
        </DialogContent>
        <Divider/>
        <DialogActions>
        <AssignNewZoneWardConfirmationDialog
        // open={open}
        isOpenConfirm={open}
        onClose={handleClose}
        // onClose={handleConfirmationDialogClick}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      />
      {
             showLoadingButton ? (
              <div style={{ display: 'flex',paddingLeft: '150px', alignItems: 'center', marginTop: '15px'}}>
                <CircularProgress  style={{color: '#214c50'}} />
              </div>
            ) :  <Button autoFocus onClick={handleSubmit } style={{ background: '#214c50',color: '#fff'}}>
            Save
          </Button>}
        </DialogActions>
      </Dialog>
      </div>
  );
}
