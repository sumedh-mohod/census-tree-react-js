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
import { makeStyles } from '@material-ui/core/styles';
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
  const [floweringStart, setFloweringStart] = React.useState('');
  const [floweringEnd, setFloweringEnd] = React.useState('');
  const [fruitingStart, setFruitingStart] = React.useState('');
  const [fruitingEnd, setFruitingEnd] = React.useState('');
  const [minHeight, setMinHeight] = React.useState('');
  const [maxHeight, setMaxHeight] = React.useState('');
  const [val, setVal] = React.useState([40,80]);
  const [growth, setGrowth]= React.useState('');
  const [minHtError, setMinHtError] = React.useState('');
  const [maxHtError, setMaxHtError] = React.useState('');
  const [minAgeError, setMinAgeError] = React.useState('');
  const [maxAgeError, setMaxAgeError] = React.useState('');
  const [minGrthError, setMinGrthError] = React.useState('');
  const [maxGrthError, setMaxGrthError] = React.useState('');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const submitErrors = [];
  let age;
  let height;
  let growthF;
  let flowerSeason;
  let fruitsSeason;
  let minAg;
  let maxAg;
  let maxHt;
  let minHt;
  let maxGro;
  let minGro;
  let frtSt;
  let frtEnd;
  let flwSt;
  let flwEnd;

  const updateChange =(e, item) =>{
setVal(item)
  }
  
  const { isOpen, data } = props;
  // console.log("dataaa", data);

  const {
    addTreeNameLog,
    editTreeNameLog,
    treeType,
    treeFamily,
    showLoadingButton
  } = useSelector((state) => ({
    addTreeNameLog:state.treeName.addTreeNameLog,
    editTreeNameLog:state.treeName.editTreeNameLog,
    treeType:state.treeType.activeTreeType,
    treeFamily:state.treeFamily.activeTreeFamily,
    showLoadingButton: state.common.showLoadingButton,
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

  React.useEffect(() => {
    setButtonDisabled(false)
  }, [showLoadingButton ]);

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

// if(data){
//   if(data?.max_age){
//     const maxAgeData= data.max_age.split('-')
//     minAg= maxAgeData[0];
//     maxAg = maxAgeData[1];
//     // console.log("max age", minAg, maxAg)
//   }
//   if(data?.max_height){
//     const maxHtData= data.max_height.split('-')
//     minHt= maxHtData[0];
//     maxHt = maxHtData[1];
//     // console.log("max ht", minHt, maxHt)
//   }
//   if(data?.growth_factor){
//     const maxGrowData = data.growth_factor.split('-')
//     minGro= maxGrowData[0];
//     maxGro = maxGrowData[1];
//     // console.log("max growth", minGro, maxGro)
//   }
//   if(data?.flowering_season){
//     const flwData= data.flowering_season.split('-')
//     flwSt= flwData[0];
//     flwEnd = flwData[1];
//     // console.log("flowering", flwSt, flwEnd)
//   }
//   if(data?.fruiting_season){
//     const frtData= data.fruiting_season.split('-')
//     frtSt= frtData[0];
//     frtEnd = frtData[1];
    // console.log("fruiting", frtSt, frtEnd)
//   }
// }

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
    setFloweringStart(event.target.value)
  };

  const handleFruitSeasonChange = (event) => {
    setFruitingStart(event.target.value)
  };


  const handleFruitSeasonEnd = (event) => {
    setFruitingEnd(event.target.value)
  }

  const handleSeasonEndChange = (event) => {
    // console.log("iiii");
    setFloweringEnd(event.target.value)
  }

  const handleMinHeightChange =(e) => {
    const  regex = /^[0-9]*$/;
    if(regex.test(e.target.value)) {
      setMinHtError("");
  }
  else{
     setMinHtError("Please Height Containing Digits Only");
    
  }
    setMinHeight(e.target.value)
  }

  const handleMaxHeightChange = (e) => {
    const  regex = /^[0-9]*$/;
    if(regex.test(e.target.value)) {
      setMaxHtError("");
  }
  else{
     setMaxHtError("Please Enter Salary Containing Digits Only");
    
  }
    setMaxHeight(e.target.value)
  }

  const handleSubmitErrors = () =>{
    // console.log("in submit errors");
    // console.log("Formiok submit errors", formik.errors);
    const keys = Object.keys(formik.errors)
    // const roleElement = document.getElementById("role-label");
    // console.log("roleelement", roleElement);
    // roleElement.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" })
    // console.log("keys", keys);
        // Whenever there are errors and the form is submitting but finished validating.
        if (keys.length > 0 ) {
            // We grab the first input element that error by its name.
            const errorElement = document.querySelector(
                `input[name="${keys[0]}"]`
            )
              // console.log(errorElement);
            if (errorElement) {
                // When there is an input, scroll this input into view.
                errorElement.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" })
            }
        }
        else{
          // const roleElement = document.getElementById("role-label");
    // console.log("roleelement", roleElement);
    // roleElement.scrollIntoView({ behavior: 'smooth', block: "center", inline: "center" });
        }
  }


  const DesignationsSchema = Yup.object().shape({
    name: Yup.string().matches(/^[a-zA-Z- _]+$/, "Only alphabets are allowed for this field ").max(30,"Maximum length 30 character only").required('Name is required'),
    botanicalName: Yup.string().matches(/^[a-zA-Z- _]+$/, "Only alphabets are allowed for this field ").max(30,"Maximum length 30 character only").required('Botanical Name is required'),
    treeType: Yup.string().required('Tree Type is required'),
    treeFamily: Yup.string().required('Tree Family is required'),
    origin: Yup.string().required('Origin is required'),
    growthRatio: Yup.string().matches(/^[1-9]\d*(\.\d+)?$/, "Only decimal value are allowed ").required('Growth ratio is required'),
   floweringSeason: Yup.string().matches(/^[a-zA-Z- _!@#$%^&*()_=+';:"/?>.<,-]*$/, "Alphabets are  allowed for this field ").max(45,"Maximum length 45 character only").required('Flowering Season is required'),
    fruitingSeason: Yup.string().matches(/^[a-zA-Z- _!@#$%^&*()_=+';:"/?>.<,-]*$/, "Alphabets are allowed for this field").max(45,"Maximum length 45 character only").required('Fruiting Season is required'),
    height:Yup.string().matches(/^[0-9-!@#$%*?]/, "Only Digits Are Allowed"),
    // maxHeightx:Yup.string().matches(/^[0-9]*$/, "Only Digits Are Allowed"),
    // minAge:Yup.string().matches(/^[0-9]*$/, "Only Digits Are Allowed"),
    // maxAge:Yup.string().matches(/^[0-9]*$/, "Only Digits Are Allowed"),
    // minGrowth:Yup.string().matches(/^[0-9]*$/, "Only Digits Are Allowed"),
    // maxGrowth:Yup.string().matches(/^[0-9]*$/, "Only Digits Are Allowed"),
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
      oxygenEmittrate: data? data.oxygen_emit_rate: "",
     floweringSeason: data? data.flowering_season: "",
     fruitingSeason: data? data.fruiting_season: "",
     growthFactor: data? data.growth_factor: "",
     height: data ? data.max_height: "",
     age: data? data.max_age: "",
      minHeight: data? minHt: "",
      maxHeightx: data? maxHt: "",
      minAge:data? minAg: "",
      maxAge: data? maxAg: "",
      minGrowth: data? minGro: "",
      maxGrowth: data? maxGro: "",
      growthRatio: data? data.growth_ratio : "",
      floweringStart:data? flwSt?.trim(): "",
      floweringEnd: data? flwEnd?.trim(): "",
      fruitingStart: data? frtSt?.trim(): "",
      fruitingEnd: data? frtEnd?.trim(): "",
    },
    validationSchema: DesignationsSchema,
    onSubmit: (value) => {
      // console.log("Submit",value )
      setButtonDisabled(true);
      //  if (value.minHeight || value.maxHeightx){ height = `${value.minHeight} - ${value.maxHeightx}`}
      //  console.log("maxHeight", maxHeight)
      //  let maxValue;
      //  if(data.max_height){
      //  const maxData= data.max_height.split('-')
      //  maxValue= maxData[1]
      //  console.log("maxValue", maxValue)
      //  }
     
      //  if(value.minAge || value.maxAge){ age = `${value.minAge} - ${value.maxAge} `}
      //  if(value.minGrowth || value.maxGrowth) {growthF= `${value.minGrowth} - ${value.maxGrowth}`}
      //  if(value.floweringStart || value.floweringEnd) flowerSeason= `${value.floweringStart } - ${value.floweringEnd}`
      //  if(value.fruitingStart || value.fruitingEnd) fruitsSeason= `${value.fruitingStart} - ${value.fruitingEnd}`
      //  console.log("maxHeight", maxHeight)
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
          "flowering_season": value.floweringSeason,
          "fruiting_season": value.fruitingSeason,
          "max_height" : value.height,
          "max_age": value.age,
          "growth_factor": value.growthFactor,
          "growth_ratio": value.growthRatio,

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
          "flowering_season": value.floweringSeason,
          "fruiting_season": value.fruitingSeason,
          "max_height" :value.height,
          "growth_ratio": value.growthRatio,
          "max_age": value.age,
          "growth_factor": value.growthFactor,
        }))
      }
    },
 
  });

//  console.log("////", floweringStart)
const useStyles = makeStyles({
  icon: {
    fill: '#214c50',
},
});
const classes = useStyles();
  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
  // console.log("valuessss", values)
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
        <Grid item xs={6} md={6} sm={6}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Tree Name*</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="name"
                style={{ width: '86%' }}
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                {...getFieldProps("name")}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6} />
            <Grid item xs={6} md={6} sm={6}>
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
            <TextField
              select
              // SelectProps={{
              //   multiple:true
              // }}
              id="treeType"
              // label="Tree Type*"
            //   name='status'
            displayEmpty
              value={typeOfTree}
              style={{width:'83%', marginLeft: 40}}
              // placeholder='*Status'
              onChange={handleStatusChange}
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
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
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <FormLabel style={{marginLeft: 45, marginTop: 20}}>Tree Family*</FormLabel>
            <TextField
              select
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
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
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
            </TextField>
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
            <TextField
              select
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
              inputProps={{
                classes: {
                    icon: classes.icon,
                },
            }}
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
            </TextField>
            </Grid>
            <Grid item xs={6} md={6} sm={6}>
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
            <Grid item xs={6} md={6} sm={6} />
            <Grid item xs={6} md={6} sm={6}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Flowering Season</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="floweringSeason"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.floweringSeason && errors.floweringSeason)}
                helperText={touched.floweringSeason && errors.floweringSeason}
                {...getFieldProps("floweringSeason")}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6} />
            <Grid item xs={6} md={6} sm={6}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Fruiting Season</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="floweringSeason"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.fruitingSeason && errors.fruitingSeason)}
                helperText={touched.fruitingSeason && errors.fruitingSeason}
                {...getFieldProps("fruitingSeason")}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6} />
            <Grid item xs={6} md={6} sm={6}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Growth Factor(ft/yr)</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="GrowthFactor"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.growthFactor && errors.growthFactor)}
                helperText={touched.growthFactor && errors.growthFactor}
                {...getFieldProps("growthFactor")}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6} />
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Growth Ratio(To Calculate Age)*</FormLabel>
            <Grid item xs={6} md={6} sm={6}>
              <DefaultInput
                fullWidth
                required
                id="GrowthFactor"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.growthRatio && errors.growthRatio)}
                helperText={touched.growthRatio && errors.growthRatio}
                {...getFieldProps("growthRatio")}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6} />
            <Grid item xs={6} md={6} sm={6}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Maximum Height(M)</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="GrowthFactor"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.height && errors.height)}
                helperText={touched.height && errors.height}
                {...getFieldProps("height")}
              />
            </Grid>
            <Grid item xs={6} md={6} sm={6} />
            <Grid item xs={6} md={6} sm={6}>
        <FormLabel style={{marginLeft: 45, marginTop: 20}}>Maximum Age(Year)</FormLabel>
              <DefaultInput
                fullWidth
                required
                id="GrowthFactor"
                // placeholder="Enter Tree Name*"
                // label="Tree Name*"
                error={Boolean(touched.age && errors.age)}
                helperText={touched.age && errors.age}
                {...getFieldProps("age")}
              />
            </Grid>
          </Grid>

        </DialogContent>
        <Divider/>
        <DialogActions>
          <LoadingButton loading={buttonDisabled} variant='contained' loadingPosition="end" onClick={() => { handleSubmit(); handleSubmitErrors();}}
          >{data?"Save":"Add"}
          </LoadingButton>
        </DialogActions>
      </Dialog>
      </div>
  );
}

