import React, { useState } from 'react';
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
import {
  Stack,
  Avatar,
  Checkbox,
} from '@mui/material';
import CancelIcon from '@mui/icons-material/Cancel';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DefaultInput from '../components/Inputs/DefaultInput';

export default function NewUserForm(props) {
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [gender, setGender] = React.useState('');
    const [religion, setReligion] = React.useState('');
    const [caste, setCaste] = React.useState('');
    const [whoseReference, setWhoseReference] = React.useState('');
    const [bloodGrp, setBloodGrp] = React.useState('');
    const[district, setDistrict]=  React.useState('');
    const[role, setRole]=  React.useState('');
    const [agreementDone, setAgreementDone] = React.useState('');
    const [documentProvided, setDocumentProvided] = React.useState('');
    const [applicableDeducation, setApplicableDeducation] = React.useState('');
    const [designation, setDesignation] =  React.useState('');
    const [value, setValue] = React.useState(null);
    const [referredBy, setReferredBy] = React.useState('');
    const [noticePeriod, setNoticePeriod] = React.useState('');
    const [formValues, setFormValues] = useState([{ deductionType: "", amount : ""}])
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

   const roleValue = [
      {
        value: 'Admin',
        label: 'Admin',
      },
      {
        value: 'Super Admin',
        label: 'Super Admin',
    },
    ]

    const designationValue = [
      {
        value: 'Admin',
        label: 'Admin',
      },
      {
        value: 'Super Admin',
        label: 'Super Admin',
    },
    ]

    const referredByValue = [
      {
        value: 'Admin',
        label: 'Admin',
      },
      {
        value: 'Super Admin',
        label: 'Super Admin',
    },
    ]

    const noticePeriodValue =[
      {
        value: 'yes',
        label: 'Yes',
      },
      {
        value: 'no',
        label: 'No',
    },
    {
      value: 'partially',
      label: 'partially',
  },
    ]
    const talukaValue =[
      {
        value: 'Kalameshwar',
        label: 'Kalameshwar',
      },
      {
        value: 'Ramtek',
        label: 'Ramtek',
      },
      {
        value: 'Katol',
        label: 'Katol',
      },
    ]
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


    const array1 = [{ }];
    const array2= [{ }];

//   const addFormFields = () => {
//     setFormValues([...formValues, { deductionType: "", amount : "" }])
//  }

//  const handleChange = (i, e) => {
//   let newFormValues = [...formValues];
//   newFormValues[i][e.target.name] = e.target.value;
//   setFormValues(newFormValues);
// }

 const removeFormFields = (i) => {
  const newFormValues = [...formValues];
  newFormValues.splice(i, 1);
  setFormValues(newFormValues)
}
    const handleNoticePeriodChange = (event) => {
      setNoticePeriod(event.target.value);
    };

    const handleTalukaChange = (event) => {
      setNoticePeriod(event.target.value);
    };
  
    const handleRoleChange = (event) => {
      setRole(event.target.value);
    };

    const handleReferredChange = (event) => {
      setReferredBy(event.target.value);
    };

    const handleDesignationChange = (event) => {
      setDesignation(event.target.value);
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
      setReferredBy(event.target.value);
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
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Create Users
          </Typography>
          </Stack>
          <Grid container spacing={1}>
          <Grid item sm={6}>
            <Select
              id="role"
              name='role'
              value={role}
              displayEmpty
              style={{width:'87.5%', marginLeft: 40}}
            
              onChange={handleRoleChange}
              placeholder='Select Role'
              defaultValue={data? data.role: ""}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Role</em>;
                }
                return selected
              }}
            >
               <MenuItem disabled value="">
            <em>Select Role</em>
          </MenuItem>
              {roleValue.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            </Grid>
            {/* <Typography variant="h5" style={{display: 'flex', justifyContent: "left", marginTop: 5}} gutterBottom>
            Personal Details
          </Typography> */}
           <Typography variant="h5" style={{marginTop: 10, marginLeft: 40}} gutterBottom>
           Personal Details
          </Typography>
            <Grid container spacing={1}>
            <Grid item xs={6}>
                <DefaultInput
                  fullWidth
                  // style={{width: '53%'}}
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <DefaultInput fullWidth id="village" autoComplete="village" placeholder="Village/City" 
                 defaultValue={data? data.village: ""}
                 />
              </Grid>
              <Grid item xs={6}>
              <Select
                id="district"
                // name='District'
                displayEmpty
                defaultValue={data? data.district : ""}
                value={district}
                style={{width: '87.5%', marginLeft: 40}}
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <DefaultInput fullWidth id="Email" autoComplete="email" placeholder="Email" 
                 defaultValue={data? data.email: ""}
                 />
              </Grid>
            
              <Grid item xs={6}>
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
              <TextField
      id="date"
      // label="Date Of Birth"
      type="date"
      placeholder='Date Of Birth'
      // defaultValue="2017-05-24"
      style={{width: '87.5%', marginLeft: 40}}
      // className={classes.textField}
      InputLabelProps={{
        shrink: true,
      }}
    />
      </Grid>
      </Grid>
      <Grid container spacing={1} style={{marginTop: 5}}>
      <Grid item xs={6}>
      <Select
                id="religion"
                name='religion'
                value={religion}
                displayEmpty
                defaultValue={data? data.religion: ""}
                style={{width: '87.5%', marginLeft: 40}}
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
              <Grid item xs={6}>
                <Select
                id="caste"
                name='caste'
                value={caste}
                displayEmpty
                defaultValue={data? data.caste: ""}
                style={{width: '87.5%', marginLeft: 40}}
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
                <Select
                id="diffentlyAbled"
                name='diffentlyAbled'
                value={caste}
                displayEmpty
                defaultValue={data? data.caste: ""}
                style={{width: '87.5%', marginLeft: 40}}
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
              <Grid item xs={6}>
                <Select
                id="bloodgrp"
                name='bloodgrp'
                value={bloodGrp}
                displayEmpty
                defaultValue={data? data.bloodgrp: ""}
                style={{width: '87.5%', marginLeft: 40}}
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
            </Grid>
            <Typography variant="h5" style={{marginTop: 10, marginLeft: 40}} gutterBottom>
            Joining and Salary Details:
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
              <TextField
      id="date"
      type="date"
      placeholder='Date Of Joining'
      style={{width: '87.5%', marginLeft: 40}}
      InputLabelProps={{
        shrink: true,
      }}
    />
    </Grid>
    <Grid item xs={6}>
    <Select
                id="designation"
                name='designation'
                value={designation}
                displayEmpty
                defaultValue={data? data.designation: ""}
                style={{width: '87.5%', marginLeft: 40}}
                placeholder='Blood Group'
                onChange={handleDesignationChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Designation</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>Designation</em>
            </MenuItem>
                {designationValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
                 </Grid>
                 <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
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
                 <Grid item xs={6}>
                <Select
                id="referredBy"
                name='referredBy'
                value={referredBy}
                displayEmpty
                defaultValue={data? data.referredBy: ""}
                style={{width: '87.5%', marginLeft: 40}}
                placeholder='Referred By'
                onChange={handleReferredChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Referred By</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>Referred By</em>
            </MenuItem>
                {referredByValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
                </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
                 <DefaultInput
                  fullWidth
                  id="lastDayOfWork"
                  autoComplete="lastDayOfWork"
                  placeholder="Last Day Of Work"
                  defaultValue={data? data.lastDayOfWork: ""}
                  // name="contact"
                  // value="contact"
                />
                </Grid>
                <Grid item xs={6}>
              <Select
                id="noticedperiods"
                name='noticedPeriods'
                value={noticePeriod}
                displayEmpty
                style={{width: '87.5%', marginLeft: 40}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={handleNoticePeriodChange}
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
                {noticePeriodValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
                </Grid>
                <Grid container spacing={1} style={{marginTop: 5}}>
                   <Grid item xs={6}>
                 <DefaultInput
                  fullWidth
                  id="note"
                  autoComplete="note"
                  placeholder="Note"
                  defaultValue={data? data.note: ""}
                  // name="contact"
                  // value="contact"
                />
                </Grid>
                </Grid>
                <Typography  style={{marginTop: 10, marginLeft: 40}} variant="h5" gutterBottom>
            Bank Details
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                </Grid>
                <Typography variant="h5" style={{marginTop: 10, marginLeft: 40}} gutterBottom>
           Login Details
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="userName"
                  autoComplete="userName"
                  placeholder="User Name"
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
              </Grid>
              <Grid item xs={6}>
              <DefaultInput
                  fullWidth
                  id="password"
                  autoComplete="password"
                  placeholder="Password"
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
              </Grid>
              </Grid>
                <Typography variant="h5" style={{marginTop: 15, marginLeft: 40}} gutterBottom>
                Applicable Deducation
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={5}>
              <Select
                id="pf"
                name='pf'
                value={noticePeriod}
                displayEmpty
                style={{width: '87.5%', marginLeft: 40}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={handleNoticePeriodChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>PF</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>PF</em>
            </MenuItem>
                {noticePeriodValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  id="panCard"
                  autoComplete="panCard"
                  placeholder="12"
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
              </Grid>
              <Grid item xs={2}>
            
                <IconButton color='error' aria-label="delete" size="large">
                <CancelIcon fontSize="inherit" />
              </IconButton>
                
       
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
                    <Grid item xs={5}>
                    <Select
                      id="pf"
                      name='pf'
                      // value={ded}
                      displayEmpty
                      style={{ width: '87.5%', marginLeft: 40 }}
                      defaultValue={data ? data.deductionType : ""}
                      onChange={handleNoticePeriodChange}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Deducation Type</em>;
                        }
                        return selected;
                      } }
                    >
                      <MenuItem disabled value="">
                        <em>Deducation Type</em>
                      </MenuItem>
                      {noticePeriodValue.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>))}
                    </Select>
                  </Grid>
                  <Grid item xs={5}>
                      <TextField
                        fullWidth
                        id="amount"
                        autoComplete="amount"
                        placeholder="Amount/Type" />
                    </Grid>
            
              <Grid item xs={2}>
        <IconButton color='success' aria-label="add" size="large">
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
              </Grid>
              </Grid>
              <Typography variant="h5" style={{marginTop: 10, marginLeft: 40}} gutterBottom>
           Upload Document
          </Typography>
          <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={5}>
              <Select
                id="aadharCard"
                name='aadharCard'
                value={noticePeriod}
                displayEmpty
                style={{width: '87.5%', marginLeft: 40}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={handleNoticePeriodChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Aadhar Card</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>Aadhar Card</em>
            </MenuItem>
                {noticePeriodValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  id="amount"
                  autoComplete="amount"
                  placeholder="Choose file"
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
              </Grid>
              <Grid item xs={2}>
              <IconButton color='error' aria-label="delete" size="large">
        <CancelIcon fontSize="inherit" />
      </IconButton>
              </Grid>
              </Grid>
              <Grid container spacing={1} style={{marginTop: 5}}>
              <Grid item xs={5}>
              <Select
                id="AadharCard"
                name='AadharCard'
                value={noticePeriod}
                displayEmpty
                style={{width: '87.5%', marginLeft: 40}}
                defaultValue={data? data.noticedPeriods: ""}
                onChange={handleNoticePeriodChange}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Document Type</em>;
                  }
                  return selected
                }}
              >
                 <MenuItem disabled value="">
              <em>Document Type</em>
            </MenuItem>
                {noticePeriodValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              </Grid>
              <Grid item xs={5}>
              <TextField
                  fullWidth
                  id="amount"
                  autoComplete="amount"
                  placeholder="Choose file"
                  // defaultValue={data? data.panCard: ""}
                  // name="contact"
                  // value="contact"
                />
              </Grid>
              <Grid item xs={2}>
              <IconButton color='success' aria-label="add" size="large">
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
              </Grid>
              </Grid>

              <Button variant="text" style={{display:"flex", fontSize: 15,  marginTop: 20, alignSelf:"end", marginLeft:" 90%"}} onClick={handleClose}>Add</Button>    
            {/* <Button >Add</Button> */}
        </div>
    );
  }
  