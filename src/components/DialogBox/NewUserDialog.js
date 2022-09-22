import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
// import Typography from '@mui/material/Typography';
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DateRangePicker } from '@mui/x-date-pickers-pro/DateRangePicker';
// import Box from '@mui/material/Box';
import DefaultInput from '../Inputs/DefaultInput';

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

export default function NewUserDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [status, setStatus] = React.useState('Status')
  const [gender, setGender] = React.useState('');
  const [religion, setReligion] = React.useState('');
  const [caste, setCaste] = React.useState('');
  const [whoseReference, setWhoseReference] = React.useState('');
  const [bloodGrp, setBloodGrp] = React.useState('');
  const[district, setDistrict]=  React.useState('');
  const[Role, setRole]=  React.useState('');
  const [agreementDone, setAgreementDone] = React.useState('');
  const [documentProvided, setDocumentProvided] = React.useState('');
  const [applicableDeducation, setApplicableDeducation] = React.useState('');
  const [value, setValue] = React.useState(null);
  const { isOpen, data } = props;

  const genderValue = [
    {
      value: 'male',
      label: 'Male',
    },
    {
      value: 'female',
      label: 'Female',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const whoseReferenceValue = [
    {
      value: 'nikhil',
      label: 'Nikhil',
    },
    {
      value: 'rehan',
      label: 'Rehan',
    },
    {
      value: 'ashwin',
      label: 'Ashwin',
    },
  ];
  const statusValue = [
    {
      value: 'active',
      label: 'Active',
    },
    {
      value: 'inactive',
      label: 'InActive',
    },
  ];
  const DistrictValue = [
    {
      value: 'akola',
      label: 'Akola',
    },
    {
      value: 'amravati',
      label: 'Amravati',
    },
  ];
  const religionValue = [
    {
      value: 'hinduism',
      label: 'Hinduism',
    },
    {
      value: 'islam',
      label: 'Islam',
    },
    {
      value: 'buddhism',
      label: 'Buddhism',
    },
    {
      value: 'christianity',
      label: 'Christianity',
    },
  ]

  const CasteValue = [
    {
      value: 'st',
      label: 'ST',
    },
    {
      value: 'OBC',
      label: 'OBC',
    },
    {
      value: 'Brahmins',
      label: 'Brahmins',
    },
    {
      value: 'Dalit',
      label: 'Dalit',
    },
  ]

  const agreementValue =[ 
    {
      value: 'yes',
      label: 'Yes',
    },
    {
      value: 'no',
      label: 'No',
    },
  ]

  const BloodGroupValue = [
    {
      value: 'A+',
      label: 'A+',
    },
    {
      value: 'B+',
      label: 'B+',
    },
    {
      value: 'A-',
      label: 'A-',
    },
    {
      value: 'B-',
      label: 'B-',
    },
    {
      value: 'AB+',
      label: 'AB+',
    },
    {
      value: 'AB-',
      label: 'AB-',
    },
    {
      value: '0+',
      label: '0+',
    },
  ]

  const documentProvidedValue = [
    {
      value: 'sample1',
      label: 'Sample1',
    },
    {
      value: 'sample2',
      label: 'Sample2',
    },
    {
      value: 'sample3',
      label: 'Sample3',
    },
  ]

  const applicableDeducationValue = [
    {
      value: 'Property Taxes',
      label: 'Property Taxes',
    },
    {
      value: 'Mortgage Interest',
      label: 'Mortgage Interest',
    },
    {
      value: 'Property Deductions',
      label: 'Property Deductions',
    },
  ]

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleReligionChange = (event) => {
    setWhoseReference(event.target.value);
  };
  const handleDocumentProvidedChange = (event) => {
    setDocumentProvided(event.target.value);
  };
  
  const handleApplicableDeducationCange = (event) => {
    setApplicableDeducation(event.target.value);
  };

  const handleBloodGrpChange = (event) => {
    setBloodGrp(event.target.value);
  };
  

  const handleCasteChange = (event) => {
    setCaste(event.target.value);
  };

  const handleClose = () => {
    props.handleClose();
  };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

  const handleAgreementChange = (event) => {
    setAgreementDone(event.target.value);
  };



  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    );
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>Create New User</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="fName"
                autoComplete="fName"
                defaultValue={data? data.fname: ""}
                // type={showPassword ? 'text' : 'password'}
                // label="Name"
                placeholder="First Name"
                // name="name"
                // value="name"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="mName"
                autoComplete="mName"
                defaultValue={data? data.mName: ""}
                // type={showPassword ? 'text' : 'password'}
                // label="Name"
                placeholder="Middle Name"
                // name="name"
                // value="name"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="lName"
                autoComplete="lName"
                defaultValue={data? data.lName: ""}
                // type={showPassword ? 'text' : 'password'}
                // label="Name"
                placeholder="Last Name"
                // name="name"
                // value="name"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="contact"
                autoComplete="contact"
                placeholder="Mobile Number"
                defaultValue={data? data.contact: ""}
                // name="contact"
                // value="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="addressLine1"
                autoComplete="addressLine1"
                placeholder="Address Line 1"
                defaultValue={data? data.addressLine1: ""}
                // name="address"
                // value="address"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="addressLine2"
                autoComplete="addressLine2"
                placeholder="Address Line 2"
                defaultValue={data? data.addressLine2: ""}
                // name="address"
                // value="address"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput fullWidth id="village" autoComplete="village" placeholder="Village/City" 
               defaultValue={data? data.village: ""}
               />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="district"
              // name='District'
              displayEmpty
              defaultValue={data? data.district : ""}
              value={district}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Select District'
            
              onChange={handleDistrictChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>District</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>District</em>
          </MenuItem>
              {DistrictValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput fullWidth id="Email" autoComplete="email" placeholder="Email" 
               defaultValue={data? data.email: ""}
               />
            </Grid>
          
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="aadhar"
                autoComplete="aadhar"
                placeholder="Aadhar Number"
                defaultValue={data? data.aadhar: ""}
                // name="aadhar"
                // value="aadhar"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="education"
                autoComplete="education"
                placeholder="Education"
                defaultValue={data? data.education: ""}
                // name="aadhar"
                // value="aadhar"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
    id="date"
    // label="Date Of Birth"
    type="date"
    placeholder='Date Of Birth'
    // defaultValue="2017-05-24"
    style={{width: "83%", marginLeft: 40}}
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </Grid>
    <Grid item xs={12}>
            <TextField
    id="date"
    // label="Date Of Birth"
    type="date"
    placeholder='Date Of Joining'
    // defaultValue="2017-05-24"
    style={{width: "83%", marginLeft: 40}}
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </Grid>
            {/* <Grid item xs={12}>
            <Typography sx={{ mt: 2, mb: 1 }}>1 calendar </Typography>
        <DateRangePicker
          calendars={1}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
        </Grid> */}
            <Grid item xs={12}>
              <Select
              id="religion"
              name='religion'
              value={religion}
              displayEmpty
              defaultValue={data? data.religion: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Religion'
              onChange={handleReligionChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Religion</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Religion</em>
          </MenuItem>
              {religionValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
              id="caste"
              name='caste'
              value={caste}
              displayEmpty
              defaultValue={data? data.caste: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='aste'
              onChange={handleCasteChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Caste</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Caste</em>
          </MenuItem>
              {CasteValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
              id="diffentlyAbled"
              name='diffentlyAbled'
              value={caste}
              displayEmpty
              defaultValue={data? data.caste: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Caste'
              onChange={handleGenderChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Diffently Abled</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Diffently Abled</em>
          </MenuItem>
              {CasteValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="panCard"
                autoComplete="panCard"
                placeholder="Pan Card"
                defaultValue={data? data.panCard: ""}
                // name="contact"
                // value="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="bankName"
                autoComplete="bankName"
                placeholder="Bank Name"
                defaultValue={data? data.bankName: ""}
                // name="contact"
                // value="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="account"
                autoComplete="account"
                placeholder="Account Number"
                defaultValue={data? data.account: ""}
                // name="contact"
                // value="contact"
              />
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="IFSC"
                autoComplete="IFSC"
                placeholder="IFSC Code"
                defaultValue={data? data.IFSC: ""}
                // name="contact"
                // value="contact"
              />
            </Grid>
            <Grid item xs={12}>
            <TextField
    id="date"
    // label="Date Of Birth"
    type="date"
    placeholder='Last Day Of Work'
    // defaultValue="2017-05-24"
    style={{width: "83%", marginLeft: 40}}
    // className={classes.textField}
    InputLabelProps={{
      shrink: true,
    }}
  />
    </Grid>
            <Grid item xs={12}>
              <Select
              id="agreementDone"
              name='agreementDone'
              value={agreementDone}
              displayEmpty
              defaultValue={data? data.agreementDone: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Agreement Done'
              onChange={handleAgreementChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Agreement Done</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Agreement Done</em>
          </MenuItem>
              {agreementValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <Select
              id="documentProvided"
              name='documentProvided'
              value={documentProvided}
              displayEmpty
              defaultValue={data? data.documentProvided: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Document Provided'
              onChange={handleDocumentProvidedChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Document Provided</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Document Provided</em>
          </MenuItem>
              {documentProvidedValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="commitedSalary"
                autoComplete="commitedSalary"
                placeholder="Commited Salary per Month"
                defaultValue={data? data.commitedSalary: ""}
                // name="contact"
                // value="contact"
              />
              </Grid>
              <Grid item xs={12}>
              <Select
              id="applicableDeducation"
              name='applicableDeducation'
              value={applicableDeducation}
              displayEmpty
              defaultValue={data? data.applicableDeducation: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Applicable Deducation'
              onChange={handleApplicableDeducationCange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Applicable Deduction</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Applicable Deduction</em>
          </MenuItem>
              {applicableDeducationValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="designation"
                autoComplete="designation"
                placeholder="Designation"
                defaultValue={data? data.designation: ""}
                // name="contact"
                // value="contact"
              />
               </Grid>
            <Grid item xs={12}>
              <Select
              id="bloodgrp"
              name='bloodgrp'
              value={bloodGrp}
              displayEmpty
              defaultValue={data? data.bloodgrp: ""}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Blood Group'
              onChange={handleBloodGrpChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Blood Group</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Blood Group</em>
          </MenuItem>
              {BloodGroupValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="emergencycontactName"
                autoComplete="emergencycontactName"
                placeholder="Emergency Contact Name"
                defaultValue={data? data.emergencycontactName: ""}
                // name="contact"
                // value="contact"
              />
          </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="emergencycontactMoNum"
                autoComplete="emergencycontactMoNum"
                placeholder="Emergency Contact Mobile Number"
                defaultValue={data? data.emergencyNum: ""}
                // name="contact"
                // value="contact"
              />
          </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="emergencyNum"
                autoComplete="emergencyNum"
                placeholder="Emergency Number"
                defaultValue={data? data.emergencyNum: ""}
                // name="contact"
                // value="contact"
              />
          </Grid>
            <Grid item xs={12}>
            <Select
              id="whoseReference"
              name='whoseReference'
              value={whoseReference}
              displayEmpty
              style={{width:'83%', marginLeft: 40}}
            
              onChange={handleRoleChange}
              placeholder='Whose Reference'
              defaultValue={data? data.whoseReference: ""}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Whose Reference</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Whose Reference</em>
          </MenuItem>
              {whoseReferenceValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="reference"
                autoComplete="reference"
                placeholder="Reference Name"
                defaultValue={data? data.reference: ""}
                // name="contact"
                // value="contact"
              />
          </Grid>
            <Grid item xs={12}>
            <Select
              id="noticedperiods"
              name='noticedPeriods'
              value={status}
              displayEmpty
              style={{width:'83%', marginLeft: 40}}
              defaultValue={data? data.noticedPeriods: ""}
              onChange={handleRoleChange}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Noticed Periods</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Noticed Periods</em>
          </MenuItem>
              {statusValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="notes"
                autoComplete="notes"
                placeholder="Notes"
                defaultValue={data? data.notes: ""}
                // name="contact"
                // value="contact"
              />
          </Grid>
         </Grid>

        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleClose} >Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
