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
import FormControlLabel from '@mui/material/FormControlLabel';
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
  const [typeOfTree, SetTypeOfTree] = React.useState('Tree Type');
  const [treeFamily, setTreeFamily] = React.useState('');
  const [origin, setOrigin] = React.useState('');
  const [seasonStart, setSeasonStart] = React.useState('');
  const [seasonEnd, setSeasonEnd] = React.useState('');
  
  const { isOpen, data } = props;

  const {
    addTreeNameLog,
    editTreeNameLog,
    treeType

  } = useSelector((state) => ({
    addTreeNameLog:state.treeName.addTreeNameLog,
    editTreeNameLog:state.treeName.editTreeNameLog,
    treeType:state.treeType.activeTreeType,
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
      value: 'Navtive',
      label: 'Navtive',
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
  ]

  useEffect(()=>{
    dispatch(GetActiveTreeType(1));
  },[])

  useEffect(()=>{
    if(data){
      SetTypeOfTree(data.tree_type_id);
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
  setTreeFamily(event.target.value);
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

  const handleSeasonEndChange = (event) => {
    setSeasonEnd(event.target.value)
  }

  const DesignationsSchema = Yup.object().shape({
    name: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(30,"Maximum length 30 character only").required('Name is required'),
    botanicalName: Yup.string().matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field ").max(30,"Maximum length 30 character only").required('botanical Name is required'),
    treeType: Yup.string().required('Tree Type is required'),
  });


  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name:data? data.name : "",
      botanicalName: data? data.botanical_name:"",
      treeType: data? data.tree_type_id:"",
    },
    validationSchema: DesignationsSchema,
    onSubmit: (value) => {
      if(data){
        dispatch(EditTreeName({
          "name":value.name,
          "botanical_name":value.botanicalName,
          "tree_type_id":value.treeType
        },data.id))
      }
      else {
        dispatch(AddTreeName({
          "name":value.name,
          "botanical_name":value.botanicalName,
          "tree_type_id":value.treeType
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
              <DefaultInput
                fullWidth
                id="nameOfTree"
                placeholder="Enter Tree Name*"
                label="Tree Name*"
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
                {...getFieldProps("name")}
              />
            </Grid>
            <Grid item xs={12}>
            <DefaultInput
                fullWidth
                id="botanicalName"
                autoComplete="botanicalName"
                label="Botanical Name*"
                placeholder="Enter Botanical Name*"
                error={Boolean(touched.botanicalName && errors.botanicalName)}
                helperText={touched.botanicalName && errors.botanicalName}
                {...getFieldProps("botanicalName")}
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              // SelectProps={{
              //   multiple:true
              // }}
              id="typeOfTree"
              label="Tree Type*"
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
               <MenuItem disabled value="">
            <em>Type Of Tree*</em>
          </MenuItem>
              {treeType?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.tree_type}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <Select
              // SelectProps={{
              //   multiple:true
              // }}
              id="treeFamily"
              label="Tree Family"
              name='treeFamily'
            displayEmpty
              value={treeFamily}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Tree family'
              onChange={handleFamilyChange}
              // error={Boolean(touched.treeType && errors.treeType)}
              //   helperText={touched.treeType && errors.treeType}
              //   {...getFieldProps("treeType")}
            >
               <MenuItem disabled value="">
            <em>Tree Family*</em>
          </MenuItem>
              {treeFamilyValue?.map((option) => (
                <MenuItem  value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <TextareaAutosize
  aria-label="empty textarea"
  placeholder="Uses"
  style={{ width: "83%", marginLeft:40, borderRadius: 7, height: 80, paddingTop: 8, paddingLeft: 8, fontFamily: "Public Sans,sans-serif",
  fontWeight: 400, outline: "darkgrey"}}
/>
            </Grid>
            <Grid item xs={12}>
            <Select
              // SelectProps={{
              //   multiple:true
              // }}
              id="origin"
              label="Origin"
              name='origin'
            displayEmpty
              value={origin}
              style={{width:'83%', marginLeft: 40}}
              placeholder='Select Origin'
              onChange={handleOriginChange}
              // error={Boolean(touched.treeType && errors.treeType)}
              //   helperText={touched.treeType && errors.treeType}
              //   {...getFieldProps("treeType")}
            >
               <MenuItem disabled value="">
            <em>Origin</em>
          </MenuItem>
              {originValue?.map((option) => (
                <MenuItem  value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>  
              <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seasonStart}
          label="Age"
          onChange={handleChange}
          style={{width : "80%", marginLeft: 48, marginTop: 20}}
        >
            <MenuItem disabled value="">
            <em>Flowering Season Start</em>
          </MenuItem>
          {Months?.map((option) =>(
             <MenuItem value={option.value} >{option.label}</MenuItem>
          ))}
        </Select>
        </Grid>
              <Grid item xs={6}> 
                <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={seasonEnd}
          label="Age"
          onChange={handleSeasonEndChange}
          style={{width : "80%", marginTop: 20}}
        >
            <MenuItem disabled value="">
            <em>Flowering Season End</em>
          </MenuItem>
          {Months?.map((option) =>(
             <MenuItem value={option.value} >{option.label}</MenuItem>
          ))}
        </Select></Grid>
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

