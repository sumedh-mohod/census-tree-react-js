import * as React from 'react';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { TextField } from '@mui/material';

import { AddTreeName, EditTreeName } from '../../actions/TreeNameAction';
import { GetActiveTreeType } from '../../actions/TreeTypeActions';
import {GetActiveTreeFamily} from "../../actions/TreeFamilyAction"
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

export default function NameOfTreeDialog(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');
  const [typeOfTree, SetTypeOfTree] = React.useState('');
  const [treeOfFamily, setTreeOfFamily] = React.useState('');
  const [origin, setOrigin] = React.useState('');
  const [seasonStart, setSeasonStart] = React.useState('');
  const [seasonEnd, setSeasonEnd] = React.useState('');
  const [fruitSeason, setFruitSeason] = React.useState('');
  const [fruitSeasonEnd, setFruitSeasonEnd] = React.useState('');
  const [minHeight, setMinHeight] = React.useState('');
  const [maxHeight, setMaxHeight] = React.useState('');
  const [val, setVal] = React.useState([40,80]);
  const [growth, setGrowth]= React.useState('');

  const updateChange =(e, item) =>{
setVal(item)
  }
  
  const { isOpen, data } = props;

  const {
    addTreeNameLog,
    editTreeNameLog,
    treeType,
    treeFamily,

  } = useSelector((state) => ({
    addTreeNameLog:state.treeName.addTreeNameLog,
    editTreeNameLog:state.treeName.editTreeNameLog,
    treeType:state.treeType.activeTreeType,
    treeFamily:state.treeFamily.activeTreeFamily,
  }));

  const treeFamilyValue = [
    {
      value: 'Verbenaceae',
      label: 'Verbenaceae',
    },
    {
      value: 'Proteaceae',
      label: 'Proteaceae',
    },
    {
      value: 'Moraceae',
      label: 'Moraceae',
    },
  ];

  const originValue = [
    {
      value: 'Native',
      label: 'Native',
    },
    {
      value: 'Exotic',
      label: 'Exotic',
    },
  ];

  const Months = [
    {
      value: 'Jan',
      label: 'Jan',
    },
    {
      value: 'Feb',
      label: 'Feb',
    },
    {
      value: 'Mar',
      label: 'Mar',
    },
    {
      value: 'Apr',
      label: 'Apr',
    },
    {
      value: 'May',
      label: 'May',
    },
    {
      value: 'Jun',
      label: 'Jun',
    },
    {
      value: 'July',
      label: 'July',
    },
    {
      value: 'Aug',
      label: 'Aug',
    },
    {
      value: 'Sept',
      label: 'Sept',
    },
    {
      value: 'Oct',
      label: 'Oct',
    },
    {
      value: 'Nov',
      label: 'Nov',
    },
    {
      value: 'Dec',
      label: 'Dec',
    },
  ];

const growthFactorValue = [
    {
      value: 1,
      label: 1
    },
    {
      value: 1.5,
      label: 1.5
    },
    {
      value: 2,
      label: 2,
    },
    {
      value: 2.5,
      label: 2.5
    },
    {
      value: 3,
      label: 3
    },
    {
      value: 3.5,
      label: 3.5,
    },
    {
      value: 4,
      label: 4
    },
    {
      value: 4.5,
      label: 4.5
    },
    {
      value: 5,
      label: 5
    },
    {
      value: 5.5,
      label: 5.5
    },
  ]

  useEffect(()=>{
    dispatch(GetActiveTreeType(1));
    dispatch(GetActiveTreeFamily(1));
  },[])

  useEffect(()=>{
    if(data){
      SetTypeOfTree(data.tree_type_id);
      setTreeOfFamily(data.tree_family_id);
    }
    
  },[data])

  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    props.handleClose();
  },[addTreeNameLog,editTreeNameLog])

const handleStatusChange = (event) => {
SetTypeOfTree(event.target.value);
};
const handleOriginChange = (event) => {
  setOrigin(event.target.value)
}

