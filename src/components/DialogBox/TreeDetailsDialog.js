import React, { useEffect, useRef } from 'react';
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from "yup";
import {
    Stack,
    Button,
    Typography,
    Grid,
    Box,
    Container,
    Drawer,
    Divider,
    TextField,
    form,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    // Select, 
    MenuItem,
  } from '@mui/material';
  import Select from "react-select";
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import moment from 'moment';
import DefaultInput from '../Inputs/DefaultInput';
import { GetActiveTreeType } from '../../actions/TreeTypeActions';
import { GetActiveTreeDisease } from '../../actions/TreeDiseaseAction';
import { GetTreeConditions } from '../../actions/TreeConditionAction';
import { GetActiveTreeName } from '../../actions/TreeNameAction';
import { UpdateCensusTree } from '../../actions/TreeCensusAction';



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

  export default function TreeDetailsDialog(props) {

    const dispatch = useDispatch();
    const { isOpen, data } = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');
    const [localTreeName, setLocalTreeName] = React.useState({label: data.tree_name.name, value: data.tree_name.id});
    const [botanicalTreeName, setBotanicalTreeName] = React.useState(data?data.tree_name_id:"");
    const todayDate = moment(new Date()).format('YYYY-MM-DD');

    const {
        treeName,
        treeDisease,
        treeConditions,
        treeType,
        updateCensusTreeLog,
      } = useSelector((state) => ({
        treeName:state.treeName.activeTreeName,
        treeDisease:state.treeDisease.activeTreeDisease,
        treeConditions:state.treeConditions.treeConditions,
        treeType:state.treeType.activeTreeType,
        updateCensusTreeLog: state.treeCensus.updateCensusTreeLog,
      }));

      console.log("data", props.data)
      console.log("localTreeName_________",localTreeName)

      useEffect(()=>{
        dispatch(GetActiveTreeName(1));
        dispatch(GetActiveTreeType(1));
        dispatch(GetTreeConditions(1,1000));
        dispatch(GetActiveTreeDisease(1));
      },[])

      
      const handleLocalTreeName = (e) => {
        setLocalTreeName(e.target.value)
        setBotanicalTreeName(e.target.value)

      }

      const handleTreeNameChange =(e) => {
        setLocalTreeName(e)
        setBotanicalTreeName(e.value)
      }

      const handleBotanicalTreeName = (e) => {
        setBotanicalTreeName(e.target.value)
        setLocalTreeName({label:findLocalTreeName(treeName,e.target.value) ,value: e.target.value})
        // console.log("e", e)
      }

      const findLocalTreeName= (listOfObj, id) => {
        const found = listOfObj.find((e) => e.id === id);
        // console.log("FOUND",found);
        if (found) {
          return found.name;
        }
      };

    const handleClose = () => {
        props.handleClose();
      };

      const TreeDetailsSchema = Yup.object().shape(
        {
       
          treeType: Yup.string().required('Tree Type is required'),
          localtreeName: Yup.string().required('Tree Name(Local) is required'),
          botTreeName: Yup.string().required('Tree Name(Botanical) is required'),
          girth: Yup.string().required('Girth is required'),
          height: Yup.string().required('Height is required'),
          canopy: Yup.string().required('Canopy is required'),
          treeCondition: Yup.string().required('Tree Condition is required'),
          disease: Yup.string().required('Disease is required'),
          // plantationDate:Yup.string().required('Plantation Date is required'),
         
      }
      );

      
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            treeType:	data?data.tree_type_id:"",
            localtreeName: localTreeName || "",
            botTreeName:data?data.tree_name_id:"",
            girth:	data?data.girth:"",
            height:	data?data.height:"",
            canopy:	data?data.canopy:"",
            treeCondition:		data?data.tree_condition_id:"",
            disease:		data?data.tree_disease_id:"",
            plantationDate:	data? data.plantation_date:"",
        },
        validationSchema: TreeDetailsSchema,
        onSubmit: (value) => {
          // console.log("localtreeName", value)
          const plantationDate = value.plantationDate.replaceAll("-","/")
          dispatch(UpdateCensusTree({
            "tree_type_id": value.treeType,
            "tree_name_id": value.localtreeName.value,
            "tree_disease_id": value.disease,
            // "plantation_date": value.plantationDate,
            "plantation_date": plantationDate,
            "girth": value.girth,
            "height": value.height,
            "canopy": value.canopy,
            "tree_condition_id": value.treeCondition,
          }, data.id))
        
        },
      });
    
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;
 

      return (
      
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={isOpen}
          
            // onClose={handleClose}
          >
            <BootstrapDialogTitle onClose={handleClose}>Tree Details</BootstrapDialogTitle>
            <Divider/>
            <DialogContent>
            <Grid container spacing={1}>
                <Grid item xs={12}>
              <TextField

              select
              fullWidth
              id="typeOfTree"
              label="Tree Type*"
              name="treeType"
              displayEmpty
              defaultValue = ""
              value={values.tretreeTypeeType || ""}
              error={Boolean(touched.treeType && errors.treeType)}
                helperText={touched.treeType && errors.treeType}
                {...getFieldProps("treeType")}
            >
               <MenuItem disabled value="">
            {/* <em>Tree Type </em> */}
          </MenuItem>
              {treeType?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.tree_type}
                </MenuItem>
              ))}
              </TextField>
              </Grid>
            <Grid item xs={12}>

            <Select
              
              id="localTreeName"
              placeholder= "Select Tree Name"
              // label= "Tree Name"
              label="Tree Name(Local)*"
              name="localtreeName"
              value={localTreeName}
              defaultValue = ""
              className="react-select-container"
              styles={{
                control: (base) => ({
                  ...base,
                  border: `1px solid gray`,
                  width: '100%',
                  // marginLeft: '40px',
                  height: '55px',
                  borderRadius: '7px',
                }),
                menuPortal: (base) => ({
                  ...base,
                  border: `1px solid gray`,
                  width: '83%',
                  marginLeft: '40px',
                  height: '50px',
                  borderRadius: '7px',
                  backgroundColor: 'gray',
                }),
              }}
              // isClearable={false}
              // className="abc"

      options={treeName?.map((item) => {
        return { value: item.id, label: item.name };

      })}
      // eslint-disable-next-line react/jsx-no-bind
      onChange={(e) => {
        handleTreeNameChange(e)
        // formik.handleChange(e);
      }}
      // onChange={handleTreeNameChange}
      // onChange={opt => console.log({value: opt.name, label: opt.name })}
      error={Boolean(touched.localTreeName && errors.localTreeName)}
      helperText={touched.localTreeName && errors.localTreeName}
      // {...getFieldProps("treeFamilyId")}
    />
              </Grid>
            <Grid item xs={12} style={{zIndex:0}}>
              <TextField
              select
              fullWidth
              id="botTreeName"
              label="Tree Name(Botanical)*"
              name="botTreeName"
              displayEmpty
              defaultValue = ""
              style={{marginTop:5}}
              // placeholder="Tree Name(Botanical)"
               value={botanicalTreeName}
               onChange={(e) => {
                handleBotanicalTreeName(e)
                formik.handleChange(e);
              }}
              error={Boolean(touched.botTreeName && errors.botTreeName)}
                helperText={touched.botTreeName && errors.botTreeName}
                // {...getFieldProps("botTreeName")}
            >
               <MenuItem disabled value="">
            {/* <em>Tree Name(Botanical)</em> */}
          </MenuItem>
              {treeName?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.botanical_name}
                </MenuItem>
              ))}
              </TextField>
              </Grid>
            <Grid item xs={12} style={{zIndex:0}}>
              <TextField
                fullWidth
                displayEmpty
                type="number"
                name="girth"
                placeholder="Girth"
                style={{marginTop:5}}
                label="Girth*"
                 value={values.girth || ""}
                helperText={
                    errors.girth && touched.girth
                     
                }
                {...getFieldProps("girth")}
              />
               </Grid>
            <Grid item xs={12} style={{zIndex:0}}>
              <TextField
                fullWidth
                name="height"
                placeholder="Height"
                label="Height*"
                 value={values.height || ""}
                 style={{marginTop:5}}
                helperText={
                    errors.height && touched.height
                      
                }
                {...getFieldProps("height")}
              />
               </Grid>
            <Grid item xs={12} style={{zIndex:0}}>
              <TextField
                fullWidth
                name="canopy"
                placeholder="Canopy"
                label="Canopy*"
                 value={values.canopy || ""}
                 style={{marginTop:5}}
                helperText={
                    errors.canopy && touched.canopy
                     
                }
                {...getFieldProps("canopy")}
              />
               </Grid>
            <Grid item xs={12} style={{zIndex:0}}>
           
                <TextField
                select
              fullWidth
              id="treeCondition"
              label="Tree Condition*"
              name="treeCondition"
              displayEmpty
              defaultValue = ""
              style={{marginTop:5}}
              // placeholder="Tree Condition"
               value={values.treeCondition || ""}
              error={Boolean(touched.treeCondition && errors.treeCondition)}
                helperText={touched.treeCondition && errors.treeCondition}
                {...getFieldProps("treeCondition")}
            >
               <MenuItem disabled value="">
            {/* <em>Tree Condition</em> */}
          </MenuItem>
              {treeConditions?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.condition}
                </MenuItem>
              ))}
              </TextField>
              </Grid>
            <Grid item xs={12}>
            
                <TextField
                select
              fullWidth
              id="disease"
              label="Tree Disease(If any)"
              name="disease"
              displayEmpty
              defaultValue = ""
              style={{marginTop:5}}
              // placeholder="Tree Disease"
               value={values.disease || ""}
              error={Boolean(touched.disease && errors.disease)}
                helperText={touched.disease && errors.disease}
                {...getFieldProps("disease")}
            >
               <MenuItem disabled value="">
            {/* <em>Tree Disease</em> */}
          </MenuItem>
              {treeDisease?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.tree_disease}
                </MenuItem>
              ))}
              </TextField>
              </Grid>
            <Grid item xs={12}>
           
              <TextField
                fullWidth
                id="plantationDate"
                name="plantationDate"
                label="Plantation Date"
                type="date"
                value={values.plantationDate}
                style={{marginTop:5}}
               
                // helperText={
                //     errors.plantationDate && touched.plantationDate
                     
                // }
                InputLabelProps={{
                  shrink: true,
                  
                }}
                inputProps={{ max: todayDate }}
                {...getFieldProps("plantationDate")}
              />
               </Grid>
           </Grid>
           </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}   variant="contained" >Save</Button>
        </DialogActions>
      </Dialog>
       
              
      
         
      );

  }