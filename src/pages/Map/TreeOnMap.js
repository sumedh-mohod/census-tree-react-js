import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
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
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import DefaultInput from "../../components/Inputs/DefaultInput";

export default function TreeOnMap(props) {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [council, setCouncil] = React.useState('');
    const [editUser,setEditUser] = useState(false);  
    const { isOpen, data } = props;
  
    const councilValue = [
        {
        value : "Kalmeshwar Muncipal Council",
        label : "Kalmeshwar Muncipal Council",
        },
        {
            value : "New Delhi Muncipal Council",
            label : "New Delhi Muncipal Council",
            },
    ]

    const handleCouncilChange = (event) =>{
        setCouncil(event.target.value);
    }
    return (
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open max-width dialog
        </Button> */}
         <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
          Tree On Map
          </Typography>
          </Stack>
          <Grid container spacing={1} style={{marginTop: 5}}>
          <Grid item sm={6}>
            <TextField
              select
              // SelectProps={{
              //   multiple:true
              // }}
              id="role"
              name='role'
              label="Council*"
              value={council}
              displayEmpty
              style={{width:'85.5%', marginLeft: 40,marginTop:5}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleCouncilChange(e)
              }}
              placeholder='Select Role*'
              defaultValue={data? data.council: ""}
              // renderValue={(selected) => {
              //   if (selected?.length === 0) {
              //     return <em>Select Role*</em>;
              //   }
              //   const result = [];
              //   selected?.map((value)=>{
              //     const found = findRole(roles,value);
              //     result.push(found);
              //     return null;
              //   })
              //   return result.join(",");
              // }}

              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Council*</em>;
                }
              }}
            >
               <MenuItem disabled value="">
            <em>Select Councils</em>
          </MenuItem>
              {councilValue?.map((option) => (
                <MenuItem key={option.id} value={option.label}>
                  {/* {option.role} */}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="Start Date*"
                placeholder='Start Date*'
                // defaultValue="2017-05-24"
                style={{width: '86.5%', marginLeft: 40,marginTop:5}}
                // className={classes.textField}
                // error={Boolean(touched.dob && errors.dob)}
                // helperText={touched.dob && errors.dob}
                // {...getFieldProps("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
            </Grid>
            <Grid container spacing={1} style={{marginTop: 5}}>
            <Grid item xs={6}>
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="Start Date*"
                placeholder='Start Date*'
                // defaultValue="2017-05-24"
                style={{width: '86.5%', marginLeft: 40,marginTop:5}}
                // className={classes.textField}
                // error={Boolean(touched.dob && errors.dob)}
                // helperText={touched.dob && errors.dob}
                // {...getFieldProps("dob")}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
          <Grid item sm={6}>
          <DefaultInput
                  fullWidth
                  id="zone"
                  autoComplete="zone"
                  label="zone*"
                  placeholder="Zone*"
                  style={{width:'85.5%', marginLeft: 40,marginTop:5}}
                //   error={Boolean(touched.caste && errors.caste)}
                // helperText={touched.caste && errors.caste}
                // {...getFieldProps("caste")}
                />
            </Grid>
            <Grid container spacing={1} style={{marginTop: 5}}>
            <Grid item sm={6}>
          <DefaultInput
                  fullWidth
                  id="ward"
                  autoComplete="ward"
                  label="ward*"
                  placeholder="ward*"
                  style={{width:'85.5%', marginLeft: 40,marginTop:5}}
                //   style={{width:'87.5%', marginLeft: 40,marginTop:5}}
                //   error={Boolean(touched.caste && errors.caste)}
                // helperText={touched.caste && errors.caste}
                // {...getFieldProps("caste")}
                />
            </Grid>

            <Grid item sm={6}>
            <Button variant="contained" style={{marginLeft: 40, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}>Get Data</Button>
            </Grid>
            </Grid>
            </Grid>
        </div>
               )
              }