const handleFamilyChange = (event) => {
  setTreeOfFamily(event.target.value);
  };

  const handleClose = () => {
    props.handleClose();
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
  const handleChange = (event) => {
    setSeasonStart(event.target.value)
  };

  const handleFruitSeasonChange = (event) => {
    setFruitSeason(event.target.value)
  };


  const handleFruitSeasonEnd = (event) => {
    setFruitSeasonEnd(event.target.value)
  }

  const handleSeasonEndChange = (event) => {
    setSeasonEnd(event.target.value)
  }

  const handleMinHeightChange =(event) => {
    setMinHeight(event.target.value)
  }

  const handleMaxHeightChange = (event) => {
    setMaxHeight(event.target.value)
  }



  const DesignationsSchema = Yup.object().shape({
    name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(30,"Maximum length 30 character only").required('Name is required'),
    botanicalName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(30,"Maximum length 30 character only").required('Botanical Name is required'),
    treeType: Yup.string().required('Tree Type is required'),
    treeFamily: Yup.string().required('Tree Family is required'),
    origin: Yup.string().required('origin is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name:data? data.name : "",
      botanicalName: data? data.botanical_name:"",
      treeType: data? data.tree_type_id:"",
      treeFamily: data? data.tree_family_id: "",
      uses:data? data.uses: "",
      origin: data? data.origin: "",
      oxygenEmittrate: data? data.oxygenEmittrate: "",
      floweringSeason: data? data.flowering_season: "",
      minHeight: data? data.min_height: "",
      maxHeightx: data? data.max_heightx: "",
      minAge:data? data.min_age: "",
      maxAge: data? data.max_age: "",
      minGrowth: data? data.min_growth: "",
      maxGrowth: data? data.max_growth: "",
      floweringStart:data? data.flowering_start: "",
      floweringEnd: data? data.flowering_end: "",
      fruitingStart: data? data.fruitingStart: "",
      fruitingEnd: data? data.fruitingEnd: "",
    },
    validationSchema: DesignationsSchema,
    onSubmit: (value) => {
      // console.log("Submit",value
      //  )
       const maxHeight = `${value.minHeight} - ${value.maxHeightx}`
       const maxData= data.max_height.split('-')
       const maxValue= maxData[1]
       console.log("maxValue", maxValue)
       const age = `${value.minAge} - ${value.maxAge} `
       const growthFactor= `${value.minGrowth} - ${value.maxGrowth}`
       const floweringSeason= `${value.floweringStart } - ${value.floweringEnd}`
       const fruitingSeason= `${value.fruitingStart} - ${value.fruitingEnd}`
       console.log("maxHeight", maxHeight)
      //  console.log("maxData", maxData)
      if(data){
        dispatch(EditTreeName({
          "name":value.name,
          "botanical_name":value.botanicalName,
          "tree_type_id":value.treeType,
          "tree_family_id":value.treeFamily,
          "uses":value.uses,
          "origin": value.origin,
          "oxygen_emit_rate": value.oxygenEmittrate,
          // "flowering_season": value.floweringSeason,
          "flowering_season": floweringSeason,
          "fruiting_season": fruitingSeason,
          "max_height" : maxHeight,
          "max_age": age,
          "growth_factor": growthFactor,

        },data.id))
      }
      else {
        dispatch(AddTreeName({
          "name":value.name,
          "botanical_name":value.botanicalName,
          "tree_type_id":value.treeType,
          "tree_family_id":value.treeFamily,
          "uses":value.uses,
          "origin": value.origin,
          "oxygen_emit_rate": value.oxygenEmittrate,
          "flowering_season": floweringSeason,
          "fruiting_season": fruitingSeason,
          "max_height" :maxHeight,
          "max_age": age,
          "growth_factor": growthFactor
        }))
      }
    },
 
  });

 

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

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
        <BootstrapDialogTitle onClose={handleClose}>{data?"Edit Tree Name":"Add Tree Name"}</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Tree Name*</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="nameOfTree"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                {...getFieldProps("name")}
              />
            </Grid>
            <Grid item xs={12}>
            <FormLabel style={{marginLeft: 45, marginTop: 20}}>Botanical Name*</FormLabel>
            <DefaultInput
                fullWidth
                id="botanicalName"
                autoComplete="botanicalName"
                // label="Botanical Name*"
                // placeholder="Enter Botanical Name*"
                error={Boolean(touched.botanicalName && errors.botanicalName)}
                helperText={touched.botanicalName && errors.botanicalName}
                {...getFieldProps("botanicalName")}
              />
            </Grid>
            <Grid item xs={12}>
            <FormLabel style={{marginLeft: 45, marginTop: 20}}>Tree Type*</FormLabel>
            <Select
              // SelectProps={{
              //   multiple:true
              // }}
              id="typeOfTree"
              // label="Tree Type*"
            //   name='status'
            displayEmpty
              value={typeOfTree}
              style={{width:'83%', marginLeft: 40}}
              // placeholder='*Status'
              onChange={handleStatusChange}
              error={Boolean(touched.treeType && errors.treeType)}
                helperText={touched.treeType && errors.treeType}
                {...getFieldProps("treeType")}
            >
               {/* <MenuItem disabled value=""> */}
            {/* <em>Type Of Tree*</em> */}
          {/* </MenuItem> */}
              {treeType?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.tree_type}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <FormLabel style={{marginLeft: 45, marginTop: 20}}>Tree Family*</FormLabel>
            <Select
              // SelectProps={{
              //   multiple:true
              // }}
              id="treeOfFamily"
              // label="Tree Family"
              // name='treeFamily'
            displayEmpty
              value={treeOfFamily}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Tree family'
              onChange={handleFamilyChange}
              error={Boolean(touched.treeFamily && errors.treeFamily)}
                helperText={touched.treeFamily && errors.treeFamily}
                {...getFieldProps("treeFamily")}
            >
               {/* <MenuItem disabled value="">
            <em>Tree Family*</em>
          </MenuItem> */}
              {treeFamily?.map((option) => (
                <MenuItem  key ={option.id}value={option.id}>
                  {option.tree_family}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <FormLabel style={{marginLeft: 45, marginTop: 20}}>Uses*</FormLabel>
            <TextareaAutosize
  aria-label="empty textarea"
  fullWidth
  id="uses"
  // placeholder="Uses"
  // label="Uses"
  error={Boolean(touched.uses && errors.uses)}
  helperText={touched.uses && errors.uses}
  {...getFieldProps("uses")}
  style={{ width: "83%", marginLeft:40, borderRadius: 7, height: 80, paddingTop: 8, paddingLeft: 8, fontFamily: "Public Sans,sans-serif",
  fontWeight: 400, outline: "darkgrey"}}
/>
            </Grid>
            <Grid item xs={12}>
            <FormLabel style={{marginLeft: 45, marginTop: 20}}>Origin*</FormLabel>
            <Select
              // SelectProps={{
              //   multiple:true
              // }}
              id="origin"
              // label="Origin"
              // name='origin'
            displayEmpty
              value={origin}
              style={{width:'83%', marginLeft: 40}}
              // placeholder='Select Origin'
              onChange={handleOriginChange}
              error={Boolean(touched.origin && errors.origin)}
                helperText={touched.origin && errors.origin}
                {...getFieldProps("origin")}
            >
               {/* <MenuItem disabled value="">
            <em>Origin</em>
          </MenuItem> */}
              {originValue?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Oxygen Emittrate(Pound)</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="oxygenEmittrate"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.oxygenEmittrate && errors.oxygenEmittrate)}
                helperText={touched.oxygenEmittrate && errors.oxygenEmittrate}
                {...getFieldProps("oxygenEmittrate")}
              />
            </Grid>
            <FormLabel style={{marginLeft: 48, marginTop: 20}}>Flowering Season</FormLabel>
            <Grid container style={{display:"flex"}}>
            {/* <FormControl> */}
   
      {/* </FormControl> */}
              <Grid item xs={4}>
     
              <Select
          labelId="floweringStart"
          id="floweringStart"
          value={seasonStart}
          displayEmpty
          // label="Age"
          // placeholder="Flowering Season Start"
          onChange={handleChange}
          style={{ marginLeft: 48, width: 120}}
          {...getFieldProps("floweringStart")}
        >
            {/* <MenuItem disabled value="">
            <em>Flowering Season </em>
          </MenuItem> */}
          {Months?.map((option) =>(
             <MenuItem value={option.value} >{option.label}</MenuItem>
          ))}
        </Select>
     
      </Grid>
      <Grid item xs={1}  spacing={2} style={{justifyContent: "center",alignItems:"center" ,marginTop: 20, marginX: "auto"}}>
      —
      </Grid>
       
              <Grid item xs={4}> 
                <Select
          labelId="floweringEnd"
          id="floweringEnd"
          value={seasonEnd}
          displayEmpty
          // label="Age"
          placeholder="Flowering Season End"
          onChange={handleSeasonEndChange}
          style={{ width: 120}}
          {...getFieldProps("floweringEnd")}
        >
            {/* <MenuItem disabled value="">
            <em>flowring Season</em>
          </MenuItem> */}
          {Months?.map((option) =>(
             <MenuItem value={option.value} >{option.label}</MenuItem>
          ))}
        </Select>
        </Grid>
        </Grid>
            <FormLabel style={{marginLeft: 48, marginTop: 20}}>Fruiting Season</FormLabel>
            <Grid container style={{display:"flex"}}>
            {/* <FormControl> */}
   
      {/* </FormControl> */}
              <Grid item xs={4}>
     
              <Select
          labelId="fruitingStart"
          id="fruitingStart"
          value={fruitSeason}
          displayEmpty
          // label="Age"
          placeholder="fruiting Season"
          onChange={handleFruitSeasonChange}
          {...getFieldProps("fruitingStart")}
          style={{ marginLeft: 48, width: 120}}
        >
            {/* <MenuItem disabled value="">
            <em>fruiting Season</em>
          </MenuItem> */}
          {Months?.map((option) =>(
             <MenuItem value={option.value} >{option.label}</MenuItem>
          ))}
        </Select>
     
      </Grid>
      <Grid item xs={1}  spacing={2} style={{justifyContent: "center",alignItems:"center" ,marginTop: 20, marginX: "auto"}}>
      —
      </Grid>
       
              <Grid item xs={4}> 
                <Select
          labelId="fruitingEnd"
          id="fruitingEnd"
          value={fruitSeasonEnd}
          displayEmpty
          // label="Age"
          placeholder="fruiting Season"
          onChange={handleFruitSeasonEnd}
          {...getFieldProps("fruitingEnd")}
          style={{  width: 120}}
        >
            {/* <MenuItem disabled value="">
            <em>fruiting Season</em>
          </MenuItem> */}
          {Months?.map((option) =>(
             <MenuItem value={option.value} >{option.label}</MenuItem>
          ))}
        </Select>
        </Grid>
        </Grid>
        <FormLabel style={{marginLeft: 48, marginTop: 20}}>Growth Factor (ft/yr)</FormLabel>
            <Grid container style={{display:"flex"}}>
            {/* <FormControl> */}
   
      {/* </FormControl> */}
              <Grid item xs={4}>
              <TextField
          id="minGrowth"
          style={{  width: 120, marginLeft: 48}}
          autoComplete="current-password"
          {...getFieldProps("minGrowth")}
          
        />
          </Grid>
      <Grid item xs={1}  spacing={2} style={{justifyContent: "center",alignItems:"center" ,marginTop: 20, marginX: "auto"}}>
      —
      </Grid>
          <Grid item xs={4}>
          <TextField
          id="maxGrowth"
          style={{  width: 120}}
          {...getFieldProps("maxGrowth")}
        />
          </Grid>
          </Grid>
          <FormLabel style={{marginLeft: 48, marginTop: 20}}>Maximum Height (M)</FormLabel>
            <Grid container style={{display:"flex"}}>
            {/* <FormControl> */}
   
      {/* </FormControl> */}
              <Grid item xs={4}>
              <TextField
          id="minHeight"
          value={minHeight}
          onChange={handleMinHeightChange}
          // label="Password"
          style={{  width: 120, marginLeft: 48}}
          {...getFieldProps("minHeight")}
        />
          </Grid>
      <Grid item xs={1}  spacing={2} style={{justifyContent: "center",alignItems:"center" ,marginTop: 20, marginX: "auto"}}>
      —
      </Grid>
          <Grid item xs={4}>
          <TextField
          id="maxHeightx"
          value={maxHeight}
          onChange={handleMaxHeightChange}
          // label="Password"

          style={{  width: 120}}
          {...getFieldProps("maxHeightx")}
        />
          </Grid>
          </Grid>
          <FormLabel style={{marginLeft: 48, marginTop: 20}}>Maximum age (Year)</FormLabel>
            <Grid container style={{display:"flex"}}>
            {/* <FormControl> */}
   
      {/* </FormControl> */}
              <Grid item xs={4}>
              <TextField
          id="minAge"
          // label="Password"
          style={{  width: 120, marginLeft: 48}}
          {...getFieldProps("minAge")}
        />
          </Grid>
      <Grid item xs={1}  spacing={2} style={{justifyContent: "center",alignItems:"center" ,marginTop: 20, marginX: "auto"}}>
      —
      </Grid>
          <Grid item xs={4}>
          <TextField
          id="maxAge"
          style={{  width: 120}}
          {...getFieldProps("maxAge")}
        />
          </Grid>
          </Grid>
          </Grid>

        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}>{data?"Save":"Add"}</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}

