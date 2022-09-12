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
    CircularProgress
  } from '@mui/material';
  import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
  import moment from 'moment';
  import  ImageGallery  from 'react-image-gallery';
  import { useDispatch, useSelector } from 'react-redux';
 import TreeDetailsDialog from '../../components/DialogBox/TreeDetailsDialog';
 import { GetTreeCensusPendingQCStatus, UpdateQCStatusOfTreeCensus, ReferToExpert} from '../../actions/TreeCensusAction';
 import { GetActiveCouncil, SetActiveCouncil} from '../../actions/CouncilAction';
 import { GetActiveZonesByCouncilId, GetActiveZones, SetActiveZones} from '../../actions/ZonesAction';
 import {GetActiveWardsByCouncilId, GetActiveWards, SetActiveWards} from '../../actions/WardsActions';
 import { GetUsers, GetUsersByRoleID } from '../../actions/UserAction';

 import Page from '../../components/Page';
import { GetMyActiveTeam } from '../../actions/TeamsAction';
import { GetBaseColorPendingQCStatus, UpdateQCStatusOfBaseColorTrees } from '../../actions/BaseColorAction';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';
import { ShowLoader } from '../../actions/CommonAction';

  
  export default function BaseColorPendingQC(){
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const dispatch = useDispatch();
    const [councilID, setCouncilID] = React.useState("");
    const [zoneID, setZoneID] = React.useState("");
    const [wardID, setWardID] = React.useState("");
    const [fromDate, setFromDate] = React.useState("");
    const [toDate, setToDate] = React.useState("");
    const [addedBy, setAddedBy] = React.useState("");
    const [updateClick, setUpdateClick] = React.useState(false);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const [imageList, setImageList] = React.useState([])
    const [baseColorId,setBaseColorId] = useState("");
    const [totalTrees, setTotalTrees] = React.useState("");
    const [showData, setShowData] = React.useState(false);
    const userPermissions = [];
    const todayDate = moment(new Date()).format('YYYY-MM-DD');
    let selectedUsers;


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
      userByRoleID,
      baseColorPendingQCStatus, 
      updateQCStatusLog,
      activeTeams,
      loggedUser,
      showLoader
    } = useSelector((state) => ({
      users:state.users.users,
      council:state.council.activeCouncil,
      zones:state.zones.activeZonesByCID,
      wards:state.wards.activeWardsByCID,
      userByRoleID: state.users.userByRoleID,
      baseColorPendingQCStatus: state.baseColor.baseColorPendingQCStatus,
      updateQCStatusLog: state.baseColor.updateQCStatusLog,
      activeTeams: state.teams.activeTeams,
      loggedUser:state.auth.loggedUser,
      showLoader : state.common.showLoader,
    }));

    // console.log("Logged user",loggedUser);

    loggedUser.roles[0].permissions.map((item, index)=>(
      userPermissions.push(item.name)
    ))

