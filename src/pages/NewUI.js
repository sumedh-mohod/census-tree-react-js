import React from 'react';
import { useFormik } from "formik";
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
  } from '@mui/material';
  import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
  import  ImageGallery  from 'react-image-gallery';
  import Page from '../components/Page';
 import FilterDrawer from './FilterDrawer';



  
  const rows = [
    (1, 112300001, 'Neem'),
    (2, 112300002, 'Neem'),
    (3, 112300003, 'Neem'),
    (4, 112300004, 'Neem'),
    (5, 112300005, 'Neem'),
    (6, 112300006, 'Neem'),
    (7, 112300007, 'Neem'),
    (8, 112300008, 'Neem'),
    (9, 112300009, 'Neem'),
    (10, 1123000010, 'Neem'),
  ];

  

  
  export default function NewUI(){

    const [updateClick, setUpdateClick] = React.useState(false);
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });
    
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        ((event).key === "Tab" || (event).key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
  
    };
     
      const properties = {
        // thumbnailPosition: "left",
        useBrowserFullscreen: false,
        showPlayButton: false,
        showBullets:true,
        showIndex:true,
        // renderItem: this.myRenderItem.bind(this),
        items: [
          {
            original: "https://i.pinimg.com/originals/78/7e/b6/787eb63e14539e0763c1687e30fe6101.jpg"
           
          },
          {
            original: "https://balconygardenweb-lhnfx0beomqvnhspx.netdna-ssl.com/wp-content/uploads/2015/06/mango-tree-1.jpg",
            
          },
          {
            original: "https://res.cloudinary.com/digicomm/image/upload/t_metadata/news-magazine/2021/_assets/mango3.jpg",
            
          },
          {
            original: "https://as1.ftcdn.net/v2/jpg/02/30/80/80/500_F_230808031_Sriv3Z1nxkTlzVcv6ZXWaXGxYnLh4dDN.jpg"
           
          },
        ]
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

    return(
        <Page title="New UI">
            <Container>
            <Box sx={{  height: '100' }}>
          <Button
            
           variant='outlined'
            sx={{justifyContent:'end', display:'flex', position: 'fixed',right: 0 }}
            onClick={toggleDrawer("right", true)} 
           
          >
        <FilterAltRoundedIcon/>
          </Button> 
          <Drawer
           sx= {
            {
              "& .MuiDrawer-paper": {
                width: "300px",
                maxWidth: "100%",
              },
            }
          }
          anchor={"right"} open={state.right} onClose={toggleDrawer("right", false)}
          // sx={{
          //   display: { xs: 'block', sm: 'none' },
          //   '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          // }}
        >
         <FilterDrawer data={toggleDrawer("right", false)}/>
        </Drawer>
        </Box>
        <Grid container spacing={2} sx={{ mt:5 }}>
  
  <Grid item xs={6}>
  <Box sx={{  width: '50%', ml:5 }}>
  <Typography variant="h5" gutterBottom align='center'>
            Total Trees: 15000
          </Typography>
  <table style={{ fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: "100%"}}>
      <tr>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>#</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Number</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Name</th>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>1</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300001</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Neem</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>2</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300002</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Babul</td>
  </tr>
  <tr>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>3</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300003</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Chapha</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>4</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300004</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Neem</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>5</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300005</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Aam</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>6</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300006</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Babul</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>7</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300007</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Aam</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>8</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300008</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Gulmohar</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>9</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>112300009</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Babul</td>
  </tr>
  <tr>
  <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>10</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>1123000010</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Gulmohar</td>
  </tr>
  </table>
    </Box>

  </Grid>
  {/* <Divider orientation='vertical' sx={{ mr:3}} flexItem/> */}
  <Grid item xs={6} >
  <Stack spacing={2}>
  <Box sx={{ height: 400, width: '100%', mr:5 }}>
  <ImageGallery {...properties} />
  </Box>
  <Box sx={{ height: 400, width: '100%' }}>
    <Box sx={{  width: '100%' }}>
    <Typography variant="h5" gutterBottom>
            Tree Details: 
          </Typography>
          {!updateClick?(
            <>
             <Typography>Tree Number: 11200004</Typography>
             <Typography>Tree Name: Aam</Typography>
             <Typography>Tree Condition: Good</Typography>
             <Typography>Tree Diseases: No</Typography>
             <Box sx={{ height: 200, width: '100%', mt:5 }}>
    <Stack direction="row" spacing={4}>
  <Button variant="outlined" size="small">Approve & Next</Button>
  <Button variant="outlined" size="small" onClick={()=>setUpdateClick(true)}>Unapprove & Update</Button>
  <Button variant="outlined" size="small">Refer To Expert</Button>
</Stack>
</Box>
             </>
          ):(
          <>
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
                
                >
                  Update
                </Button>
              
              </form>
    </>
    )}
    </Box>
    
    {/* <Box sx={{ height: 200, width: '100%', mt:5 }}>
    <Stack direction="row" spacing={4}>
  <Button variant="outlined" size="small">Approve & Next</Button>
  <Button variant="outlined" size="small" onClick={()=>setUpdateClick(true)}>Unapprove & Update</Button>
  <Button variant="outlined" size="small">Refer To Expert</Button>
</Stack>
</Box> */}
  </Box>
</Stack>
  </Grid>
</Grid>
</Container>
</Page>
    );
  }