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
    MenuItem,
    FormControlLabel,
    Checkbox
  } from '@mui/material';
  import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
  import  ImageGallery  from 'react-image-gallery';
  import { useDispatch, useSelector } from 'react-redux';
import { CheckBox } from '@mui/icons-material';
 import TreeDetailsDialog from '../components/DialogBox/TreeDetailsDialog';
 import { GetTreeCensusPendingQCStatus, UpdateQCStatusOfTreeCensus, ReferToExpert} from '../actions/TreeCensusAction';
 import { GetCouncil} from '../actions/CouncilAction';
 import { GetZones} from '../actions/ZonesAction';
 import {GetWards} from '../actions/WardsActions';
 import { GetUsers } from '../actions/UserAction';

 import Page from '../components/Page';
import { GetMyActiveTeam } from '../actions/TeamsAction';



  

  
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
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [imageList, setImageList] = React.useState([])
    const [totalTrees, setTotalTrees] = React.useState("");
    const [checked, setChecked] = React.useState(0);
    const userPermissions = [];


    const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
    });

    const {
      users,
      council,
      zones,
      wards,
      treeCensusPendingQCStatus, 
      referToExpertLog,
      updateQCStatusLog,
      activeTeams,
      updateCensusTreeLog,
      loggedUser
    } = useSelector((state) => ({
      users:state.users.users,
      council:state.council.council,
      zones:state.zones.zones,
      wards:state.wards.wards,
      treeCensusPendingQCStatus: state.treeCensus.treeCensusPendingQCStatus,
      referToExpertLog: state.treeCensus.referToExpertLog,
      updateQCStatusLog: state.treeCensus.updateQCStatusLog,
      activeTeams: state.teams.activeTeams,
      updateCensusTreeLog: state.treeCensus.updateCensusTreeLog,
      loggedUser:state.auth.loggedUser,
    }));

    loggedUser.roles[0].permissions.map((item, index)=>(
      userPermissions.push(item.name)
    ))
    
    console.log("in new");

    const firstRun = React.useRef(true);
    useEffect(()=>{
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      dispatch(GetUsers(1, 1000));
      dispatch(GetCouncil(1,1000));
      dispatch(GetWards(1,1000));
      dispatch(GetZones(1,1000));
      dispatch(GetTreeCensusPendingQCStatus(activeTeams?.active_council_id,activeTeams?.active_zone_id,activeTeams?.active_ward_id));
      setCouncilID(activeTeams?.active_council_id);
      setZoneID(activeTeams?.active_zone_id);
      setWardID(activeTeams?.active_ward_id);
      setSelectedIndex(0);
    },[activeTeams])

    const secondRun = React.useRef(true);
    useEffect(()=>{
      if (secondRun.current) {
        secondRun.current = false;
        return;
      }

      if(selectedIndex+1===treeCensusPendingQCStatus?.data.length){
        setSelectedIndex(0);
        setTotalTrees(totalTrees-1)
        setUpdateClick(false);
        dispatch(GetTreeCensusPendingQCStatus(councilID,zoneID,wardID));
      }

      else {

        setSelectedIndex(selectedIndex+1);
        setTotalTrees(totalTrees-1);
        setUpdateClick(false);
        const imageList = [];
        if(treeCensusPendingQCStatus?.data.length!==0){
          treeCensusPendingQCStatus?.data[selectedIndex+1].images?.map((value2,index)=>{
              const imageUrl = {original:value2.image_url};
              imageList.push(imageUrl)
              return null;
          })
        }
        setImageList(imageList)

      }

      
    },[updateQCStatusLog,updateCensusTreeLog,referToExpertLog])

    const thirdRun = React.useRef(true);
    useEffect(()=>{
      if (thirdRun.current) {
        thirdRun.current = false;
        return;
      }
      const imageList = [];
      if(treeCensusPendingQCStatus?.data.length!==0){
        treeCensusPendingQCStatus?.data[selectedIndex].images?.map((value2,index)=>{
            const imageUrl = {original:value2.image_url};
            imageList.push(imageUrl)
            return null;
        })
      }
      setImageList(imageList)
      setTotalTrees(treeCensusPendingQCStatus?.pending_qc_count)
    },[treeCensusPendingQCStatus])


    useEffect(()=>{
      dispatch(GetMyActiveTeam());
      // dispatch(GetBaseColorTreeById(1));
    },[])
  //  treeCensusPendingQCStatus.data.map((tree, index) =>(
  //     console.log(index, tree.tree_number, tree.tree_name.name)
  //     // console.log(tree.tree_number)
  //     // console.log(tree.tree_name.name)
  //     ));
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
      },treeCensusPendingQCStatus?.data[selectedIndex].id))
    }

    const handleApproveNext = () =>{
      console.log("HANDLE APPROVE CALLED");
      dispatch(UpdateQCStatusOfTreeCensus(treeCensusPendingQCStatus?.data[selectedIndex].id,{
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

      console.log("PENDING QC STATUS",treeCensusPendingQCStatus);

      const properties = {
        // thumbnailPosition: "left",
        useBrowserFullscreen: false,
        showPlayButton: false,
        showBullets:true,
        showIndex:true,
        // renderItem: this.myRenderItem.bind(this),
        items: imageList
      };
      const FilterSchema = Yup.object().shape({
        councilForm: Yup.string().required('Please select council'),
        wardForm: Yup.string().required('Please select ward'),
        zoneForm: Yup.string().required('Please select zone'),
      });
    
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          councilForm: councilID || " ",
          wardForm: wardID || " ",
          zoneForm: zoneID || " ",
          addedByForm: addedBy || "",
          toDateForm: null,
          fromDateForm: null,
          
        },
        validationSchema: FilterSchema,
        onSubmit: (value) => {
          console.log("in submit");
          console.log("VALUE",value);
          dispatch(GetTreeCensusPendingQCStatus(councilID,zoneID,wardID, value.fromDateForm, value.toDateForm,value.addedByForm,checked));
        },
      });

      const handleHeritage = (e) => {
        setChecked(!checked * 1);
      }
    
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
                justifyContent:"center",
                alignItems:"center",
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
          <Grid container spacing={1} style={{width:"90%",marginLeft:'5%',marginRight:'5%'}}>
          <Grid item xs={12}>
            <TextField
              select
              disabled
              id="council"
              label="Council"
              displayEmpty
              value={councilID}
              style={{width:'100%'}}
              size="small"
              onChange={(e) => {
                handleCouncilChange(e)
                formik.handleChange(e);
              }}
              // onChange={handleCouncilChange}
              error={Boolean(touched.councilForm && errors.councilForm)}
                helperText={touched.councilForm && errors.councilForm}
                
            >
               <MenuItem disabled value="">
            <em>Select Council*</em>
          </MenuItem>
              {council?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              disabled
              id="zone"
              label="Zone"
              displayEmpty
              value={zoneID}
              style={{width:'100%',marginTop:5}}
              size="small"
              onChange={(e) => {
                handleZoneChange(e)
                formik.handleChange(e);
              }}
              // onChange={handleZoneChange}
              error={Boolean(touched.zoneForm && errors.zoneForm)}
                helperText={touched.zoneForm && errors.zoneForm}
               
            >
               <MenuItem disabled value="">
            <em>Select Zone*</em>
          </MenuItem>
              {zones?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              disabled
              id="ward"
              label="Ward"
              displayEmpty
              value={zoneID}
              style={{width:'100%',marginTop:5}}
              size="small"
              onChange={(e) => {
                handleWardChange(e)
                formik.handleChange(e);
              }}
              // onChange={handleWardChange}
              error={Boolean(touched.wardForm && errors.wardForm)}
                helperText={touched.wardForm && errors.wardForm}
                
            >
               <MenuItem disabled value="">
            <em>Select Ward*</em>
          </MenuItem>
              {wards?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              id="addedBy"
              label="Added By"
              displayEmpty
              value={addedBy}
              style={{width:'100%',marginTop:5}}
              size="small"
              // placeholder='*Status'
              onChange={(e) => {
                handleAddedByChange(e)
                formik.handleChange(e);
              }}
              // onChange={handleAddedByChange}
              // error={Boolean(touched.addedByForm && errors.councilForm)}
              //   helperText={touched.councilForm && errors.councilForm}
                // {...getFieldProps("addedByForm")}
            >
               <MenuItem disabled value="">
            <em>Select Added By</em>
          </MenuItem>
              {users?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.first_name}{" "}{option.last_name}
                </MenuItem>
              ))}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
                fullWidth
                id="fromDate"
                type="date"
                label="Start Date"
                margin="normal"
                name="fromDateForm"
                style={{width:'100%',marginTop:5}}
                size="small"
                // label="Plantation Date"
                 value={values.fromDateForm || ""}
         
                // helperText={
                //     errors.toDateForm && touched.toDateForm
                     
                // }
                InputLabelProps={{
                  shrink: true,
                  
                }}
                {...getFieldProps("fromDateForm")}
              />
              
               </Grid>
               <Grid item xs={12}>
               <TextField
                fullWidth
                id="toDate"
                label="End Date"
                type="date"
                margin="normal"
                name="toDateForm"
                style={{width:'100%',marginTop:5}}
                size="small"
                // label="Plantation Date"
                 value={values.toDateForm || ""}
         
                // helperText={
                //     errors.toDateForm && touched.toDateForm
                     
                // }
                InputLabelProps={{
                  shrink: true,
                  
                }}
                {...getFieldProps("toDateForm")}
              />
               </Grid>
               <Grid item xs={12}>
               <FormControlLabel control={<Checkbox onChange={handleHeritage}/>} label="Show only heritage" />
               </Grid>

               <Button onClick={handleSubmit} variant="contained" style={{width:'60%',marginLeft:"20%",marginRight:"20%",marginTop:5}}>
            Apply

          </Button>

            </Grid>
          </div>
         {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
        </Drawer>
        </Box>
        {( treeCensusPendingQCStatus?.data && treeCensusPendingQCStatus?.data.length===0)?
        <div style={{display:'flex',justifyContent:'center',alignItems:"center",height:"100%",width:"100%"}}>
       
          <h2>
          No Record Found
          </h2>
          
        </div>:
        
        <Grid container style={{height:'calc(100vh - 118px)',marginBottom:'-80px',overflowY:'hidden'}}>
  
  <Grid item xs={4} style={{height:'100%',overflowY:'auto',paddingRight:'5%'}}>
  <Box sx={{  width: '100%',height:'100%',paddingRight:'5%',borderRight:'2px solid slategray' }}>
  <Typography variant="h4" gutterBottom align='center'>
            Total Pending Trees: {totalTrees}
          </Typography>
  <table style={{ fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: "100%"}}>
   
      <tr>
    <th style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>#</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>Tree Number</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>Tree Name</th>
  </tr>
  
    {treeCensusPendingQCStatus?.data?.map((tree, index) =>(
  <tr style={{backgroundColor:index===selectedIndex?"grey":""}}>
    <td style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>{index+1}</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>{tree.tree_number}</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>{tree.tree_name.name}</td>
  </tr>
    ))}
 
  </table>
    </Box>

  </Grid>
  {/* <Divider orientation='vertical' sx={{ mr:3}} flexItem/> */}
  <Grid item xs={8} style={{height:'100%',overflowY:'auto',paddingRight:'16px'}}>
  <Stack spacing={2}>
  <Box sx={{ height: "auto", width: '100%', mr:5 }}>
  <ImageGallery {...properties} style={{height:"300px",maxHeight:"300px !important"}} />
  </Box>
  <Box sx={{ height: 400, width: '100%' }}>
    <Box sx={{  width: '100%' }}>
      
    <Typography variant="h4" gutterBottom>
            Tree Details: 
          </Typography>
          {(treeCensusPendingQCStatus?.data && treeCensusPendingQCStatus?.data?.length!==0)?(
            <>
          <table>
             <tr>
             <td style={{fontWeight:700, textAlign: "left",  padding: "10px"}}>Tree Number:</td>
             <td style={{fontWeight:400, textAlign: "left",  padding: "10px"}}> {treeCensusPendingQCStatus?.data[selectedIndex].tree_number}</td>
             </tr>
            
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Tree Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].tree_name?.name}</td>
            </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Botanical Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].tree_name?.botanical_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Tree Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].tree_type.tree_type}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Location Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].location_type?.location_type}</td>
              </tr>
             <tr> 
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Property Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].property_type? treeCensusPendingQCStatus.data[selectedIndex].property_type?.property_type: "-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Property Number: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].property?.property_number?treeCensusPendingQCStatus.data[selectedIndex].property?.property_number:"-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Owner Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].property?.owner_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Tenant Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].property?.tenant_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Area(Sq feet): </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].property?.area? treeCensusPendingQCStatus.data[selectedIndex].property.area:"-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Plantation Date: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].plantation_date}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Tree Condition: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].tree_condition.condition}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Girth: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].girth}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Height: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].height}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Canopy: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{treeCensusPendingQCStatus?.data[selectedIndex].canopy}</td>
              </tr>
             </table>
             </>
             ):null}
             <Box sx={{ height: 200, width: '100%', mt:5 }}>
    <Stack direction="row" spacing={4}>
    {userPermissions.includes("approve-census-tree")? 

  <Button size="small" variant="contained" onClick={handleApproveNext}>Approve & Next</Button>:null}
  {userPermissions.includes("update-census-tree")? 

  <Button  size="small" variant="contained" onClick={handleDialogOpen}>Unapprove & Update</Button>:null}
  <Button  size="small" variant="contained" onClick={handleReferToExpert}>Refer To Expert</Button>
</Stack>
</Box>
      
{updateClick?  
        <TreeDetailsDialog
        isOpen={updateClick}
        handleClose= {handleDialogClose}
        data={treeCensusPendingQCStatus.data[selectedIndex]}
        />: null 
        }
    </Box>


  </Box>
</Stack>
  </Grid>
</Grid>
}
</Container>
</Page>
    );
  }