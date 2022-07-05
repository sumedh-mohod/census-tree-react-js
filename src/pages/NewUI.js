import React, { useEffect, useState } from 'react';
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
    Modal,
    Select,
    MenuItem
  } from '@mui/material';
  import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
  import  ImageGallery  from 'react-image-gallery';
  import { useDispatch, useSelector } from 'react-redux';
 import TreeDetailsDialog from '../components/DialogBox/TreeDetailsDialog';
 import { GetTreeCensusPendingQCStatus, UpdateQCStatusOfTreeCensus, ReferToExpert} from '../actions/TreeCensusAction';
 import { GetCouncil} from '../actions/CouncilAction';
 import { GetZones} from '../actions/ZonesAction';
 import {GetWards} from '../actions/WardsActions';

 import Page from '../components/Page';



  

  
  export default function NewUI(){
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [councilID, setCouncilID] = React.useState(1);
    const [zoneID, setZoneID] = React.useState(1);
    const [wardID, setWardID] = React.useState(1);
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");
    const [addedBy, setAddedBy] = React.useState("");
    const [updateClick, setUpdateClick] = React.useState(false);
    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const {
      council,
      zones,
      wards,
      treeCensusPendingQCStatus, 
      referToExpertLog,
      updateQCStatusLog,
    } = useSelector((state) => ({
      council:state.council.council,
      zones:state.zones.zones,
      wards:state.wards.wards,
      treeCensusPendingQCStatus: state.treeCensus.treeCensusPendingQCStatus,
      referToExpertLog: state.treeCensus.referToExpertLog,
      updateQCStatusLog: state.treeCensus.updateQCStatusLog,
    }));

    console.log("in new");
    useEffect(()=>{
      dispatch(GetCouncil(1,1000));
      dispatch(GetWards(1,1000));
      dispatch(GetZones(1,1000));
      dispatch(GetTreeCensusPendingQCStatus(councilID,zoneID,wardID));
      // dispatch(GetBaseColorTreeById(1));
    },[])
    console.log(treeCensusPendingQCStatus);
    console.log(council);
   treeCensusPendingQCStatus.data.map((tree, index) =>(
      console.log(index, tree.tree_number, tree.tree_name.name)
      // console.log(tree.tree_number)
      // console.log(tree.tree_name.name)
      ));
    const handleDialogOpen = () => {
      setDialogOpen(true);
      setUpdateClick(true);
  };
    const handleDialogClose = () => {
      setDialogOpen(false);
      setUpdateClick(false);
    };



    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 800,
      bgcolor: 'background.paper',
      border: '1px solid #000',
      boxShadow: 24,
      p: 0,
    };
    
    const toggleDrawer = (anchor, open) => (event) => {
      if (
        event.type === "keydown" &&
        ((event).key === "Tab" || (event).key === "Shift")
      ) {
        return;
      }
  
      setState({ ...state, [anchor]: open });
  
    };

    const handleReferToExpert = () =>{
      dispatch(ReferToExpert({
        "referred_to_expert" : 1
      },treeCensusPendingQCStatus.data[0].id))
    }

    const handleApproveNext = () =>{
      dispatch(UpdateQCStatusOfTreeCensus(treeCensusPendingQCStatus.data[0].id,{
        "qc_status" : "Approved"
      }))
    }


    const handleRowClick = (tree) =>{
      console.log(tree);
    }

    const handleCouncilChange = (event) => {
      setCouncilID(event.target.value);
      };

    const handleZoneChange = (event) => {
      setZoneID(event.target.value);
      };

    const handleWardChange = (event) => {
      setWardID(event.target.value);
      };

    const handleAddedByChange = (event) => {
      setAddedBy(event.target.value);
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
      const FilterSchema = Yup.object().shape({
        councilForm: Yup.string().required('Please select council'),
        wardForm: Yup.string().required('Please select ward'),
        zoneForm: Yup.string().required('Please select zone'),
      });
    
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          councilForm: " ",
          wardForm: "",
          zoneForm:"",
          addedByForm: "",
          toDateForm: null,
          fromDateForm: null,
        },
        validationSchema: FilterSchema,
        onSubmit: (value) => {
          console.log("in submit");
          console.log("VALUE",value);
          dispatch(GetTreeCensusPendingQCStatus(councilID,zoneID,wardID, value.fromDateForm, value.toDateForm));
        },
      });
    
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return(
        <Page title="New UI" style={{paddingBottom:'0px'}}>
            <Container style={{paddingRight:'0px',marginRight:'-16px'}}>
            <Box sx={{  height: '100' }}>
          <Button
           variant='outlined'
            sx={{justifyContent:'end', display:'flex', position: 'fixed',right: 0,top:'100px',border:'2px solid black',backgroundColor:'black',zIndex:'999', 
            "&.MuiButtonBase-root:hover": {
              bgcolor: "black",
              border:'2px solid black'
            }
          }}
            onClick={toggleDrawer("right", true)} 
           
          >
        <FilterAltRoundedIcon sx={{color:'white'}}/>
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
          <div>
          <Grid container spacing={1}>
          <Grid item xs={12}>
          <Typography variant='Button' sx={{mb: "0", paddingTop: "10px"}} gutterBottom>Select Council</Typography>
            <Select
            
              id="council"
              label="Select Council"
              displayEmpty
              value={councilID}
              style={{width:'83%', marginLeft: 40}}
              size="small"
              onChange={handleCouncilChange}
              error={Boolean(touched.councilForm && errors.councilForm)}
                helperText={touched.councilForm && errors.councilForm}
                {...getFieldProps("councilForm")}
            >
               <MenuItem disabled value="">
            <em>Select Council*</em>
          </MenuItem>
              {council?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='Button' sx={{mb: "0", paddingTop: "10px"}} gutterBottom>Select Zone </Typography>
            <Select
            
              id="zone"
              label="Select Zone"
              displayEmpty
              value={zoneID}
              style={{width:'83%', marginLeft: 40}}
              size="small"
              onChange={handleZoneChange}
              error={Boolean(touched.zoneForm && errors.zoneForm)}
                helperText={touched.zoneForm && errors.zoneForm}
                {...getFieldProps("zoneForm")}
            >
               <MenuItem disabled value="">
            <em>Select Zone*</em>
          </MenuItem>
              {zones?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='Button' sx={{mb: "0", paddingTop: "10px"}} gutterBottom>Select Ward</Typography>
            <Select
            
              id="ward"
              label="Select Ward"
              displayEmpty
              value={zoneID}
              style={{width:'83%', marginLeft: 40}}
              size="small"
              onChange={handleWardChange}
              error={Boolean(touched.wardForm && errors.wardForm)}
                helperText={touched.wardForm && errors.wardForm}
                {...getFieldProps("wardForm")}
            >
               <MenuItem disabled value="">
            <em>Select Ward*</em>
          </MenuItem>
              {wards?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
            <Typography variant='Button' sx={{mb: "0", paddingTop: "10px"}} gutterBottom>Select Added By</Typography>
            <Select
            
              id="addedBy"
              label="Select Added By"
              displayEmpty
              value={addedBy}
              style={{width:'83%', marginLeft: 40}}
              size="small"
              // placeholder='*Status'
              onChange={handleAddedByChange}
              // error={Boolean(touched.addedByForm && errors.councilForm)}
              //   helperText={touched.councilForm && errors.councilForm}
                {...getFieldProps("addedByForm")}
            >
               <MenuItem disabled value="">
            <em>Select Added By</em>
          </MenuItem>
              {council?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </Select>
            </Grid>
            <Grid item xs={12}>
               <Typography variant='Button' sx={{mb: "0", paddingTop: "10px"}} gutterBottom>Select To Date</Typography>
              <TextField
                fullWidth
                id="toDate"
                type="date"
                margin="normal"
                name="toDateForm"
                sx={{mb: "-11px", paddingTop: "20px", mt: "-20px"}}
                size="small"
                // label="Plantation Date"
                 value={values.toDateForm || ""}
         
                // helperText={
                //     errors.toDateForm && touched.toDateForm
                     
                // }
                {...getFieldProps("toDateForm")}
              />
               </Grid>
               <Grid item xs={12}>
               <Typography variant='Button' sx={{mb: "0", mt: "20px"}} gutterBottom>Select From Date</Typography>
              <TextField
                fullWidth
                id="fromDate"
                type="date"
                margin="normal"
                name="fromDateForm"
                sx={{mb: "-11px", paddingTop: "20px", mt: "-20px"}}
                size="small"
                // label="Plantation Date"
                 value={values.fromDateForm || ""}
         
                // helperText={
                //     errors.toDateForm && touched.toDateForm
                     
                // }
                {...getFieldProps("fromDateForm")}
              />
               </Grid>
            </Grid>
            <Button sx={{mt:10, alignContent:'center', ml:10}} onClick={handleSubmit}>Apply</Button>
          </div>
         {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
        </Drawer>
        </Box>
        <Grid container style={{height:'calc(100vh - 118px)',marginBottom:'-80px',overflowY:'hidden'}}>
  
  <Grid item xs={4} style={{height:'100%',overflowY:'auto',paddingRight:'5%'}}>
  <Box sx={{  width: '100%',height:'100%',paddingRight:'20%',borderRight:'2px solid slategray' }}>
  <Typography variant="h4" gutterBottom align='center'>
            Total Trees: {treeCensusPendingQCStatus.pending_qc_count}
          </Typography>
  <table style={{ fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: "100%"}}>
   
      <tr>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>#</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Number</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>Tree Name</th>
  </tr>
  
    {treeCensusPendingQCStatus.data.map((tree, index) =>(
  <tr onClick={handleRowClick(tree)}>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{index+1}</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{tree.tree_number}</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "left",  padding: "8px"}}>{tree.tree_name.name}</td>
  </tr>
    ))}
 
  </table>
    </Box>

  </Grid>
  {/* <Divider orientation='vertical' sx={{ mr:3}} flexItem/> */}
  <Grid item xs={8} style={{height:'100%',overflowY:'auto',paddingRight:'16px'}}>
  <Stack spacing={2}>
  <Box sx={{ height: 500, width: '100%', mr:5 }}>
  <ImageGallery {...properties} />
  </Box>
  <Box sx={{ height: 400, width: '100%' }}>
    <Box sx={{  width: '100%' }}>
      
    <Typography variant="h4" gutterBottom>
            Tree Details: 
          </Typography>
          {treeCensusPendingQCStatus.data.length !== 0?(
            <>
          <table>
             <tr>
             <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Tree Number:</td>
             <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}> {treeCensusPendingQCStatus.data[0].tree_number}</td>
             </tr>
            
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Tree Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].tree_name?.name}</td>
            </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Botanical Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].tree_name?.botanical_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Tree Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].tree_type.tree_type}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Location Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].location_type.location_type}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Property Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].property_type? treeCensusPendingQCStatus.data[0].property_type.property_type: "-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Property Number: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].property?.property_number?treeCensusPendingQCStatus.data[0].property?.property_number:"-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Owner Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].property?.owner_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Tenant Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].property?.tenant_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Area(Sq feet): </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].property?.area? treeCensusPendingQCStatus.data[0].property.area:"-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Plantation Date: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].plantation_date}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Tree Condition: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].tree_condition.condition}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Girth: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].girth}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Height: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].height}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Canopy: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}>{treeCensusPendingQCStatus.data[0].canopy}</td>
              </tr>
             </table>
             </>
             ):null}
             <Box sx={{ height: 200, width: '100%', mt:5 }}>
    <Stack direction="row" spacing={4}>
  <Button size="small" onClick={handleApproveNext}>Approve & Next</Button>
  <Button  size="small" onClick={handleDialogOpen}>Unapprove & Update</Button>
  <Button  size="small" onClick={handleReferToExpert}>Refer To Expert</Button>
</Stack>
</Box>
      
{updateClick?  
        <TreeDetailsDialog
        isOpen={updateClick}
        handleClose= {handleDialogClose}
        data={treeCensusPendingQCStatus.data[0]}
        />: null 
        }
    </Box>


  </Box>
</Stack>
  </Grid>
</Grid>
</Container>
</Page>
    );
  }