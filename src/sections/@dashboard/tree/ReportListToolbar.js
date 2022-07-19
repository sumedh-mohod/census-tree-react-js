import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import * as Yup from 'yup';
import moment from 'moment';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';

import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, Select, MenuItem, Grid, Button } from '@mui/material';
// component
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable';
import { GetReports } from '../../../actions/ReportsAction';
import Iconify from '../../../components/Iconify';


// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
}));

// ----------------------------------------------------------------------

ReportListToolbar.propTypes = {
  callType: PropTypes.string,
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  placeHolder:PropTypes.string,
  handleCoucilChange:PropTypes.func,
  handleGetData: PropTypes.func,
  // handleWardChange:PropTypes.func,
  // handleZoneChange:PropTypes.func,
  coucilId:PropTypes.any,
  fromDate:PropTypes.any,
  toDate:PropTypes.any,
  zoneId:PropTypes.any,
  wardId:PropTypes.any
};








export default function ReportListToolbar({numSelected, handleGetData, handleCouncil, councilId }) {
  const dispatch = useDispatch();
  const [coucilId,setCouncilId] = useState('');
  const [councilName, setCouncilName] = useState('');
  const todayDate = moment(new Date()).format('YYYY-MM-DD');
// const { dataValue}= props;
  const handleCouncilChange = (e) =>{
    setCouncilId(e.target.value);
    handleCouncil(e.target.value)
    console.log("handleCouncilChange", e.target.value)
    council.map((value,index)=>{
      if(value.id===e.target.value){
        setCouncilName(value.name);
      }
      return null;
    })
    // councilId(e.target.value)
    console.log("councilName",councilName)
    // setZoneId("")
    // setWardId("")
    // dispatch(GetZonesByCouncilId(1,1000,e.target.value))
    // dispatch(GetWardsByCouncilId(1,1000,e.target.value))
  }
  console.log("councilName",councilName)
console.log("CouncilId", coucilId)


  const DistrictsSchema = Yup.object().shape({
    council: Yup.string().required('Council is required'),
    fromDate: Yup.string().required('From Date is Required'),
    toDate: Yup.string().required('To Date is Required'),
  });
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      council:"",
      fromDate:"",
      toDate:""
    },
    validationSchema: DistrictsSchema,
    onSubmit: (value) => {
      dispatch(GetReports(value.council, "01-01-2020", "30-12-2022"))
      console.log("value", value)
    },
  });




    const {
        council,
        // zones,
        // wards,
        reports,
      } = useSelector((state) => ({
        council:state.council.activeCouncil,
        reports:state.reports.reports,
      }));
console.log("reports123", reports)
console.log("council1234", council)
console.log("Council123", council.name)

const separateId = (id) => {
  council.map((value,index)=>{
    if(value.id===id){
      setCouncilName(value.name);
    }
    return null;
  })
}



const dataValue =  reports?.by_wards;
  const value1= [];
  dataValue?.map((option, index) => {
    const value2 = [index+1]
    value2.push(option.name)
    value2.push(option.census_trees_count)
    value1.push(value2)
    return null
  })


  const TreeName =  reports?.by_tree_names;
  const treeNameValue1 = [];
  TreeName?.map((option, index) => {
    const treeNameValue2 = [index+1]
    treeNameValue2.push(option.name)
    treeNameValue2.push(option.census_trees_count)
    treeNameValue1.push(treeNameValue2)
    return null
  })


  const treeType =  reports?.by_tree_types;
  const treeType1= [];
  treeType?.map((option, index) => {
    const treeType2 = [index+1]
    treeType2.push(option.tree_type)
    treeType2.push(option.census_trees_count)
    treeType1.push(treeType2)
    return null
  })


  const TreeCondition =  reports?.by_tree_conditions;
  const TreeCondition1= [];
  TreeCondition?.map((option, index) => {
    const TreeCondition2 = [index+1]
    TreeCondition2.push(option.condition)
    TreeCondition2.push(option.census_trees_count)
    TreeCondition1.push(TreeCondition2)
    return null
  })


  console.log("dataValue", dataValue)
  console.log("TreeName", TreeName)
  console.log("treeType", treeType)
  // console.log("council1234", councilName)

  const exportPdf = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF()
    doc.text(councilName ,60, 150);
    // doc.({`${council?.name}`})
    // doc.text1("Council Name : ", 20, 10);
    doc.addPage()
    // doc.text("By Wards", 20, 10);
    autoTable(doc, {
     
      head: [['#', 'Wards', 'Counts']],
      // text: ("By Tree Name", 20, 60),
      body: value1
    })
    // doc.text(20, 35, 'By Tree Name');
    autoTable(doc, {
      head: [['#', 'Tree Names', 'Counts']],
      body: treeNameValue1
    })
  

    doc.text(20, 90, 'By Tree Types');
    autoTable(doc, {
      head: [['#', 'Tree Types', 'Counts']],
      body: treeType1
    })

    autoTable(doc, {
      text: ("By Tree Condition", 20, 10),
      head: [['#', 'Tree Conditions', 'Counts']],
      body: TreeCondition1
    })

    doc.save(`${councilName}.pdf`)
  }


