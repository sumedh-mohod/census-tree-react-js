import React from 'react';
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
    DialogTitle
  } from '@mui/material';
  import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import PropTypes from 'prop-types';


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

 
    const { isOpen } = props;
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const handleClose = () => {
        props.handleClose();
      };


      const TreeDetailsSchema = Yup.object().shape(
        {
          locationType: Yup.string().required('Location Type is required'),
          propertyType: Yup.string().required('Property Type is required'),
          treeNumber: Yup.string().required('Tree Number is required'),
          propertyOwner:Yup.string().required('Property Owner is required'),
          tenantName: Yup.string().required('Tenant Name is required'),
          area: Yup.string().required('Area is required'),
          treeType: Yup.string().required('Tree Type is required'),
          localtreeName: Yup.string().required('Tree Name(Local) is required'),
          botTreeName: Yup.string().required('Tree Name(Botanical) is required'),
          girth: Yup.string().required('Girth is required'),
          height: Yup.string().required('Height is required'),
          canopy: Yup.string().required('Canopy is required'),
          treeCondition: Yup.string().required('Tree Condition is required'),
          disease: Yup.string().required('Disease is required'),
          plantationDate:Yup.string().required('Plantation Date is required'),
          referredExpert: Yup.string().matches(/^[0-9]\d{9}$/, 'Phone number is not valid').required('Referred To Expert is required'),
          actionTaken: Yup.string().required('Action To Be Taken is required'),
          images: Yup.string().required('Upload images'),
          qcStatus: Yup.string().required('QC Status is required'),
          qcBy: Yup.string().required('QC By is required'),
          qcOnDate: Yup.string().required('QC On Date is required'),
      }
      );

      const {
        handleBlur,
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      } = useFormik({
        enableReinitialize: true,
        initialValues: {
          locationType:	"Desert",
          propertyType:	"Mall",
          treeNumber:	"11100011",
          propertyOwner:	"cricket",
          tenantName:	"hockey",
          area:	"200",
          treeType:	"Coniferous trees",
          localtreeName:	"Christmas trees",
          botTreeName:	"Araucaria columnaris",
          girth:	"100",
          height:	"20",
          canopy:	"10",
          treeCondition:	"Fully cut",
          disease:	"Leaf Rusts",
          plantationDate:	"2022/06/12",
          referredExpert:	"Yes",
          actionTaken:	"no",
          images: "",
          qcStatus:	"Pending",
          qcBy:	"-",
          qcOnDate: "-"
        },
        validationSchema: TreeDetailsSchema,
        onSubmit: (values) => {
          console.log(values);
        },
      });
    
      return (
      
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={isOpen}
            onClose={handleClose}
            // onClose={handleClose}
          >
            <BootstrapDialogTitle >Tree Details</BootstrapDialogTitle>
            <Divider/>
            <DialogContent>
            <form onSubmit={handleSubmit}>
    <TextField
                fullWidth
                margin="normal"
                name="locationType"
                placeholder="Location Type"
                label="Location Type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.locationType || ""}
                required
                helperText={
     
                    errors.locationType && touched.locationType
                      
                
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="propertyType"
                placeholder="Property Type"
                label="Property Type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.propertyType || ""}
                required
                helperText={
                
                    errors.propertyType && touched.propertyType
                     
              
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="treeNumber"
                placeholder="Tree Number"
                label="Tree Number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.treeNumber || ""}
                required
                helperText={
                    errors.treeNumber && touched.treeNumber
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="propertyOwner"
                placeholder="Property Owner"
                label="Property Owner"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.propertyOwner || ""}
                required
                helperText={
                    errors.propertyOwner && touched.propertyOwner
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="tenantName"
                placeholder="Tenant Name"
                label="Tenant Name"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.tenantName || ""}
                required
                helperText={
                    errors.tenantName && touched.tenantName
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="area"
                placeholder="Area"
                label="Area"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.area || ""}
                required
                helperText={
                    errors.area && touched.area
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="treeType"
                placeholder="Tree Type"
                label="Tree Type"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.treeType || ""}
                required
                helperText={
                    errors.treeType && touched.treeType
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="localTreeName"
                placeholder="Tree Name(local)"
                label="Tree Name(local)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.localTreeName || ""}
                required
                helperText={
                    errors.localTreeName && touched.localTreeName
                      
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="BotTreeName"
                placeholder="Tree Name(Botanical)"
                label="Tree Name(Botanical)"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.BotTreeName || ""}
                required
                helperText={
                    errors.BotTreeName && touched.BotTreeName
                    
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="girth"
                placeholder="Girth"
                label="Girth"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.girth || ""}
                required
                helperText={
                    errors.girth && touched.girth
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="height"
                placeholder="Height"
                label="Height"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.height || ""}
                required
                helperText={
                    errors.height && touched.height
                      
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="canopy"
                placeholder="Canopy"
                label="Canopy"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.canopy || ""}
                required
                helperText={
                    errors.canopy && touched.canopy
                     
                }
              />
                            <TextField
                fullWidth
                margin="normal"
                name="treeCondition"
                placeholder="Tree Condition"
                label="Tree Condition"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.treeCondition || ""}
                required
                helperText={
                    errors.treeCondition && touched.treeCondition
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="disease"
                placeholder="Disease"
                label="Disease"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.disease || ""}
                required
                helperText={
                    errors.disease && touched.disease
                    
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="plantationDate"
                placeholder="Plantation Date"
                label="Plantation Date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.plantationDate || ""}
                required
                helperText={
                    errors.plantationDate && touched.plantationDate
                     
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="referredExpert"
                placeholder="Referred To Expert"
                label="Referred To Expert"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.referredExpert || ""}
                required
                helperText={
                    errors.referredExpert && touched.referredExpert
                    
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="actionTaken"
                placeholder="Action Need To Be Taken"
                label="Action Need To Be Taken"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.actionTaken || ""}
                required
                helperText={
                    errors.actionTaken && touched.actionTaken
                  
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="qcStatus"
                placeholder="QC Status"
                label="QC Status"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.qcStatus || ""}
                required
                helperText={
                    errors.qcStatus && touched.qcStatus
                      
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="qcBy"
                placeholder="QC By"
                label="QC By"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.qcBy || ""}
                required
                helperText={
                    errors.qcBy && touched.qcBy
                    
                }
              />
              <TextField
                fullWidth
                margin="normal"
                name="qcOnDate"
                placeholder="QC On Date"
                label="QC On Date"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.qcOnDate || ""}
                required
                helperText={
                    errors.qcOnDate && touched.qcOnDate
                    
                }
              />
          <Button
                
                  variant="contained"
                  type="submit"
                  fullWidth
                  onClick={handleClose}
                >
                  Update
                </Button>
              
              </form>
            </DialogContent>
            {/* <DialogActions>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions> */}

                </Dialog>
      );

  }