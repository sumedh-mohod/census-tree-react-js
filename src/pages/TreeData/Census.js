import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,

  Link,
  IconButton,
  Pagination,
  Box,
  Drawer,
  TextField,
  Grid,
  MenuItem,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Visibility } from '@mui/icons-material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import { UserListHead } from '../../sections/@dashboard/user';
import USERLIST from '../../_mock/user';
import TreeData from  '../../components/JsonFiles/TreeData.json';
import BaseColorDialog from "../../components/DialogBox/tree-data/BaseColorDialog";
import TreeCensusMenu from '../../sections/@dashboard/tree/TreeCensusMenu';
import ViewImageDialog from '../../components/DialogBox/tree-data/ViewImageDialog';
import { GetTreeCensus, SearchTreeCensus, UpdateQCStatusOfTreeCensus} from '../../actions/TreeCensusAction';
import { GetActiveCouncil } from '../../actions/CouncilAction';
import { GetActiveZonesByCouncilId } from '../../actions/ZonesAction';
import { GetActiveWardsByCouncilId } from '../../actions/WardsActions';
import TeamListToolbar from '../../sections/@dashboard/teams/TeamListToolbar';
import QcStatusDialog from '../../components/DialogBox/tree-data/QcStatusDialog';
import CencusViewDetailsDialog from '../../components/DialogBox/tree-data/CensusViewDetailsDialog';
import StatusPendngButton from '../../components/statusbutton/StatusPendngButton';
import StatusApprovedButton from '../../components/statusbutton/StatusApprovedButton';
import StatusUnapprovedButton from '../../components/statusbutton/StatusUnapprovedButton';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'srno', label: '#', alignRight: false },
  { id: 'treeNumber', label: 'Tree Number', alignRight: false },
  { id: 'treeName', label: 'Tree Name', alignRight: false },
  { id: 'addedBy', label: 'Added By', alignRight: false },
  { id: 'addedOn', label: 'Added On', alignRight: false },
  { id: 'age', label: 'Tree Age', alignRight: false },
  { id: 'locationAccuracyNeeded', label: 'Location Accuracy Captured', alignRight: false },
  { id: 'QCStatus', label: 'QC Status', alignRight: false },
  { id: 'isReferredToExpert', label: 'Is Referred To Expert?', alignRight: false },
  { id: 'action',label: 'Action',alignRight: true },
];

// ----------------------------------------------------------------------

export default function Census() {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [count, setCount] = useState(10);
  const [open, setOpen ] = useState(false);
  const [viewOpen, setViewOpen ] = useState(false);
  const [dialogData,setDialogData] = useState(null);
  const [search,setSearch] = useState(false);
   const [searchValue,setSearchValue] = useState("");
   const [stateName, setStateName] = useState('');
   const [zoneId,setZoneId] = useState('');
   const [wardId,setWardId] = useState('');
   const [coucilId,setCouncilId] = useState('');
   const [imageList,setImageList] = useState([]);
   const [showList,setShowList] = useState(false);
   const [qcDialogOpen,setQcDialogOpen] = useState(false);
   const [viewCensusDetails, setViewCensusDetails] = useState(false)
   const [treeCensusId,setTreeCensusId] = useState("");
   const userPermissions = [];

   const [newState, setNewState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });


   const {
    council,
    zones,
    wards,
    treeCensus,
    editBaseColorTreesLog,
    deleteBaseColorTreesLog,
    updateQCStatusLog,
    pageInfo,
    loggedUser
  } = useSelector((state) => ({
    council:state.council.activeCouncil,
    zones:state.zones.zones,
    wards:state.wards.wards,
    treeCensus:state.treeCensus.treeCensus,
    // editBaseColorTreesLog:state.baseColor.editBaseColorTreesLog,
    // deleteBaseColorTreesLog:state.baseColor.deleteBaseColorTreesLog,
    updateQCStatusLog:state.treeCensus.updateQCStatusLog,
    pageInfo:state.treeCensus.pageInfo,
    loggedUser:state.auth.loggedUser
  }));

  
