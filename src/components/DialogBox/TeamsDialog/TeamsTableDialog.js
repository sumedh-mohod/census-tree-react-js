import * as React from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import { TextField, Typography } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import DefaultInput from '../../Inputs/DefaultInput';
import { AddTeam, EditTeam } from '../../../actions/TeamsAction';


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

export default function TeamsTableDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [teamName, setTeamName] = React.useState('');
  const [teamNameError, setTeamNameError] = React.useState('');
  const [teamCode, setTeamCode] = React.useState('');
  const [teamCodeError, setTeamCodeError] = React.useState('');
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [teamType, setTeamType] = React.useState('');
  const { isOpen, data } = props;
  // console.log('teamType',data)

  const { addTeamsLog, editTeamsLog ,showLoadingButton} = useSelector((state) => ({
    addTeamsLog: state.teams.addTeamsLog,
    editTeamsLog: state.teams.editTeamsLog,
    showLoadingButton: state.common.showLoadingButton,
  }));

  const firstRun = React.useRef(true);
  React.useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose();
  }, [addTeamsLog, editTeamsLog]);
  // console.log('editTeamsLog',editTeamsLog);

  React.useEffect(() => {
    setButtonDisabled(false)
  }, [showLoadingButton ]);

  const handleClose = () => {
    props.handleClose();
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleTeamCode = (e) => {
   
  setTeamCode(e.target.value);
  }

  const handleTeamName = (e) => {
   
  setTeamName(e.target.value);
  }

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const DistrictsSchema = Yup.object().shape({
    name: Yup.string().matches(/^[A-Za-z0-9? ,_-]+$/,'Please Enter Team Name In Alphanumeric format Only').max(30, 'Character limit is 30').required('Name is required'),
    code: Yup.string()
      .matches(/^[A-Za-z0-9? ,_-]+$/,'Please Enter Team Code In Alphanumeric format Only')
      .min(4, 'Too Short! need exact 4 character')
      .max(4, 'Too Long! need exact 4 character')
      .required('Team Code required'),
    teamType: Yup.string().required('Team Type is required'),
  });
// console.log('data',data)
  const formik = useFormik({
    
    enableReinitialize: true,
    initialValues: {
      name: data ? data.name : '',
      code: data ? data.team_code : '',
      teamType: data ? data.team_type : '',
    },
    
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      if(!(teamNameError || teamCodeError) ){
        setButtonDisabled(true);
        if (data) {
          dispatch(
            EditTeam(
              {
                name: value.name,
                team_code: value.code,
                team_type: value.teamType,
              },
              data.id
            )
          );
        } else {
          dispatch(
            AddTeam({
              name: value.name,
              team_code: value.code,
              team_type: value.teamType,
            })
          );
        }
      }
      // console.log('name', value.name, 'code', value.code, 'team', teamType);
     
    },
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  const handleTeamTypeChange = (e) => {
    // console.log(e.target.value)
    setTeamType(e.target.value);
  };
  const teamSelect = [
    { id: 1, type: 'base_color', value: 'Base Color' },
    { id: 2, type: 'census', value: 'Census' },
    { id: 3, type: 'offsite_qc', value: 'Offsite QC' },
    { id: 4, type: 'onsite_qc', value: 'Onsite QC' },
  ];
  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})
const classes = useStyles()
  return (
    <div>
      
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}

      >
        <BootstrapDialogTitle onClose={handleClose}>{data ? 'Edit Team' : 'Add Team'}</BootstrapDialogTitle>
        <Divider />
        <DialogContent>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="name"
                name="name"
                autoComplete="teamName"
                label="Team Name*"
                value={values.name}
                placeholder="Team Name*"
                style={{ width: '82.5%',marginLeft: 40, marginTop: 5 }}
                onChange={(e) => {
                  handleTeamName(e);
                  formik.handleChange(e);
                }}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                // {...getFieldProps('name')}
              />
               <Typography variant = "body2" style={{marginLeft: 40, color:"#FF0000"}}>{teamNameError}</Typography>
              <TextField
                fullWidth
                id="code"
                autoComplete="teamCode"
                label="Team Code*"
                placeholder="Team Code*"
                style={{ width: '82.5%',marginLeft: 40, marginTop: 5 }}
                value={values.code}
                onChange={(e) => {
                  handleTeamCode(e);
                  formik.handleChange(e);
                }}
                error={Boolean(touched.code && errors.code)}
                helperText={touched.code && errors.code}
               // {...getFieldProps('code')}
              />
              <Typography variant = "body2" style={{marginLeft: 40, color:"#FF0000"}}>{teamCodeError}</Typography>
              <TextField
                select
                id="Team Type"
                label="Team Type"
                // displayEmpty
                // value={values.teamType}
                style={{ width: '82.5%',marginLeft: 40, marginTop: 5 }}
                
                onChange={(e) => {
                  handleTeamTypeChange(e);
                  // formik.handleChange(e);
                }}
                error={Boolean(touched.teamType && errors.teamType)}
                helperText={touched.teamType && errors.teamType}
                inputProps={{
                  classes: {
                      icon: classes.icon,
                  },
              }}
                {...getFieldProps('teamType')}
                
              >
                <MenuItem disabled value="">
                  <em>Select Team type*</em>
                </MenuItem>
                {teamSelect?.map((option) => (
                  <MenuItem key={option.id} value={option.type}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>

              
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions>
          <LoadingButton loading={buttonDisabled} loadingPosition="end" onClick={handleSubmit} style={{background: '#214c50',color: '#fff'}} >
            {data ? `Save` : `Add`}
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