//    if(users){ 
//     selectedUsers= users.filter(
//       (currentValue) => {if(currentValue.assigned_roles.includes("Base Color User") || currentValue.assigned_roles.includes("Base Color QC - Offsite")){
//         return currentValue;
//       }
//       return null;
//   });
//   console.log("selectedUsers", selectedUsers)
// }

 
    const firstRun = React.useRef(true);
    useEffect(()=>{
      if (firstRun.current) {
        firstRun.current = false;
        return;
      }
      
      dispatch(GetBaseColorPendingQCStatus(activeTeams?.active_council_id,activeTeams?.active_zone_id,activeTeams?.active_ward_id));
      setCouncilID(activeTeams?.active_council_id);
      setZoneID(activeTeams?.active_zone_id);
      setWardID(activeTeams?.active_ward_id);
      const activeCouncilObj = {
        data:[{id:activeTeams?.active_council_id,name:activeTeams?.active_council_name,status:1}]
      }
      const activeWardObj = {
        data:[{id:activeTeams?.active_ward_id,name:activeTeams?.active_ward_name,status:1}]
      }
      const activeZoneObj = {
        data:[{id:activeTeams?.active_ward_id,name:activeTeams?.active_zone_name,status:1}]
      }
      dispatch(SetActiveCouncil(activeCouncilObj))
      dispatch(SetActiveWards(activeWardObj))
      dispatch(SetActiveZones(activeZoneObj))
      setSelectedIndex(0);
    },[activeTeams])

    const secondRun = React.useRef(true);
    useEffect(()=>{
      if (secondRun.current) {
        secondRun.current = false;
        return;
      }

      if(selectedIndex+1===baseColorPendingQCStatus?.data.length){
        setSelectedIndex(0);
        setTotalTrees(totalTrees-1);
        setUpdateClick(false);
        dispatch(GetBaseColorPendingQCStatus(councilID,zoneID,wardID));
      }

      else {

        setSelectedIndex(selectedIndex+1);
        setTotalTrees(totalTrees-1);
        setUpdateClick(false);
        const imageList = [];
        if(baseColorPendingQCStatus?.data.length!==0){
          baseColorPendingQCStatus?.data[selectedIndex+1].images?.map((value2,index)=>{
              const imageUrl = {original:value2.image_url};
              imageList.push(imageUrl)
              return null;
          })
        }
        setImageList(imageList)

      }

      
    },[updateQCStatusLog])

    const thirdRun = React.useRef(true);
    useEffect(()=>{
      if (thirdRun.current) {
        thirdRun.current = false;
        return;
      }
      const imageList = [];
      if(baseColorPendingQCStatus?.data.length!==0){
        baseColorPendingQCStatus?.data[selectedIndex].images?.map((value2,index)=>{
            const imageUrl = {original:value2.image_url};
            imageList.push(imageUrl)
            return null;
        })
      }
      dispatch(ShowLoader(false))
      setShowData(true)
      setImageList(imageList)
      setTotalTrees(baseColorPendingQCStatus?.pending_qc_count)
    },[baseColorPendingQCStatus])


    useEffect(()=>{
      if(loggedUser?.roles[0]?.slug==="qc_base_color_offsite"){
        dispatch(GetMyActiveTeam());
        dispatch(ShowLoader(true));
        dispatch(GetUsersByRoleID(1, 3, 5));
      }

      else {
        dispatch(GetUsersByRoleID(1, 3, 5));
        dispatch(GetActiveCouncil(1));
        dispatch(GetActiveWards(1));
        dispatch(GetActiveZones(1));
      }

      // dispatch(GetBaseColorTreeById(1));
    },[])
  //  baseColorPendingQCStatus.data.map((tree, index) =>(
  //     console.log(index, tree.tree_number, tree.tree_name.name)
  //     // console.log(tree.tree_number)
  //     // console.log(tree.tree_name.name)
  //     ));
    const handleDialogOpen = (id) => {
      setDialogOpen(true);
      setUpdateClick(true);
      setBaseColorId(id);
  };
    const handleDialogClose = () => {
      setDialogOpen(false);
      setUpdateClick(false);
      setBaseColorId(null);
    };

    // console.log("BASE COLOR PENDING QC STATUS",baseColorPendingQCStatus);   



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


    const handleApproveNext = () =>{
      // console.log("HANDLE APPROVE CALLED");
      dispatch(UpdateQCStatusOfBaseColorTrees(baseColorPendingQCStatus?.data[selectedIndex].id,{
        "qc_status" : "Approved"
      }))
    }

    const handleQcSubmit = (data,id) => {
      const obj = {};
  
      if(data){
        obj.qc_status = "Unapproved";
        obj.qc_remark_id = data;
      }
      else {
        obj.qc_status = "Approved";
      }
  
      dispatch(UpdateQCStatusOfBaseColorTrees(id,obj))
  
    }


    const handleRowClick = (tree) =>{
      // console.log(tree);
    }

    const handleCouncilChange = (e) => {
      setCouncilID(e.target.value);
      setZoneID("")
      setWardID("")
      dispatch(GetActiveZonesByCouncilId(1,e.target.value))
      dispatch(GetActiveWardsByCouncilId(1,e.target.value))
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

      // console.log("PENDING QC STATUS",baseColorPendingQCStatus);

      const properties = {
        // thumbnailPosition: "left",
        useBrowserFullscreen: false,
        showPlayButton: false,
        showBullets:true,
        showIndex:true,
        // renderItem: this.myRenderItem.bind(this),
        items: imageList,
      };
      const FilterSchema = Yup.object().shape({
        councilForm: Yup.string().required('Please select council'),
        wardForm: Yup.string().required('Please select ward'),
        zoneForm: Yup.string().required('Please select zone'),
      });
    
    
      const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
          councilForm: councilID || "",
          wardForm: wardID || "",
          zoneForm: zoneID || "",
          addedByForm: addedBy || "",
          toDateForm: null,
          fromDateForm: null,
        },
        validationSchema: FilterSchema,
        onSubmit: (value) => {
          // console.log("in submit");
          // console.log("VALUE",value);
          setState({ ...state, "right": false });
          dispatch(GetBaseColorPendingQCStatus(councilID,zoneID,wardID, value.fromDateForm, value.toDateForm,value.addedByForm));
          
        },
      });

     // console.log("ZONES",baseColorPendingQCStatus.data[0].location_accuracy);
      // console.log("WARDS",wards);
    
      const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    return(
      showLoader ?
      <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%' }}>
      <CircularProgress color="success" />
      </div>:
        <Page title="New UI" style={{paddingBottom:'0px'}}>
            <Container style={{paddingRight:'0px',marginRight:'0px',marginLeft:"0px",paddingLeft:"0px"}}>
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
              disabled={loggedUser?.roles[0]?.slug==="qc_base_color_offsite"}
              id="councilForm"
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
              disabled={loggedUser?.roles[0]?.slug==="qc_base_color_offsite"}
              id="zoneForm"
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
              {councilID? zones?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )):null}
            </TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
              select
              disabled={loggedUser?.roles[0]?.slug==="qc_base_color_offsite"}
              id="wardForm"
              label="Ward"
              displayEmpty
              value={wardID}
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
              {councilID? wards?.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              )):null}
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
              {userByRoleID?.map((option) => (
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
                inputProps={{ max: todayDate }}
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
                inputProps={{ max: todayDate }}
                {...getFieldProps("toDateForm")}
              />
               </Grid>
               <Button onClick={handleSubmit} variant="contained" style={{width:'60%',marginLeft:"20%",marginRight:"20%",marginTop:5}}>
            Apply

          </Button>

            </Grid>
          </div>
         {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
        </Drawer>
        </Box>
        {( baseColorPendingQCStatus?.data && baseColorPendingQCStatus?.data.length===0) || !showData?
        <div style={{display:'flex',justifyContent:'center',alignItems:"center",height:"100%",width:"100%"}}>
       
          <h2>
          No Record Found
          </h2>
          
        </div>:
        
        <Grid container style={{height:'calc(100vh - 118px)',marginBottom:'-80px'}}>
  
  {/* <Grid item xs={4} style={{height:'100%',overflowY:'auto',paddingRight:'5%'}}>
  <Box sx={{  width: '100%',height:'100%',paddingRight:'5%',borderRight:'2px solid slategray' }}>
  <Typography variant="h4" gutterBottom align='center'>
            Total Trees: {baseColorPendingQCStatus?.pending_qc_count}
          </Typography>
  <table style={{ fontFamily: "arial, sans-serif",
  borderCollapse: "collapse",
  width: "100%"}}>
   
      <tr>
    <th style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>#</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>Tree Number</th>
    <th style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>Tree Name</th>
  </tr>
  
    {baseColorPendingQCStatus?.data?.map((tree, index) =>(
  <tr style={{backgroundColor:index===selectedIndex?"grey":""}}>
    <td style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>{index+1}</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>{tree.tree_number}</td>
    <td style={{border: "1px solid #dddddd",  textAlign: "center",  padding: "4px"}}>{tree.tree_name?.name}</td>
  </tr>
    ))}
 
  </table>
    </Box>

  </Grid> */}
  {/* <Divider orientation='vertical' sx={{ mr:3}} flexItem/> */}
  <Grid item xs={12} style={{width:"80%",marginLeft:"10%",marginRight:"10%"}}>
  <Stack spacing={2}>
  <Typography variant="h4" gutterBottom align='center'>
            Total Pending Trees: {totalTrees}
          </Typography>
  <Box sx={{ height: "auto", width: '100%', mr:5 }}>
  <ImageGallery {...properties} style={{height:"300px",maxHeight:"300px !important"}} />
  </Box>
  <Box sx={{ height: 400, width: '100%' }}>
    <Box sx={{  width: '100%' }}>
      
    <Typography variant="h4" gutterBottom style={{textAlign:"center"}}>
            Base Color Details: 
          </Typography>
          {(baseColorPendingQCStatus?.data && baseColorPendingQCStatus?.data?.length!==0)?(
            <>
          <table style={{marginLeft:"auto",marginRight:"auto",marginTop:20}}>
            
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Location Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].location_type?.location_type}</td>
              </tr>
              <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Location Accuracy Needed: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].location_accuracy?baseColorPendingQCStatus?.data[selectedIndex].location_accuracy:"-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Property Type: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].property_type? baseColorPendingQCStatus.data[selectedIndex].property_type?.property_type: "-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Property Number: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].property?.property_number?baseColorPendingQCStatus.data[selectedIndex].property?.property_number:"-"}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Owner Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].property?.owner_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Tenant Name: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].property?.tenant_name}</td>
              </tr>
             <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Added By: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].added_by? `${baseColorPendingQCStatus?.data[selectedIndex].added_by?.first_name} ${baseColorPendingQCStatus?.data[selectedIndex].added_by?.last_name}`:"-"}</td>
              </tr>
              <tr>
              <td style={{fontWeight:700, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>Added On: </td>
              <td style={{fontWeight:400, textAlign: "left",  padding: "10px",paddingTop:"0px"}}>{baseColorPendingQCStatus?.data[selectedIndex].added_on_date}</td>
              </tr>
             </table>
             </>
             ):null}
             <Box sx={{ height: 200, width: '100%', mt:5, }}>
    <Stack direction="row" spacing={4} style={{justifyContent:"center"}}>
{userPermissions.includes("approve-base-color-tree")? 

  <Button size="medium" variant="contained" onClick={handleApproveNext}>Approve & Next</Button>:null}
  {userPermissions.includes("unapprove-base-color-tree")? 
  <Button  size="medium" variant="contained" onClick={()=>handleDialogOpen(baseColorPendingQCStatus?.data[selectedIndex].id)}>Unapprove & Next</Button>:null}
</Stack>
</Box>
      
{updateClick?  
        <QcStatusDialog
        isOpen={updateClick}
        baseColorId={baseColorId}
        handleClose = {()=>handleDialogClose()}
        handleSubmit = {(data,id)=>handleQcSubmit(data,id)}
        />:null
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