loggedUser.roles[0].permissions.map((item, index)=>(
  userPermissions.push(item.name)
))

  const { state} = useLocation();

  useEffect(()=>{
    let cId = null;
    let wId = null;
    let zId = null;
    if(state?.councilId){
      setCouncilId(state.councilId)
      cId = state.councilId;
    }
    if(state?.wardId){
      setWardId(state.wardId);
      wId = state.wardId;
    }
    if(state?.zoneId){
      setZoneId(state.zoneId)
      zId = state.zoneId;
    }
    if(state?.pageNumber){
      setPage(state.pageNumber)
    }
    if(state){
      dispatch(GetTreeCensus(state.pageNumber,rowsPerPage,cId,zId,wId))
    }
    
  },[])

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setNewState({ ...newState, [anchor]: open });
  };


  const firstRun = React.useRef(true);
  useEffect(()=>{
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    setShowList(true);
    dispatch(GetTreeCensus(page,rowsPerPage,coucilId,zoneId,wardId));
  },[updateQCStatusLog])

  const secondRun = React.useRef(true);
  useEffect(()=>{
    if (secondRun.current) {
      secondRun.current = false;
      return;
    }
    setShowList(true);
  },[treeCensus])

  useEffect(()=>{
    dispatch(GetActiveCouncil(1));
    // dispatch(GetBaseColorTreeById(1));
  },[])

  useEffect(()=>{
    if(pageInfo){
      setCount(pageInfo?.total)
    }
  },[pageInfo])

  const handleNewUserClick = () => {
    setDialogData(null);
    setOpen(!open)
  }

  const handleViewOpen = (images) => {
    setViewOpen(!viewOpen)
    setImageList(images || []);
  }

  const handleQcDialog = (id) => {
    setQcDialogOpen(!qcDialogOpen);
    setTreeCensusId(id);
  }

  const handleCensusViewDetailsDialog= (data) => {
    setViewCensusDetails(!viewCensusDetails);
    setDialogData(data)
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

    dispatch(UpdateQCStatusOfTreeCensus(id,obj))

  }

  const handleEdit = (data) => {
    setDialogData(data);
    setOpen(!open);
  };

  const handleDelete = (data) => {

  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setShowList(false);
    if(search){
      dispatch(SearchTreeCensus(newPage,rowsPerPage,coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(newPage,rowsPerPage,coucilId,zoneId,wardId));
    }
  };

  const handleChangeRowsPerPage = (event) => {
    setShowList(false)
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(1);
    if(search){
      dispatch(SearchTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId,searchValue));
    }
    else {
      dispatch(GetTreeCensus(1,parseInt(event.target.value, 10),coucilId,zoneId,wardId));
    }
  };
  function handleClick(event) {
    event.preventDefault();
  }

  let timer = null;
  const filterByName = (event) => {
    const {value} = event.currentTarget;
    clearTimeout(timer);
    // Wait for X ms and then process the request
    timer = setTimeout(() => {
        if(value){
          dispatch(SearchTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId,value))
          setSearch(true)
          setShowList(false)
          setPage(1)
          setSearchValue(value);

        }
        else{
          dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,wardId));
          setShowList(false)
          setSearch(false);
          setPage(1);
          setSearchValue("")
        }
    }, 1000);

  }

  const handleCoucilChange = (e) => {
    setCouncilId(e.target.value);
    setZoneId("")
    setWardId("")
    setPage(1);
    setShowList(false);
    dispatch(GetTreeCensus(1,rowsPerPage,e.target.value,null,null))
    dispatch(GetActiveZonesByCouncilId(1,e.target.value))
    dispatch(GetActiveWardsByCouncilId(1,e.target.value))
  }

  const handleWardChange = (e) => {
    setWardId(e.target.value);
    setPage(1);
    setShowList(false);
    dispatch(GetTreeCensus(1,rowsPerPage,coucilId,zoneId,e.target.value))
  }

  const handleZoneChange = (e) => {
    setShowList(false);
    setZoneId(e.target.value);
    setPage(1);
    dispatch(GetTreeCensus(1,rowsPerPage,coucilId,e.target.value,wardId))
  }

  const useStyles = makeStyles({
    
    icon: {
        fill: '#214C50',
    },
   
})
const classes = useStyles()

  return (
    <Page title="Base Color">
      <Container>
        {open ? <BaseColorDialog isOpen={open} handleClose={handleNewUserClick} data={dialogData} /> : null}

        {viewOpen ? <ViewImageDialog isOpen={viewOpen} handleClose={handleViewOpen} data={imageList} /> : null}

        {qcDialogOpen ? (
          <QcStatusDialog
            isOpen={qcDialogOpen}
            baseColorId={treeCensusId}
            handleClose={() => handleQcDialog(null)}
            handleSubmit={(data, id) => handleQcSubmit(data, id)}
          />
        ) : null}

        {viewCensusDetails ? (
          <CencusViewDetailsDialog
            isOpen={viewCensusDetails}
            handleClose={() => handleCensusViewDetailsDialog()}
            data={dialogData}
          />
        ) : null}

        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
          <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb" style={{ color: '#000000', fontWeight: 900, fontSize: '20px' }} separator=":">
              {/* <Link
          underline="none"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 30, fontSize: 20, color: "#000000", fontStyle: 'bold'}}
          color="inherit"
          href="#"
        >
          Trees Data
        </Link>
        <Link
          underline="hover"
          sx={{ display: 'flex', alignItems: 'center', fontFamily: "sans-serif", fontWeight: 25, fontSize: 24, color: "#000000", fontStyle: 'bold' }}
          color="inherit"
          href="#"
        >
        Census
        </Link> */}
              <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
                Tree Data
              </Typography>
              <Typography variant="h4" gutterBottom style={{ color: '#000000', fontWeight: 400 }}>
                Census
              </Typography>
            </Breadcrumbs>
            <Typography variant="h6" style={{ fontSize: '18px', fontWeight: '400', marginTop: '-8px'  }}>
              It is showing list of trees with its details
            </Typography>
          </div>
           <Button
           onClick={toggleDrawer('right', true)}
            variant="contained"
            to="#"
          
            startIcon={<Iconify icon="eva:funnel-fill" />}
          >
            Filters
          </Button>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
        {/* <Container sx={{ pl: 0 }}>
          <Typography variant="h4" gutterBottom>
            Census QC
            <Typography variant="h6" style={{ fontWeight: 400 }}>
              It is showing Census QC
            </Typography>
          </Typography>
        </Container> */}
        {/* <div role="presentation">
          <Breadcrumbs
            aria-label="breadcrumb"
            style={{ color: '#000000', fontWeight: 900, fontSize: '20px' }}
            separator=":"
          >
            <Typography variant="h4" gutterBottom style={{ color: '#000000' }}>
              Census QC
            </Typography>
          </Breadcrumbs>
        </div>
        <Typography variant="h6" fontWeight={400} sx={{ mt: -1 }}>
          It is showing Census QC
        </Typography> */}
        {/* <Box
          display="flex"
          alignItems="flex-start"
          // flexDirection="row" This is the default
        >
          <Box alignSelf="center">
            <Box
              sx={{
                // justifyContent: 'end',
                px: 3,
                py: 1,
                mt: -4,
                mr: 2,
                backgroundColor: '#E8762F',
                color: '#fff',
                fontWeight: 500,
                width: '280px',
                borderRadius: '7px',
                textAlign: 'center',
              }}
              // component={RouterLink}
              to="#"
            >
              Total Pending Trees : <b>{totalTrees || 0}</b>
            </Box>
          </Box>
          <Button
            onClick={toggleDrawer('right', true)}
            variant="contained"
            sx={{
              // justifyContent: 'end',
              px: 3,
              py: 1,
              mt: -4,
              boxShadow: 'none',
              mr: 3,
              // backgroundColor: '#000'
            }}
            // component={RouterLink}
            to="#"
            startIcon={<Iconify icon="eva:funnel-fill" />}
          >
            Filters
          </Button>
        </Box> */}
        <Box sx={{ height: '100' }}>
          {/* <Button
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
          </Button>  */}
          <Drawer
            sx={{
              '& .MuiDrawer-paper': {
                width: '300px',
                maxWidth: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              },
            }}
            anchor={'right'}
            open={newState.right}
            onClose={toggleDrawer('right', false)}
            // sx={{
            //   display: { xs: 'block', sm: 'none' },
            //   '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
            // }}
          >
            <div>
              <Grid container spacing={1} style={{ width: '90%', marginLeft: '5%', marginRight: '5%' }}>
                <Grid item xs={12}>
                  <TextField
                    select
                    // disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
                    id="councilForm"
                    label="Council"
                    displayEmpty
                    // value={councilID}
                    style={{ width: '100%' }}
                    size="small"
                    // onChange={(e) => {
                    //   handleCouncilChange(e);
                    //   formik.handleChange(e);
                    // }}
                    // onChange={handleCouncilChange}
                    // error={Boolean(touched.councilForm && errors.councilForm)}
                    // helperText={touched.councilForm && errors.councilForm}
                    inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                  }}
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
                    disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
                    id="zoneForm"
                    label="Zone"
                    displayEmpty
                    // value={zoneID}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // onChange={(e) => {
                    //   handleZoneChange(e);
                    //   formik.handleChange(e);
                    // }}
                    // onChange={handleZoneChange}
                    // error={Boolean(touched.zoneForm && errors.zoneForm)}
                    // helperText={touched.zoneForm && errors.zoneForm}
                    inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                  }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Zone*</em>
                    </MenuItem>
                    {/* {councilID
                      ? zones?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))
                      : null} */}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    disabled={loggedUser?.roles[0]?.slug === 'qc_census_offsite'}
                    id="wardForm"
                    label="Ward"
                    displayEmpty
                    // value={wardID}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // onChange={(e) => {
                    //   handleWardChange(e);
                    //   formik.handleChange(e);
                    // }}
                    // onChange={handleWardChange}
                    // error={Boolean(touched.wardForm && errors.wardForm)}
                    // helperText={touched.wardForm && errors.wardForm}
                    inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                  }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Ward*</em>
                    </MenuItem>
                    {/* {councilID
                      ? wards?.map((option) => (
                          <MenuItem key={option.id} value={option.id}>
                            {option.name}
                          </MenuItem>
                        ))
                      : null} */}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    id="addedBy"
                    label="Added By"
                    displayEmpty
                    // value={addedBy}
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // placeholder='*Status'
                    // onChange={(e) => {
                    //   handleAddedByChange(e);
                    //   formik.handleChange(e);
                    // }}
                    // onChange={handleAddedByChange}
                    // error={Boolean(touched.addedByForm && errors.councilForm)}
                    //   helperText={touched.councilForm && errors.councilForm}
                    // {...getFieldProps("addedByForm")}
                    inputProps={{
                      classes: {
                          icon: classes.icon,
                      },
                  }}
                  >
                    <MenuItem disabled value="">
                      <em>Select Added By</em>
                    </MenuItem>
                    <MenuItem value="">
                      <em>----Null----</em>
                    </MenuItem>
                    {/* {userByRoleID?.map((option) => (
                      <MenuItem key={option.id} value={option.id}>
                        {option.first_name} {option.last_name}
                      </MenuItem>
                    ))} */}
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
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // label="Plantation Date"
                    // value={values.fromDateForm || ''}
                    // helperText={
                    //     errors.toDateForm && touched.toDateForm

                    // }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // inputProps={{ max: todayDate }}
                    // {...getFieldProps('fromDateForm')}
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
                    style={{ width: '100%', marginTop: 5 }}
                    size="small"
                    // label="Plantation Date"
                    // value={values.toDateForm || ''}
                    // F // }
                    InputLabelProps={{
                      shrink: true,
                    }}
                    // inputProps={{ max: todayDate }}
                    // {...getFieldProps('toDateForm')}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <FormControlLabel control={<Checkbox onChange={handleHeritage} />} label="Show only Heritage Trees" />
                </Grid> */}

                <Button
                  // onClick={handleSubmit}
                  variant="contained"
                  style={{ width: '60%', marginLeft: '20%', marginRight: '20%', marginTop: 5}}
                >
                  Apply
                </Button>
              </Grid>
            </div>
            {/* <FilterDrawer data={toggleDrawer("right", false)}/> */}
          </Drawer>
        </Box>
      </Stack>

        <Card>
          {/* <TeamListToolbar
            numSelected={0}
            placeHolder={'Search Base Color...'}
            onFilterName={filterByName}
            handleCoucilChange={(e) => handleCoucilChange(e)}
            handleWardChange={(e) => handleWardChange(e)}
            handleZoneChange={(e) => handleZoneChange(e)}
            coucilId={coucilId}
            zoneId={zoneId}
            wardId={wardId}
          /> */}
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table  size="small" aria-label="a dense table">
                <UserListHead headLabel={TABLE_HEAD} />
                {!coucilId ? (
                  <TableRow>
                    <TableCell align="center" colSpan={8} fontWeight={700}>
                      Please select council to get census data
                    </TableCell>
                  </TableRow>
                ) : null}
                <TableBody>
                  {showList
                    ? treeCensus?.map((option, index) => {
                        return (
                          <TableRow hover>
                            <TableCell align="left">
                              <b>{(page - 1) * rowsPerPage + (index + 1)}</b>
                            </TableCell>
                            <TableCell align="left" ><b>{option.tree_number ? option.tree_number : '-'}</b></TableCell>
                            <TableCell align="left">{option.tree_name?.name}</TableCell>
                            <TableCell align="left">
                              {option.added_by?.first_name} {option.added_by?.last_name}{' '}
                            </TableCell>
                            <TableCell align="left">{option.added_on_date}</TableCell>
                            <TableCell align="left">{option.age}</TableCell>
                            <TableCell align="left">{option.location_accuracy}</TableCell>
                            <TableCell align="left">
                            {option.qc_status === 'Pending'?<StatusPendngButton qcStatus={option.qc_status}/>: ''}
                              {option.qc_status === 'Approved'?<StatusApprovedButton qcStatus={option.qc_status}/>: ''}
                              {option.qc_status === 'Unapproved'?<StatusUnapprovedButton qcStatus={option.qc_status}/>: ''}
                          </TableCell>
                            <TableCell align="left">{option.referred_to_expert === 1 ? <b style={{color: 'green'}}>Yes</b> : <b style={{color: '#E8762F'}}>No</b>}</TableCell>
                            {/* <TableCell align="left"> */}
                            {/* <Link to="#" onClick={handleViewOpen} style={{cursor:'pointer'}}>View</Link> */}
                            {/* <IconButton aria-label="delete" size="large" onClick={()=>handleViewOpen(option.images)} color="success">
                            <Visibility />
                          </IconButton>
                          </TableCell> */}
                            {/* <TableCell align="left">{option.qc_status}</TableCell>
                        <TableCell align="left">{option.qc_by?.first_name ?option.qc_by?.first_name : "-" }</TableCell>
                        <TableCell align="left">{option.qc_date? option.qc_date: "-" }</TableCell> */}
                            <TableCell align="right">
                              <TreeCensusMenu
                                permissions={userPermissions}
                                treeCensusId={option.id}
                                treeCensusName={option.property?.owner_name}
                                qcStatus={option.qc_status}
                                councilId={coucilId}
                                zoneId={zoneId}
                                wardId={wardId}
                                pageNumber={page}
                                handleEdit={() => handleEdit(option)}
                                handleApprove={() => handleQcSubmit(null, option.id)}
                                handleQcDialog={() => handleQcDialog(option.id)}
                                handleCensusViewDialog={() => handleCensusViewDetailsDialog(option)}
                                handleDelete={() => handleDelete(option)}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })
                    : null}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
          {/* {showList?  <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} /> : treeCensus ? <Pagination count={pageInfo.last_page} variant="outlined" shape="rounded"
  onChange={handleChangePage}
  sx={{justifyContent:"right",
  display:'flex', mt:3, mb:3}} /> : null} */}
          {treeCensus ? (
            <Pagination
              count={showList ? pageInfo.last_page : 0}
              variant="outlined"
              shape="rounded"
              onChange={handleChangePage}
              sx={{ justifyContent: 'right', display: 'flex', mt: 3, mb: 3 }}
            />
          ) : null}
        </Card>
      </Container>
    </Page>
  );
}
