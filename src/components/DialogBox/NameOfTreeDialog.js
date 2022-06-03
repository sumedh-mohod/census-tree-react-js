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
import { AddTreeName, EditTreeName } from '../../actions/TreeNameAction';
import { GetTreeType } from '../../actions/TreeTypeActions';
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
  const [typeOfTree, SetTypeOfTree] = React.useState('Tree Type')
  const { isOpen, data } = props;

  const {
    addTreeNameLog,
    editTreeNameLog,
    treeType

  } = useSelector((state) => ({
    addTreeNameLog:state.treeName.addTreeNameLog,
    editTreeNameLog:state.treeName.editTreeNameLog,
    treeType:state.treeType.treeType,
  }));

  const typeOfTreeValue = [
    {
      value: 'fruitTree',
      label: 'Fruit Tree',
    },
    {
      value: 'flowerTree',
      label: 'Flower Tree',
    },
  ];

  useEffect(()=>{
    dispatch(GetTreeType(1,1000));
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

  const DesignationsSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    botanicalName: Yup.string().required('botanical Name is required'),
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
      console.log("VALUE",value);
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

  console.log("TREE TYPE IN NAME OF TREE",treeType)

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open max-width dialog
      </Button> */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={isOpen}
        onClose={handleClose}
        // onClose={handleClose}
      >
        <BootstrapDialogTitle onClose={handleClose}>Name Of Tree</BootstrapDialogTitle>
        <Divider/>
        <DialogContent>
        <Grid container spacing={1}>
        <Grid item xs={12}>
              <DefaultInput
                fullWidth
                id="nameOfTree"
                placeholder="*Enter Tree Name"
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
                placeholder="*Enter Botanical Name"
                error={Boolean(touched.botanicalName && errors.botanicalName)}
                helperText={touched.botanicalName && errors.botanicalName}
                {...getFieldProps("botanicalName")}
              />
            </Grid>
            <Grid item xs={12}>
            <Select
              id="typeOfTree"
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
            <em>*Type Of Tree</em>
          </MenuItem>
              {treeType.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.tree_type}
                </MenuItem>
              ))}
            </Select>
            </Grid>
          </Grid>

        </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}>Add</Button>
        </DialogActions>
      </Dialog>
      </div>
  );
}