const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
    return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
     <Grid item xs={4} justifyContent="flex-end">
           
     <TextField
              select
              id="council"
              name='council'
              label="Select Council*"
              value={coucilId}
              displayEmpty
              style={{width: "180px"}}
              // onChange={handleRoleChange}
              onChange={(e) => {
                handleCouncilChange(e);
                formik.handleChange(e);
              }}
              placeholder='Select council*'
              // defaultValue={data? data.council: ""}
              renderValue={(selected) => {
                if (selected?.length === 0) {
                  return <em>Select Council*</em>;
                }
              }}
              error={Boolean(touched.council && errors.council)}
                helperText={touched.council && errors.council}
                // {...getFieldProps("council")}
            >
               <MenuItem disabled value="">
            <em>Select Councils</em>
          </MenuItem>
              {council?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
              </Grid>
              <Grid item xs={4}>
              <TextField
                id="date"
                // label="Date Of Birth"
                type="date"
                label="From Date*"
                placeholder='From Date*'
                // defaultValue="2017-05-24"
                style={{width: '90.5%',  marginLeft: 20}}
                // className={classes.textField}
                error={Boolean(touched.fromDate && errors.fromDate)}
                helperText={touched.fromDate && errors.fromDate}
                {...getFieldProps("fromDate")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ max: todayDate }}
              />
              </Grid>
              <Grid item xs={4}>
              <TextField
                id="date"
                // value={toDate}
                type="date"
                label="To Date*"
                placeholder= 'To Date*'
                // defaultValue="2017-05-24"
                style={{width: '90.5%', marginLeft: 30}}
                // className={classes.textField}
                error={Boolean(touched.toDate && errors.toDate)}
                helperText={touched.toDate && errors.toDate}
                {...getFieldProps("toDate")}
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{ max: todayDate }}
              />
              </Grid>
              <Grid item sm={4}>
            <Button variant="contained" onClick={handleSubmit} style={{marginLeft: 30, marginTop: 5, backgroundColor: "#008000", height: 50, width: 150}}  >View Report</Button>
            </Grid>

            <Grid item sm={4}>
              {!coucilId ?  
            <Button variant="contained"  onClick= {handleSubmit}   style={{marginLeft: 30, marginTop: 5, height: 50, width: 150}}  >Export Report</Button> :
            <Button variant="contained"  onClick= {exportPdf}   style={{marginLeft: 30, marginTop: 5, height: 50, width: 150}}  >Export Report</Button> }
            </Grid>



         <Grid container justifyContent="flex-end">
          {/* {(callType === "BaseColor")?(
         <h5 style={{marginTop: 10}}>Please select council to get  base color data</h5> 
         ):null} */}
          {/* <Grid item sm={4}>
            <Button variant="contained" onClick={handleSubmit} style={{marginLeft: 30, marginTop: 5, backgroundColor: "#008000", height: 50, width: 100}}  >Get Data</Button>
            </Grid> */}
              </Grid>
   </RootStyle>
  );
}
