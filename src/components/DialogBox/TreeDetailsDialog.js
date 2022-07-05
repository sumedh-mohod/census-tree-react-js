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
    Select, 
    MenuItem,
  } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';
import DefaultInput from '../Inputs/DefaultInput';
import { GetActiveTreeType } from '../../actions/TreeTypeActions';
import { GetAllTreeDisease } from '../../actions/TreeDiseaseAction';
import { GetTreeConditions } from '../../actions/TreeConditionAction';
import { GetTreeName } from '../../actions/TreeNameAction';
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
    console.log("props", data);

    const {
        treeName,
        treeDisease,
        treeConditions,
        treeType,
        updateCensusTreeLog,
      } = useSelector((state) => ({
        treeName:state.treeName.treeName,
        treeDisease:state.treeDisease.treeDisease,
        treeConditions:state.treeConditions.treeConditions,
        treeType:state.treeType.treeType,
        updateCensusTreeLog: state.treeCensus.updateCensusTreeLog,
      }));

      useEffect(()=>{
        dispatch(GetTreeName(1,1000));
        dispatch(GetActiveTreeType(1,1000,1));
        dispatch(GetTreeConditions(1,1000));
        dispatch(GetAllTreeDisease(1,1000));
      },[])

    const handleClose = () => {
        props.handleClose();
      };



console.log("names", treeName);
console.log("types", treeType);
console.log("conditions", treeConditions);
console.log("diseases", treeDisease);
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
          plantationDate:Yup.string().required('Plantation Date is required'),
         
      }
      );

      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            treeType:	"",
            localtreeName:	"",
            botTreeName:	"",
            girth:	"",
            height:	"",
            canopy:	"",
            treeCondition:	"",
            disease:	"",
            plantationDate:	"",
        },
        validationSchema: TreeDetailsSchema,
        onSubmit: (value) => {
            console.log("in submit");
          console.log("VALUE",value);
          dispatch(UpdateCensusTree({
            "tree_type_id": value.treeType,
            "tree_name_id": value.localtreeName,
            "tree_disease_id": value.disease,
            "plantation_date": value.plantationDate,
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
                <Typography variant='h6' gutterBottom sx={{mb: "-11px"}}>Select Tree Type</Typography>
                <Typography variant='caption' gutterBottom>Please select any tree type</Typography>
              <Select
              fullWidth
              id="typeOfTree"
              // label="Tree Type*"
              name="treeType"
              displayEmpty
              defaultValue = ""
              value={values.tretreeTypeeType || ""}
              required
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
              </Select>
              </Grid>
            <Grid item xs={12}>
            <Typography variant='h6' sx={{mb: "-11px", paddingTop: "20px"}} gutterBottom>Select Tree Name(Local)</Typography>
                <Typography variant='caption' gutterBottom>Please select any tree name</Typography>
            <Select
              fullWidth
              id="nameOfTreeLocal"
              // label="Tree Name(Local)"
              name="localtreeName"
              displayEmpty
              defaultValue = ""
              // placeholder="Tree Name(Local)"
               value={values.localtreeName || ""}
              required
              error={Boolean(touched.localtreeName && errors.localtreeName)}
                helperText={touched.localtreeName && errors.localtreeName}
                {...getFieldProps("localtreeName")}
            >
               <MenuItem disabled value="">
            {/* <em>Tree Name(Local)</em> */}
          </MenuItem>
              {treeName?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
              </Select>
              </Grid>
            <Grid item xs={12}>
            <Typography variant='h6' sx={{mb: "-11px", paddingTop: "20px"}} gutterBottom>Select Tree Name(Botanical)</Typography>
                <Typography variant='caption' gutterBottom>Please select any tree name</Typography>
              <Select
              fullWidth
              id="nameOfTreeBot"
              // label="Tree Name(Botanical)"
              name="botTreeName"
              displayEmpty
              defaultValue = ""
              // placeholder="Tree Name(Botanical)"
               value={values.botTreeName || ""}
              required
              error={Boolean(touched.botTreeName && errors.botTreeName)}
                helperText={touched.botTreeName && errors.botTreeName}
                {...getFieldProps("botTreeName")}
            >
               <MenuItem disabled value="">
            {/* <em>Tree Name(Botanical)</em> */}
          </MenuItem>
              {treeName?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.botanical_name}
                </MenuItem>
              ))}
              </Select>
              </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                variant="standard"
                margin="normal"
                name="girth"
                placeholder="Girth"
                label="Girth"
                 value={values.girth || ""}
                 sx={{mb: "-11px", paddingTop: "20px", maxWidth:"250px"}}
                required
                helperText={
                    errors.girth && touched.girth
                     
                }
                {...getFieldProps("girth")}
              />
               </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                variant="standard"
                margin="normal"
                name="height"
                placeholder="Height"
                label="Height"
                 value={values.height || ""}
                 sx={{mb: "-11px", paddingTop: "20px"}}
                required
                helperText={
                    errors.height && touched.height
                      
                }
                {...getFieldProps("height")}
              />
               </Grid>
            <Grid item xs={12}>
              <DefaultInput
                fullWidth
                variant="standard"
                margin="normal"
                name="canopy"
                placeholder="Canopy"
                label="Canopy"
                 value={values.canopy || ""}
                 sx={{mb: "-11px", paddingTop: "20px"}}
                required
                helperText={
                    errors.canopy && touched.canopy
                     
                }
                {...getFieldProps("canopy")}
              />
               </Grid>
            <Grid item xs={12}>
            <Typography variant='h6' sx={{mb: "-11px", paddingTop: "20px"}} gutterBottom>Select Tree Condition</Typography>
                <Typography variant='caption' gutterBottom>Please select any tree condition</Typography>
                <Select
              fullWidth
              id="treeCondition"
              // label="Tree Condition"
              name="treeCondition"
              displayEmpty
              defaultValue = ""
              // placeholder="Tree Condition"
               value={values.treeCondition || ""}
              required
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
              </Select>
              </Grid>
            <Grid item xs={12}>
            <Typography variant='h6' sx={{mb: "-11px", paddingTop: "20px"}} gutterBottom>Select Tree Disease(If any)</Typography>
                <Typography variant='caption' gutterBottom>Please select any tree disease</Typography>
                <Select
              fullWidth
              id="disease"
              // label="Tree Disease"
              name="disease"
              displayEmpty
              defaultValue = ""
              // placeholder="Tree Disease"
               value={values.disease || ""}
              required
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
              </Select>
              </Grid>
            <Grid item xs={12}>
            <Typography variant='h6' sx={{mb: "-11px", paddingTop: "20px"}} gutterBottom>Plantation Date</Typography>
                <Typography variant='caption' gutterBottom>Please select any plantation date</Typography>
              <TextField
                fullWidth
                id="plantationDate"
                type="date"
                margin="normal"
                name="plantationDate"
                sx={{mb: "-11px", paddingTop: "20px", mt: "-20px"}}
                
                // label="Plantation Date"
                 value={values.plantationDate || ""}
                required
                helperText={
                    errors.plantationDate && touched.plantationDate
                     
                }
                {...getFieldProps("plantationDate")}
              />
               </Grid>
           </Grid>
           </DialogContent>
        <Divider/>
        <DialogActions>
          <Button onClick={handleSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
        //   <Button
                
        //           variant="contained"
        //           type="submit"
        //           fullWidth
        //           onClick={handleClose}
        //         >
        //           Save
        //         </Button>
              
      
         
      );

  }